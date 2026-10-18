import { Skeleton } from '@/components/ui/skeleton';

export default function PostNavigationSkeleton() {
  return (
    <div className="my-12 border-y border-border/60 py-6">
      <div className="flex items-center justify-between gap-4">
        {/* 이전 글 스켈레톤 */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <Skeleton className="h-4 w-4 shrink-0" />
          <Skeleton className="h-4 w-32 max-w-[80%]" />
        </div>

        {/* 중앙 공유 버튼 자리 */}
        <div className="shrink-0 px-2">
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>

        {/* 다음 글 스켈레톤 */}
        <div className="flex-1 min-w-0 flex items-center justify-end gap-2">
          <Skeleton className="h-4 w-32 max-w-[80%]" />
          <Skeleton className="h-4 w-4 shrink-0" />
        </div>
      </div>
    </div>
  );
}
