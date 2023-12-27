"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import { error } from "console";
import FormButton from "../common/FormButton";
import { FC } from "react";

interface PostCreationFormProps {
  slug: string;
}
const PostCreationForm: FC<PostCreationFormProps> = ({ slug }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formState, action] = useFormState(
    // used to pass some more variable to server action
    actions.createPost.bind(null, slug),
    { errors: {} }
  );
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create Post
      </Button>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create Post</ModalHeader>
              <form action={action}>
                <ModalBody>
                  <Input
                    name="title"
                    label="Title"
                    labelPlacement="outside"
                    isInvalid={!!formState.errors.title}
                    errorMessage={formState.errors.title?.join(", ")}
                  />
                  <Textarea
                    name="content"
                    label="Content"
                    labelPlacement="outside"
                    isInvalid={!!formState.errors.content}
                    errorMessage={formState.errors.content?.join(", ")}
                  />
                  {formState.errors._form && (
                    <div className="p-2 text-red-800 border border-red-300 rounded-lg bg-red-200 ">
                      {formState.errors._form.join(", ")}
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    type="button"
                    variant="flat"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <FormButton>Create Post</FormButton>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostCreationForm;
