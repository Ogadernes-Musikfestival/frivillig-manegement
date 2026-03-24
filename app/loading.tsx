export default function Loading() {
  return (
    <div className="p-8 flex gap-4">
      <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
      <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
    </div>
  );
}
