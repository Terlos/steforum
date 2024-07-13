import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "/public/profile.png";
import { Darumadrop_One } from "next/font/google";

interface CommentsProps {
  id: string;
  blurState: Boolean;
  setCategory: (item: any) => void;
  url: string;
}
interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  like: number;
  text: string;
  author: any;
  comments: any;
  posts: any;
  imageUrl: string;
}

export function Comments({ id, blurState, setCategory, url }: CommentsProps) {
  const [POSTS, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const filteredData = DATA.find((item) => item.name === url);
    if (filteredData) {
      const { url: apiUrl } = filteredData;
      fetch(`${apiUrl}/${id}`, {
        method: "POST",
      })
        .then((r) => r.json())
        .then((data) => {
          setCategory(data[0].category);
          const postsWithFormattedDate = data[0].comments.map((post: Post) => ({
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
  }, [url]);
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
            <div className="flex flex-col justify-center items-start w-full gap-4">
              <div className="flex flex-col justify-center items-start gap-4">
                <div className="flex flex-row justify-center items-center gap-3">
                  <Image src={profile} alt="Profile pic" />
                  <h1 className="text-xs font-medium text-gray">
                    {item.author.name}
                  </h1>
                  <p className="text-xs font-medium text-gray">
                    {item.createdAt}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray">{item.text}</p>
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
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-gray text-sm">{item.like} likes</p>
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
    url: "http://localhost:3000/api/comments",
  },
  {
    id: 1,
    name: "newest",
    url: "http://localhost:3000/api/newestComments",
  },
  {
    id: 1,
    name: "latest",
    url: "http://localhost:3000/api/latestComments",
  },
];
