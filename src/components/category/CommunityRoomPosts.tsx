import Image from "next/image";
import profile from "/public/profile.png";
import { useEffect, useState } from "react";
import { updatePostLikes } from "@/actions/updatePostLikes";
import { toast } from "sonner";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Category, Post } from "@/app/utils/types/types";

interface postInterface {
  url: string;
  blurState: Boolean;
  id: string;
  setCategory: (item: Category[]) => void;
  setShowCom: (item: boolean) => void;
  showCom: boolean;
  category: Category[];
  isLoggedIn: Boolean;
  blur: () => void;
  setDbValue: (item: Post[]) => void;
  activeSearch: Post[];
  clear: string;
  showProfile: Boolean;
}

export function CommunityRoomPosts({
  url,
  blurState,
  id,
  setCategory,
  setShowCom,
  showCom,
  isLoggedIn,
  blur,
  setDbValue,
  activeSearch,
  clear,
  showProfile,
}: postInterface) {
  const [POSTS, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nothing, setNothing] = useState(false);
  const [holder, setHolder] = useState([]);

  useEffect(() => {
    const filteredData = DATA.find((item) => item.name === url);
    if (filteredData) {
      const { url: apiUrl, name: apiName } = filteredData;

      const changeApi =
        apiName === "newest" || apiName === "latest"
          ? `${apiUrl}/${id}/${apiName}`
          : `${apiUrl}/${id}`;

      fetch(`${changeApi}`, {
        method: "POST",
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          const result = data.filter((item: Post) => item.parentId == null);
          setCategory(data);
          const postsWithFormattedDate = result.map((post: Post) => ({
            ...post,
            createdAt: new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          }));
          setPosts(postsWithFormattedDate);
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
    function search(holder: Post[]) {
      if (activeSearch.length > 0) {
        setPosts(activeSearch);
        setNothing(false);
      } else if (activeSearch.length === 0 && clear !== "") {
        setNothing(true);
        setPosts([]);
      } else {
        setPosts(holder);
        setNothing(false);
      }
    }
    search(holder);
  }, [clear, activeSearch, holder]);

  function addLike(isLiked: Boolean, id: string) {
    if (isLoggedIn) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id
            ? {
                ...post,
                like: isLiked ? post.like - 1 : post.like + 1,
                isLiked: !post.isLiked,
              }
            : post
        )
      );
      updatePostLikes(id);
    } else {
      blur();
      toast("You have to be logged in to like the post");
    }
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
        POSTS.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center w-3/5 bg-white rounded-3xl px-10 py-4"
          >
            <div className="flex flex-col justify-center items-start w-full gap-6">
              <div className="flex flex-col justify-center items-start gap-4">
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
                  <Link href={`/communityRoom/${item.categoryId}`}>
                    <p className="text-xs font-medium text-gray">
                      Community: {item.category.title}
                    </p>
                  </Link>
                </div>
                <div>
                  <h1 className="text-base text-gray font-semibold">
                    {item.title}
                  </h1>
                </div>
                <div>
                  <p className="text-sm text-gray">{item.text}</p>
                </div>
              </div>
              {item.imageUrl && (
                <div className="flex flex-row justify-center items-center w-full">
                  <Image
                    width={650}
                    height={650}
                    className="rounded-lg"
                    src={item.imageUrl}
                    alt="Post pic"
                    priority={true}
                  />
                </div>
              )}
              <div className="flex flex-row justify-center items-center gap-1">
                <p
                  onClick={() => {
                    addLike(item.isLiked, item.id);
                  }}
                  className={`flex flew-row justify-center items-center text-sm gap-1 `}
                >
                  {item.like}{" "}
                  <Heart
                    size={14}
                    className={`${
                      item.isLiked ? "text-red-800 fill-red-800" : "text-gray"
                    }`}
                  />
                </p>
                <p className="text-gray text-sm">.</p>
                <Link href={`/comments/${item.categoryId}/${item.id}`}>
                  <p
                    onClick={() => {
                      setShowCom(!showCom);
                    }}
                    className="text-gray text-sm hover:cursor-pointer hover:font-medium"
                  >
                    {item.comments.length} comments
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const DATA = [
  {
    id: 1,
    name: "all",
    url: "http://localhost:3000/api/communityRoomPosts",
  },
  {
    id: 1,
    name: "newest",
    url: "http://localhost:3000/api/communityRoomPosts",
  },
  {
    id: 1,
    name: "latest",
    url: "http://localhost:3000/api/communityRoomPosts",
  },
];
