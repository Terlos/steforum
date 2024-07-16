"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { updatePostLikes } from "@/actions/updatePostLikes";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { Post } from "@/app/utils/types/types";

interface postInterface {
  url: string;
  blurState: boolean;
  setShowCom: (item: boolean) => void;
  showCom: Boolean;
  isLoggedIn?: Boolean;
  blur: () => void;
  categoryId?: string;
  postId?: string;
  setDbValue: Dispatch<SetStateAction<Post[]>>;
  activeSearch: Post[];
  clear: string;
  showProfile: Boolean;
}

export function PostCard({
  url,
  blurState,
  setShowCom,
  showCom,
  isLoggedIn,
  blur,
  postId,
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
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/favourite")) {
      const handleSubmit = async (postId: string) => {
        fetch("http://localhost:3000/api/post/favourite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId: postId }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setPosts(data.posts);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      };
      postId && handleSubmit(postId);
    } else {
      const filteredData = DATA.find((item) => item.name === url);
      if (filteredData) {
        const { url: apiUrl } = filteredData;
        fetch(apiUrl, {
          method: "POST",
        })
          .then((r) => r.json())
          .then((data) => {
            const result = data.filter((item: Post) => item.parentId == null);
            const postsWithFormattedDate = result.map((post: Post) => ({
              ...post,
              createdAt: new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            }));
            setLoading(false);
            setDbValue(postsWithFormattedDate);
            setHolder(postsWithFormattedDate);
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
            setError("Error fetching posts. Please try again later.");
            setLoading(false);
          });
      }
    }
  }, [url, postId, pathname, setDbValue]);

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

  function addLike(isLiked: boolean, id: string) {
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
        blurState ? "blur" : ""
      } ${showProfile ? "blur" : ""} `}
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
            className={`${
              showProfile ? "blur" : ""
            } flex flex-col justify-center items-center w-3/5 bg-white rounded-3xl px-10 py-4`}
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
                  <Link href={`/categoryRoom/${item.categoryId}`}>
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
                  className="flex flex-row justify-center items-center text-sm gap-1"
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
    name: "post",
    url: "http://localhost:3000/api/post",
  },
  {
    id: 2,
    name: "newest",
    url: "http://localhost:3000/api/post/newest",
  },
  {
    id: 3,
    name: "latest",
    url: "http://localhost:3000/api/post/latest",
  },
];
