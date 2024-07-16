"use client";
import cancel from "/public/cancel.svg";
import Image from "next/image";
import { registerForm } from "@/actions/register";
import { Toaster, toast } from "sonner";
import { useState } from "react";

interface RegisterForm {
  blur: () => void;
  blurState: Boolean;
  showForm: (item: Boolean) => void;
  show: Boolean;
}
export function RegisterForm({
  blur,
  blurState,
  showForm,
  show,
}: RegisterForm) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  function clearHandler() {
    setName("");
    setEmail("");
    setPassword("");
    setRePassword("");
  }
  return (
    <>
      <form
        action={async (formData) => {
          await registerForm(formData);
        }}
        onSubmit={() => {
          showForm(!show);
          clearHandler();
          toast("Registrace byla odeslán");
        }}
        className={`flex flex-row justify-center items-center px-4 md:px-0 absolute left-3 right-0 top-20 z-20 ${
          blurState ? "" : "hidden"
        } ${show ? "" : "hidden"}`}
      >
        <div className="flex flex-col justify-center items-center bg-white md:w-98 max-w-98 rounded-lg px-5 py-6">
          <div className="flex flex-col justify-center items-end gap-5 w-full">
            <Image
              onClick={() => {
                blur(), showForm(!show);
              }}
              src={cancel}
              alt="cancel button"
              className="hover:cursor-pointer"
            ></Image>
            <div className="flex flex-row justify-between items-center gap-3 w-full">
              <div className="flex flex-col justify-center items-start gap-3 w-full">
                <h4 className="font-semibold text-sm text-gray">Username</h4>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="username"
                  className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                  placeholder="Jan Novák"
                ></input>
              </div>
              <div className="flex flex-col justify-center items-start gap-3 w-full">
                <h4 className="font-semibold text-sm text-gray">E-mail</h4>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                  placeholder="jan.novak@gmail.com"
                ></input>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <h4 className="font-semibold text-sm text-gray">Password</h4>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                placeholder="*******"
              ></input>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <h4 className="font-semibold text-sm text-gray">Password</h4>
              <input
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                type="password"
                name="rePassword"
                className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                placeholder="*******"
              ></input>
            </div>
            <div className="flex flex-row justify-start items-center gap-3 w-full">
              <h4 className="font-normal text-xs text-gray">
                Pokud máte účet{" "}
                <a
                  className="font-semibold hover:cursor-pointer"
                  onClick={() => showForm(!show)}
                >
                  přihlásit se
                </a>
              </h4>
            </div>
            <button
              type="submit"
              className="flex flex-row justify-center items-center h-11 w-full bg-gray text-white rounded-lg"
            >
              Registrovat se
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
}
