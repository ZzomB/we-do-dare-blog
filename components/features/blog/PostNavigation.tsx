import Link from 'next/link';
import { getPublishedPosts } from '@/lib/notion';
import ShareButton from '@/components/ShareButton';

interface PostNavigationProps {
  currentSlug: string;
}

export default async function PostNavigation({ currentSlug }: PostNavigationProps) {
  // 전체 공개 포스트 목록 조회 (unstable_cache로 캐시되어 즉시 반환됨)
  const { posts } = await getPublishedPosts({ pageSize: 100 });
  
  // noindex 태그가 붙은 글은 이전/다음 글 탐색에서 제외
  const validPosts = posts.filter((p) => !p.tags?.includes('noindex'));

  const currentIndex = validPosts.findIndex((p) => p.slug === currentSlug);

  // posts는 최신순(내림차순) 정렬:
  // currentIndex보다 인덱스가 크면 '이전 글 (더 과거 글)'
  // currentIndex보다 인덱스가 작으면 '다음 글 (더 최신 글)'
  const prevPost =
    currentIndex >= 0 && currentIndex < validPosts.length - 1
      ? validPosts[currentIndex + 1]
      : null;
  const nextPost =
    currentIndex > 0 ? validPosts[currentIndex - 1] : null;

  return (
    <nav aria-label="이전글 및 다음글 탐색" className="my-12 border-y border-border/60 py-6">
      <div className="flex items-center justify-between gap-4">
        {/* 이전 글 (과거 글) */}
        <div className="flex-1 min-w-0">
          {prevPost ? (
            <Link
              href={`/${prevPost.slug}`}
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors max-w-full"
              title={`이전 글: ${prevPost.title}`}
            >
              <span className="shrink-0 font-medium transition-transform group-hover:-translate-x-1">
                &lt;
              </span>
              <span className="truncate">{prevPost.title}</span>
            </Link>
          ) : (
            <span className="text-xs text-muted-foreground/40 select-none">
              첫 번째 글입니다
            </span>
          )}
        </div>

        {/* 중앙 공유 버튼 */}
        <div className="shrink-0 px-2">
          <ShareButton />
        </div>

        {/* 다음 글 (최신 글) */}
        <div className="flex-1 min-w-0 text-right">
          {nextPost ? (
            <Link
              href={`/${nextPost.slug}`}
              className="group inline-flex items-center justify-end gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors max-w-full ml-auto"
              title={`다음 글: ${nextPost.title}`}
            >
              <span className="truncate">{nextPost.title}</span>
              <span className="shrink-0 font-medium transition-transform group-hover:translate-x-1">
                &gt;
              </span>
            </Link>
          ) : (
            <span className="text-xs text-muted-foreground/40 select-none">
              마지막 글입니다
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
