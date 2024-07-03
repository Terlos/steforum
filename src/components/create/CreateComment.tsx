"use client";
import { createComment } from "@/actions/createComment";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { redirect } from "next/navigation";
interface CreateComment {
  commentId?: string;
  categoryId: string;
}
export default function CreateComment({
  commentId,
  categoryId,
}: CreateComment) {
  const [text, setText] = useState("");
  function clearHandler() {
    setText("");
  }
  return (
    <>
      <form
        onSubmit={() => {
          clearHandler;
          toast("Comment has been created");
        }}
        action={async (formData) => {
          if (commentId && categoryId) {
            await createComment(formData, commentId, categoryId);
            redirect(`/comments/${categoryId}/${commentId}`);
          }
        }}
        className={`flex flex-row justify-center items-start px-4 md:px-0 left-11 right-0 top-36 w-full`}
      >
        <div className="flex flex-col justify-center items-center bg-white md:w-98 max-w-98 rounded-lg px-5 py-6 w-2/4">
          <div className="flex flex-col justify-center items-end gap-5 w-full">
            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <h4 className="font-semibold text-sm text-gray">Comment</h4>
              <input
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                name="text"
                className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                placeholder="Rád sportuji...."
              ></input>
            </div>
            <button
              type="submit"
              className="flex flex-row justify-center items-center h-11 w-full bg-gray text-white rounded-lg"
            >
              Create comment
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
}
