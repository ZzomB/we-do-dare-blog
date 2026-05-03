import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function Loading() {
  return (
    <div className="py-6 md:py-12 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:max-w-screen-2xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[240px_1fr_240px] md:gap-8 lg:grid-cols-[260px_1fr_260px] lg:gap-12">
          <aside className="hidden md:block"></aside>
          <section className="overflow-hidden">
            {/* 블로그 헤더 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-[60px] rounded-full" />
                  <Skeleton className="h-6 w-[80px] rounded-full" />
                </div>
                <Skeleton className="h-10 w-3/4 md:w-1/2" />
              </div>

              {/* 메타 정보 */}
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
            </div>

            {/* 메인 이미지 */}
            <Skeleton className="relative mt-8 mb-8 aspect-video w-full rounded-lg shadow-lg" />

            <Separator className="my-8" />

            {/* 모바일 전용 목차 */}
            <div className="mb-6 md:hidden">
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            {/* 본문 컨텐츠 */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            <Separator className="my-16" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </section>
          
          <aside className="relative hidden md:block">
            <div className="sticky top-(--sticky-top)">
              <div className="bg-muted/50 rounded-lg p-6 backdrop-blur-sm">
                <Skeleton className="h-7 w-[60px] mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5 ml-4" />
                  <Skeleton className="h-4 w-3/4 ml-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
