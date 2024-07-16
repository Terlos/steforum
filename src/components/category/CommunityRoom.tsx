import Image from "next/image";
import profile from "/public/profile.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "@/app/utils/types/types";
import { Author } from "@/app/utils/types/types";

interface Category {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  like: number;
  author: Author;
  posts: Post[];
  imageUrl: string;
}

interface communityInterface {
  url?: string;
  blurState: Boolean;
  setDbValue: (item: Category[]) => void;
  activeSearch: Category[] | Post[];
  clear: string;
  showProfile: Boolean;
}

export function CommunityRoom({
  url,
  blurState,
  setDbValue,
  activeSearch,
  clear,
  showProfile,
}: communityInterface) {
  const [CATEGORY, setCategory] = useState<Category[] | Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nothing, setNothing] = useState(false);
  const [holder, setHolder] = useState([]);

  useEffect(() => {
    const filteredData = DATA.find((item) => item.name == url);
    if (filteredData) {
      const { url: apiUrl } = filteredData;
      fetch(apiUrl, {
        method: "POST",
      })
        .then((r) => r.json())
        .then((data) => {
          const postsWithFormattedDate = data.map((category: Category) => ({
            ...category,
            createdAt: new Date(category.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            ),
          }));
          setDbValue(postsWithFormattedDate);
          setHolder(postsWithFormattedDate);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setError("Error fetching posts. Please try again later.");
          setLoading(false);
        });
    }
  }, [url]);

  useEffect(() => {
    function search(holder: Category[]) {
      if (activeSearch.length > 0) {
        setCategory(activeSearch);
        setNothing(false);
      } else if (activeSearch.length === 0 && clear !== "") {
        setNothing(true);
        setCategory([]);
      } else {
        setCategory(holder);
        setNothing(false);
      }
    }
    search(holder);
  }, [clear, activeSearch, holder]);

  function addToLocalStorage(item: Category | Post) {
    const existingItems = JSON.parse(
      localStorage.getItem("recentItems") || "[]"
    );

    let shorterArray = [];

    if (existingItems.length >= 10) {
      shorterArray = existingItems.slice(0, 4);
    } else {
      shorterArray = existingItems;
    }
    shorterArray.push(item);
    localStorage.setItem("recentItems", JSON.stringify(shorterArray));
  }

  return (
    <div
      className={`flex flex-col justify-start items-center gap-6 ${
        blurState ? "blur" : " "
      } ${showProfile ? "blur" : ""}`}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : nothing ? (
        <p>No match</p>
      ) : (
        CATEGORY.map((item: Category | Post) => (
          <Link
            onClick={() => addToLocalStorage(item)}
            href={`/communityRoomPosts/${item.id}`}
            key={item.id}
            className="flex flex-row justify-between items-center w-3/5 bg-white rounded-3xl px-10 py-4 h-32"
          >
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="flex flex-row justify-center items-center gap-3">
                <Image
                  width={24}
                  height={24}
                  src={String(item.author.imageUrl)}
                  alt="Profile pic"
                  className="rounded-full w-6 h-6"
                />
                <h1 className="text-xs font-medium text-gray">
                  {item.author.name}
                </h1>
                <p className="text-xs font-medium text-gray">
                  {item.createdAt}
                </p>
              </div>
              <div>
                <h1 className="text-base text-gray font-semibold">
                  {item.title}
                </h1>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-gray text-xs">
                  {("posts" in item
                    ? item.posts.map((post) => post.like)
                    : []
                  ).reduce((a, b) => a + b, 0)}{" "}
                  likes
                </p>
                <p className="text-gray text-xs">.</p>
                <p className="text-gray text-xs">
                  {"posts" in item ? item.posts.length : 0} posts
                </p>
              </div>
            </div>
            {item.imageUrl && (
              <div className="flex flex-row justify-center items-center">
                <Image
                  width={160}
                  height={120}
                  className="rounded-lg"
                  src={item.imageUrl}
                  alt="Post pic"
                  priority={true}
                />
              </div>
            )}
          </Link>
        ))
      )}
    </div>
  );
}

const DATA = [
  {
    id: 1,
    name: "category",
    url: "http://localhost:3000/api/communityRoom",
  },
  {
    id: 1,
    name: "newest",
    url: "http://localhost:3000/api/communityRoom/newest",
  },
  {
    id: 1,
    name: "latest",
    url: "http://localhost:3000/api/communityRoom/latest",
  },
];
