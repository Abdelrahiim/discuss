"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { Post } from "@prisma/client";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Create Post Shemma
 */
const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}
/**
 * Handle create post action on server
 * @param slug getting using bind
 * TODO : revalidate topicShowPage
 * */
export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();
  // validate user existence
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You Must be Signed in to do this"],
      },
    };
  }

  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  // getting Topic instance from the db using slug
  const topic = await db.topic.findUnique({
    where: {
      slug,
    },
  });
  if (!topic) {
    return {
      errors: {
        _form: ["Can't Find Topic"],
      },
    };
  }
  let post: Post;
  try {
    post = await db.post.create({
      data: {
        userId: session.user?.id,
        content: result.data.content,
        title: result.data.title,
        topicId: topic.id,
      },
    });
  } catch (e) {
    if (e instanceof Error) {
      return {
        errors: {
          _form: [e.message],
        },
      };
    }
    return {
      errors: {
        _form: ["Something Went Wrong"],
      },
    };
  }
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
