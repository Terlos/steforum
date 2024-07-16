"use client";
import { createPost } from "@/actions/createPost";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { redirect } from "next/navigation";
import { UploadButton } from "@/app/utils/uploadthing";

interface CreatePost {
  categoryId?: string;
  showProfile: Boolean;
}
export function AddCommunityRoomPost({ categoryId, showProfile }: CreatePost) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  function clearHandler() {
    setTitle("");
    setText("");
  }

  return (
    <>
      <form
        onSubmit={() => {
          clearHandler;
          toast("Post has been created");
        }}
        action={async (formData) => {
          if (categoryId) {
            await createPost(formData, categoryId, imageUrl);
            redirect(`/communityRoomPosts/${categoryId}`);
          }
        }}
        className={`${
          showProfile ? "blur" : ""
        } flex flex-row justify-center items-start px-4 md:px-0 left-11 right-0 top-36 w-full`}
      >
        <div className="flex flex-col justify-center items-center bg-white md:w-98 max-w-98 rounded-lg px-5 py-6 w-2/4">
          <div className="flex flex-col justify-center items-end gap-5 w-full">
            <div className="flex flex-row justify-between items-center gap-3 w-full">
              <div className="flex flex-col justify-center items-start gap-3 w-full">
                <h4 className="font-semibold text-sm text-gray">Title</h4>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  name="title"
                  className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                  placeholder="Sport"
                ></input>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <h4 className="font-semibold text-sm text-gray">Add image</h4>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res.length > 0) {
                    const url = res[0].url; // Adjust based on the actual property
                    setImageUrl(url);
                  }
                  console.log("Files: ", res);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <h4 className="font-semibold text-sm text-gray">Text</h4>
              <input
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                name="text"
                className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                placeholder="I like sport...."
              ></input>
            </div>
            <button
              type="submit"
              className="flex flex-row justify-center items-center h-11 w-full bg-gray text-white rounded-lg"
            >
              Create post
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
}
