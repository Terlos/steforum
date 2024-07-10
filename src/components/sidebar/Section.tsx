import Image from "next/image";
import arrow from "/public/arrow.svg";
import { HtmlContext } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
interface Item {
  id: number;
  title: string;
  icon: string;
}

interface Section {
  toggleSection: (index: number) => void;
  item: Item;
  index: number;
  openIndices: number[];
  getFromLocalStorage: () => void;
  getLikes: () => void;
}

export function Section({
  toggleSection,
  item,
  index,
  openIndices,
  getFromLocalStorage,
  getLikes,
}: Section) {
  return (
    <div
      onClick={() => {
        toggleSection(index);
        if (index == 0) {
          getFromLocalStorage();
        } else if (index == 1) {
          getLikes();
        }
      }}
      className="flex flex-row justify-between items-center hover:cursor-pointer hover:bg-light-gray py-2 rounded-2xl px-3 w-full"
    >
      <div className="flex flex-row justify-start items-center gap-4">
        <Image width={20} height={20} src={item.icon} alt={item.title} />
        <h1 className="font-semibold text-base text-gray">{item.title}</h1>
      </div>
      <Image
        src={arrow}
        alt="Arrow"
        className={openIndices.includes(index) ? "rotate-180" : "arrow"}
      />
    </div>
  );
}
