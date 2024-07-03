export function SectionItems({ index }: { index: number }) {
  if (index === index) {
    return (
      <div className="px-4">
        {RECENT.map((recentItem) => (
          <div
            className="border-l-2 border-light-gray hover:border-mid-gray py-2 hover:bg-light-gray px-4 rounded-r-2xl"
            key={recentItem.id}
          >
            <p className="text-gray font-medium text-sm">{recentItem.title}</p>
          </div>
        ))}
      </div>
    );
  }
}

const RECENT = [
  {
    id: 1,
    title: "Empty",
  },
];
