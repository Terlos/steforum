import Image from "next/image";
import search from "/public/search.svg";
import cancel from "/public/cancel.svg";
export function SearchBar() {
  return (
    <form className="flex flex-row justify-center items-center gap-2 p-2 rounded-full border border-black border-1 bg-white w-full max-w-md">
      <Image src={search} width={24} height={24} alt="Discord Link"></Image>
      <input
        type="text"
        className="text-gray font-poppins text-base font-normal outline-none w-full bg-white"
        placeholder="Search by name"
      ></input>
      <Image
        src={cancel}
        width={24}
        height={24}
        alt="Discord Link"
        className="hover:cursor-pointer"
      ></Image>
    </form>
  );
}
