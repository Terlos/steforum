import Image from "next/image";
import profile from "/public/profile.png";
import placeholder from "/public/placeholder.png";
import { useEffect, useState } from "react";
import Link from "next/link";
interface postInterface {
  url: string;
  blurState: Boolean;
  id: string;
  setCategory: (item: any) => void;
  setShowCom: (item: boolean) => void;
  showCom: boolean;
  category: any;
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
  category: any;
}

export function CategoryRoomPosts({
  url,
  blurState,
  id,
  setCategory,
  category,
  setShowCom,
  showCom,
}: postInterface) {
  const [POSTS, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
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
          const allPosts = data.flatMap((item: any) => item.posts);
          const result = allPosts.filter((item: any) => item.parentId == null);
          setCategory(data[0]);
          const postsWithFormattedDate = result.map((post: Post) => ({
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
        POSTS.map((item: Post) => (
          <>
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
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray">
                      {item.category.name}
                    </p>
                  </div>
                  <div>
                    <h1 className="text-base text-gray font-semibold">
                      {item.title}
                    </h1>
                  </div>
                  <div>
                    <p>{item.text}</p>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center w-full">
                  <Image
                    className="rounded-lg"
                    src={placeholder}
                    alt="Post pic"
                  />
                </div>
                <div className="flex flex-row justify-center items-center gap-1">
                  <p className="text-gray text-sm hover:cursor-pointer hover:font-medium">
                    {item.like} likes
                  </p>
                  <p className="text-gray text-sm">.</p>
                  <Link href={`/comments/${category.id}/${item.id}`}>
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
          </>
        ))
      )}
    </div>
  );
}

const DATA = [
  {
    id: 1,
    name: "all",
    url: "http://localhost:3000/api/categoryPosts",
  },
  {
    id: 1,
    name: "newest",
    url: "http://localhost:3000/api/newestCategoryPosts",
  },
  {
    id: 1,
    name: "latest",
    url: "http://localhost:3000/api/latestCategoryPosts",
  },
];
