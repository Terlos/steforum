import Link from "next/link";
import { Category, Post } from "@/app/utils/types/types";
export function SectionItems({
  index,
  recent,
  likePost,
  loading,
}: {
  index: number;
  recent: Category[];
  likePost: Post[];
  loading: Boolean;
}) {
  if (index === 0) {
    return (
      <>
        {recent.length > 0 ? (
          <div className="px-4">
            {[...recent]
              .reverse()
              .slice(0, 5)
              .map((recentItem: Category) => (
                <Link
                  href={`/communityRoomPosts/${recentItem.id}`}
                  key={recentItem.id}
                >
                  <div className="border-l-2 border-light-gray hover:border-mid-gray py-2 hover:bg-light-gray px-4 rounded-r-2xl">
                    <p className="text-gray font-medium text-sm">
                      {recentItem.title}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        ) : (
          <div className="border-l-2 border-light-gray hover:border-mid-gray py-2 hover:bg-light-gray px-4 rounded-r-2xl">
            <p className="text-gray font-medium text-sm">
              No recent communities
            </p>
          </div>
        )}
      </>
    );
  } else if (index === 1) {
    return loading ? (
      <div className="border-l-2 border-light-gray hover:border-mid-gray py-2 hover:bg-light-gray px-4 rounded-r-2xl">
        <p className="text-gray font-medium text-sm">Loading...</p>
      </div>
    ) : likePost.length > 0 ? (
      <div className="px-4">
        {[...likePost]
          .reverse()
          .slice(0, 5)
          .map((recentItem: Post) => (
            <Link
              href={`/favourite/${recentItem.categoryId}/${recentItem.id}`}
              key={recentItem.id}
            >
              <div className="border-l-2 border-light-gray hover:border-mid-gray py-2 hover:bg-light-gray px-4 rounded-r-2xl">
                <p className="text-gray font-medium text-sm">
                  {recentItem.title}
                </p>
              </div>
            </Link>
          ))}
      </div>
    ) : (
      <div className="border-l-2 border-light-gray hover:border-mid-gray py-2 hover:bg-light-gray px-4 rounded-r-2xl">
        <p className="text-gray font-medium text-sm">No favourite posts</p>
      </div>
    );
  }
}
