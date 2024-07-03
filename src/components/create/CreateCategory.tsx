"use client";
import { createCategory } from "@/actions/createCategory";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { redirect } from "next/navigation";
export default function CreateCategory() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  function clearHandler() {
    setCategory("");
  }
  return (
    <>
      <form
        onSubmit={() => {
          clearHandler;
          toast("Categorie byla vytvořena");
        }}
        action={async (formData) => {
          await createCategory(formData);
          redirect("/communities");
        }}
        className={`flex flex-row justify-center items-start px-4 md:px-0 left-11 right-0 top-36 w-full`}
      >
        <div className="flex flex-col justify-center items-center bg-white md:w-98 max-w-98 rounded-lg px-5 py-6 w-2/4">
          <div className="flex flex-col justify-center items-end gap-5 w-full">
            <div className="flex flex-row justify-between items-center gap-3 w-full">
              <div className="flex flex-col justify-center items-start gap-3 w-full">
                <h4 className="font-semibold text-sm text-gray">
                  Create category
                </h4>
                <input
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  name="category"
                  className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                  placeholder="Cars"
                ></input>
              </div>
            </div>
            <button
              type="submit"
              className="flex flex-row justify-center items-center h-11 w-full bg-gray text-white rounded-lg"
            >
              Create category
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
}
