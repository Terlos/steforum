import { Toaster, toast } from "sonner";
import cancel from "/public/cancel.svg";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/auth";
interface LoginForm {
  blur: () => void;
  blurState: Boolean;
  showForm: () => void;
  show: Boolean;
}
export function LoginForm({ blur, blurState, showForm, show }: LoginForm) {
  return (
    <form
      action={async (formData) => {
        await login(formData);
        redirect("/");
      }}
      className={`flex flex-row justify-center items-center px-4 md:px-0 absolute left-3 right-0 top-20 z-20 ${
        blurState ? "" : "hidden"
      } ${show ? "hidden" : ""}`}
    >
      <div className="flex flex-col justify-center items-center bg-white md:w-98 max-w-98 rounded-lg px-5 py-6">
        <div className="flex flex-col justify-center items-end gap-5 w-full">
          <Image
            onClick={() => blur()}
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
                className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
                placeholder="Jan Novák"
              ></input>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 w-full">
              <h4 className="font-semibold text-sm text-gray">E-mail</h4>
              <input
                required
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
              type="password"
              name="password"
              className="w-full rounded-lg h-10 border-gray border place-content-start pl-2  text-gray text-sm"
              placeholder="*******"
            ></input>
          </div>
          <div className="flex flex-row justify-start items-center gap-3 w-full">
            <h4 className="font-normal text-xs text-gray">
              Pokud máte účet{" "}
              <a
                className="font-semibold hover:cursor-pointer"
                onClick={() => showForm()}
              >
                registrovat se
              </a>
            </h4>
          </div>
          <button className="flex flex-row justify-center items-center h-11 w-full bg-gray text-white rounded-lg">
            Přihlásit se
          </button>
        </div>
      </div>
    </form>
  );
}
