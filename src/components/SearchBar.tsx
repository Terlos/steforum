import Image from "next/image";
import search from "/public/search.svg";
import cancel from "/public/cancel.svg";
import { Post, Category } from "@/app/utils/types/types";
interface SearchBar {
  dbValue: Array<Post | Category>;
  setActiveSearch: (item: Array<Post | Category>) => void;
  setClear: (item: string) => void;
  clear: string;
}

export function SearchBar({
  dbValue,
  setActiveSearch,
  setClear,
  clear,
}: SearchBar) {
  const handleSearch = (e: string) => {
    if (e == "") {
      setActiveSearch([]);
      return false;
    }
    if (clear == "") {
      const result = dbValue
        .filter((product: any) =>
          product.title.toLowerCase().includes(e.toLowerCase())
        )
        .slice(0, 6);
      setActiveSearch(result);
    }
  };

  return (
    <form className="flex flex-row justify-center items-center gap-2 p-2 rounded-full border border-black border-1 bg-white w-full max-w-md">
      <Image src={search} width={24} height={24} alt="Discord Link"></Image>
      <input
        value={clear}
        onChange={(e) => {
          setClear(e.target.value);
          handleSearch(e.target.value);
        }}
        type="text"
        className="text-gray font-poppins text-base font-normal outline-none w-full bg-white"
        placeholder="Search by title"
      ></input>
      <Image
        onClick={() => setClear("")}
        src={cancel}
        width={24}
        height={24}
        alt="Discord Link"
        className="hover:cursor-pointer"
      ></Image>
    </form>
  );
}
