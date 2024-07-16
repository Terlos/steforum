import { Toaster, toast } from "sonner";
import cancel from "/public/cancel.svg";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/auth";
import { UploadButton } from "@/app/utils/uploadthing";
import { editProfile } from "@/actions/editProfile";
import { useState } from "react";
interface Profile {
  showProfile: Boolean;
  showProfileHandler: () => void;
}

export function Profile({ showProfile, showProfileHandler }: Profile) {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <form
      action={async (formData) => {
        await editProfile(formData, imageUrl);
        redirect("/");
      }}
      className={`flex flex-row justify-center items-center px-4 md:px-0 absolute left-3 right-0 top-20 z-20 ${
        showProfile ? "" : "hidden"
      }`}
    >
      <div className="flex flex-col justify-center items-center bg-white md:w-98 max-w-98 rounded-lg px-5 py-6">
        <div className="flex flex-col justify-center items-end gap-5 w-full">
          <Image
            onClick={() => showProfileHandler()}
            src={cancel}
            alt="cancel button"
            className="hover:cursor-pointer"
          ></Image>
          <div className="flex flex-row justify-between items-center gap-3 w-full">
            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <h4 className="font-semibold text-sm text-gray">Username</h4>
              <input
                required
                type="text"
                name="name"
                className="w-96 rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                placeholder="Jan Novák"
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
          <button className="flex flex-row justify-center items-center h-11 w-full bg-gray text-white rounded-lg">
            Update profile
          </button>
        </div>
      </div>
    </form>
  );
}
