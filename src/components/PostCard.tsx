"use client";
import Image from "next/image";
import profile from "/public/profile.png";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { updatePostLikes } from "@/actions/updatePostLikes";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

interface postInterface {
  url: string;
  blurState: Boolean;
  setShowCom: (item: any) => void;
  showCom: Boolean;
  isLoggedIn?: Boolean;
  blur: () => void;
  categoryId: string;
  postId: string;
}
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  like: number;
  text: string;
  author: any;
  comments: string;
  categoryId: string;
  category: any;
  isLiked: Boolean;
  imageUrl: string;
}

export function PostCard({
  url,
  blurState,
  setShowCom,
  showCom,
  isLoggedIn,
  blur,
  categoryId,
  postId,
}: postInterface) {
  const [POSTS, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/favourite")) {
      const handleSubmit = async (categoryId: string, postId: string) => {
        fetch("http://localhost:3000/api/post/favourite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryId: categoryId, postId: postId }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Response data:", data.posts); // Log the parsed JSON data
            setPosts(data.posts);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      };
      handleSubmit(categoryId, postId);
    } else {
      const filteredData = DATA.find((item) => item.name === url);
      if (filteredData) {
        const { url: apiUrl } = filteredData;
        fetch(apiUrl, {
          method: "POST",
        })
          .then((r) => r.json())
          .then((data) => {
            const result = data.filter((item: any) => item.parentId == null);
            const postsWithFormattedDate = result.map((post: Post) => ({
              ...post,
              createdAt: new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            }));
            setLoading(false);
            setPosts(postsWithFormattedDate);
          })

          .catch((error) => {
            console.error("Error fetching posts:", error);
            setError("Error fetching posts. Please try again later.");
            setLoading(false);
          });
      }
    }
  }, [url]);

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
      }`}
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
                  <Image src={profile} alt="Profile pic" />
                  <h1 className="text-xs font-medium text-gray">
                    {item.author.name}
                  </h1>
                  <p className="text-xs font-medium text-gray">
                    {item.createdAt}
                  </p>
                  <Link href={`/categoryRoom/${item.categoryId}`}>
                    <p className="text-xs font-medium text-gray">
                      Community: {item.category.name}
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
    name: "post",
    url: "http://localhost:3000/api/post",
  },
  {
    id: 1,
    name: "newest",
    url: "http://localhost:3000/api/newestPost",
  },
  {
    id: 1,
    name: "latest",
    url: "http://localhost:3000/api/latestPost",
  },
];
