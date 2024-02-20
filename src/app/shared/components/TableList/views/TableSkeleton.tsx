export function TableSkeleton() {
  const rows = Array.from({ length: 5 }).map((_, i) => (
    <div
      key={i}
      className="animate-flash-animation w-full h-10 bg-white rounded-md bg-gradient-to-r from-background/75 via-outline/75 to-background/75"
    />
  ));

  return <div className="w-full py-4 flex flex-col gap-4 overflow-x-hidden">{rows}</div>;
}
