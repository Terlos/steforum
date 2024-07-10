import Image from "next/image";
import arrow from "/public/arrow.svg";
import { useEffect, useState } from "react";
import { Section } from "./Section";
import recent from "/public/recent.svg";
import communities from "/public/communities.svg";
import friends from "/public/friends.svg";
import { SectionItems } from "./SectionItems";

interface SideBar {
  blurState: Boolean;
}

export function SideBar({ blurState }: SideBar) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);
  const [recent, setRecent] = useState([]);
  const [likePost, setLikePost] = useState([]);

  const toggleSection = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((item) => item !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  function getFromLocalStorage() {
    const storedItems = localStorage.getItem("recentItems");

    if (storedItems) {
      setRecent(JSON.parse(storedItems));
    } else {
      setRecent([]);
    }
  }

  function getLikes() {
    fetch("http://localhost:3000/api/getLikes", {
      method: "POST",
    })
      .then((r) => r.json())
      .then((data) => {
        const result = data.filter((item: any) => item.parentId == null);
        setLikePost(result);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }

  return (
    <div className={`w-full ${blurState ? "blur" : " "}`}>
      <div
        className="flex sticky top-36 flex-col bg-white w-64 rounded-tr-2xl px-6 pt-6 gap-2 h-screen-without-header overflow-y-scroll overflow-x-hidden
      scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray scrollbar-w-2 scroll-smooth  scrollbar"
      >
        {DATA.map((item, index) => (
          <div key={item.id}>
            <Section
              toggleSection={toggleSection}
              item={item}
              index={index}
              openIndices={openIndices}
              getFromLocalStorage={getFromLocalStorage}
              getLikes={getLikes}
            />
            {openIndices.includes(index) && (
              <SectionItems index={index} recent={recent} likePost={likePost} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const DATA = [
  {
    id: 1,
    title: "Recent",
    icon: recent,
  },
  {
    id: 2,
    title: "Favourite",
    icon: friends,
  },
  {
    id: 3,
    title: "Communities",
    icon: communities,
  },
  {
    id: 4,
    title: "Friends",
    icon: friends,
  },
];
