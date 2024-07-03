import Image from "next/image";
import profile from "/public/profile.png";
import placeholder from "/public/placeholder.png";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  like: number;
  author: any;
  posts: any;
}

interface communityInterface {
  url?: string;
  blurState: Boolean;
}

export function CategoryCard({ url, blurState }: communityInterface) {
  const [CATEGORY, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          setCategory(postsWithFormattedDate);
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
      className={`flex flex-col justify-start items-center pt-6 gap-6 ${
        blurState ? "blur" : " "
      }`}
    >
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        CATEGORY.map((item) => (
          <Link
            href={`/categoryRoom/${item.id}`}
            key={item.id}
            className="flex flex-row justify-between items-center w-3/5 bg-white rounded-3xl px-10 py-4 h-32"
          >
            <div className="flex flex-col justify-center items-start gap-1">
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
                <h1 className="text-base text-gray font-semibold">
                  {item.name}
                </h1>
              </div>
              <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-gray text-xs">
                  {item.posts
                    .map((post: any) => post.like)
                    .reduce((a: number, b: number) => a + b, 0)}{" "}
                  likes
                </p>
                <p className="text-gray text-xs">.</p>
                <p className="text-gray text-xs">{item.posts.length} posts</p>
              </div>
            </div>
            <Image
              height={150}
              width={180}
              src={placeholder}
              alt="Post pic"
              className="border rounded-lg"
            />
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
    url: "http://localhost:3000/api/category",
  },
  {
    id: 1,
    name: "newest",
    url: "http://localhost:3000/api/newestCategory",
  },
  {
    id: 1,
    name: "latest",
    url: "http://localhost:3000/api/latestCategory",
  },
];
