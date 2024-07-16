import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "/public/profile.png";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { updatePostLikes } from "@/actions/updatePostLikes";
import { Author } from "@/app/utils/types/types";

interface CommentsProps {
  id: string;
  blurState: Boolean;
  url: string;
  isLoggedIn: Boolean;
  showProfile: Boolean;
}
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  like: number;
  text: string;
  author: Author;
  comments: string;
  isLiked: Boolean;
  imageUrl: string;
}

export function Comments({
  id,
  blurState,
  url,
  isLoggedIn,
  showProfile,
}: CommentsProps) {
  const [POSTS, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const filteredData = DATA.find((item) => item.name === url);
    if (filteredData) {
      const { url: apiUrl, name: apiName } = filteredData;

      const changeApi =
        apiName === "newest" || apiName === "latest"
          ? `${apiUrl}/${id}/${apiName}`
          : `${apiUrl}/${id}`;

      setLoading(true);
      setError(null);

      fetch(changeApi, {
        method: "POST",
      })
        .then((r) => {
          if (!r.ok) {
            throw new Error(`HTTP error! status: ${r.status}`);
          }
          return r.json();
        })
        .then((data) => {
          const postsWithFormattedDate = data.map((post: Post) => ({
            ...post,
            createdAt: new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          }));
          setPosts(postsWithFormattedDate);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setError("Error fetching posts. Please try again later.");
          setLoading(false);
        });
    }
  }, [url, id]);

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
                    priority={true}
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
    url: "http://localhost:3000/api/comment",
  },
  {
    id: 1,
    name: "newest",
    url: "http://localhost:3000/api/comment/",
  },
  {
    id: 1,
    name: "latest",
    url: "http://localhost:3000/api/comment/",
  },
];
