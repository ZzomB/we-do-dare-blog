import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';

// sitemap 캐싱 설정 (1시간마다 재생성)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 기본 URL - 환경 변수가 없으면 에러 발생
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!baseUrl) {
    console.error('NEXT_PUBLIC_SITE_URL 환경 변수가 설정되지 않았습니다.');
    return [];
  }

  // URL 형식 검증 (http:// 또는 https://로 시작해야 함)
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    console.error('NEXT_PUBLIC_SITE_URL은 http:// 또는 https://로 시작해야 합니다.');
    return [];
  }

  // 마지막 슬래시 제거
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');

  // 블로그 게시물 가져오기 (에러 처리 추가)
  let blogPosts: MetadataRoute.Sitemap = [];
  let latestPostDate: Date | undefined = undefined;

  try {
    const { posts } = await getPublishedPosts({ pageSize: 100 });

    // 전체 포스트 중 가장 최근 수정/발행일 찾기
    if (posts.length > 0) {
      const dates = posts
        .map((p) => {
          const dateStr = p.modifiedDate || p.date;
          return dateStr ? new Date(dateStr) : null;
        })
        .filter((d): d is Date => d !== null && !isNaN(d.getTime()));
      if (dates.length > 0) {
        latestPostDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      }
    }

    // 블로그 게시물 URL 생성
    blogPosts = posts.map((post) => {
      const postDateStr = post.modifiedDate || post.date;
      const postDate = postDateStr ? new Date(postDateStr) : undefined;

      return {
        url: `${cleanBaseUrl}/blog/${post.slug}`,
        ...(postDate && !isNaN(postDate.getTime()) && { lastModified: postDate }),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    // Notion API 호출 실패 시에도 정적 페이지는 반환
    console.error('블로그 게시물을 가져오는 중 오류 발생:', error);
  }

  // 정적 페이지 목록
  const staticPages = [
    {
      url: `${cleanBaseUrl}/blog`,
      ...(latestPostDate && { lastModified: latestPostDate }),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${cleanBaseUrl}/blog/about`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // 정적 페이지와 블로그 게시물 결합
  return [...staticPages, ...blogPosts];
}
