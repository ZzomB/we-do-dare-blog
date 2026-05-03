import { Skeleton } from '@/components/ui/skeleton';
export default function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
