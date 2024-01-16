"use server";
import { auth } from "@/auth";
import { z } from "zod";
import { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

/**
 * Schema For Create Topic
 */
const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lower case letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

/**
 * FormState InterFace
 */
interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

/**
 * Handle Create Topic Functionality
 *
 */
export async function createTopic(
  _formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();

  // Check if user is Logged in
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You Must be Signed in to do this"],
      },
    };
  }

  // Validate the Input to the Z Schema Sync
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  // Return Errors if not Successful
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Create A new Topic instance int the Database
  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
  // Make a new instance of the Cached Static home page
  revalidatePath(paths.home());
  // redirect to Topic Show page
  redirect(paths.topicShow(topic?.slug));
}
