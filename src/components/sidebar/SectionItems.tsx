import Link from "next/link";

export function SectionItems({
  index,
  recent,
  likePost,
}: {
  index: number;
  recent: any;
  likePost: any;
}) {
  if (index === 0) {
    return (
      <div className="px-4">
        {[...recent]
          .reverse()
          .slice(0, 5)
          .map((recentItem: any) => (
            <Link href={`/categoryRoom/${recentItem.id}`} key={recentItem.id}>
              <div className="border-l-2 border-light-gray hover:border-mid-gray py-2 hover:bg-light-gray px-4 rounded-r-2xl">
                <p className="text-gray font-medium text-sm">
                  {recentItem.name}
                </p>
              </div>
            </Link>
          ))}
      </div>
    );
  } else if (index === 1) {
    return (
      <div className="px-4">
        {[...likePost]
          .reverse()
          .slice(0, 5)
          .map((recentItem: any) => (
            <Link href={`/comments/${recentItem.categoryId}/${recentItem.id}`}>
              <div className="border-l-2 border-light-gray hover:border-mid-gray py-2 hover:bg-light-gray px-4 rounded-r-2xl">
                <p className="text-gray font-medium text-sm">
                  {recentItem.title}
                </p>
              </div>
            </Link>
          ))}
      </div>
    );
  }
}
