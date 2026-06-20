# Wedodare Platform System Specification (SSOT)

본 문서는 Wedodare 플랫폼 산하의 모든 독립 웹 프로젝트(루트, 블로그, 기능 앱)가 동일한 사용자 경험, 디자인 시스템, 그리고 연동 규칙을 따르도록 규정하는 **단일 통합 명세서(Single Source of Truth)**입니다.

---

## 1. 플랫폼 라우팅 및 아키텍처 규칙

### ① 최상위 루트 프로젝트 (`www.wedodare.com`) 역할
* **라우터 역할**: 하위 경로로 들어오는 요청을 각 서브 프로젝트의 실제 배포 주소로 프록시(Rewrite)합니다.
* **설정 예시 (`next.config.ts`)**:
  ```typescript
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    async rewrites() {
      return [
        // 1. 블로그 프로젝트 예시 (실제 경로)
        { source: "/blog", destination: "https://wedodare-blog.vercel.app/blog" },
        { source: "/blog/:path*", destination: "https://wedodare-blog.vercel.app/blog/:path*" },
        
        // 2. 개별 기능 프로젝트 템플릿 (실제 기능명과 배포 주소로 변경하여 추가 사용)
        { source: "/[기능경로]", destination: "https://[서브프로젝트-배포주소].vercel.app/[기능경로]" },
        { source: "/[기능경로]/:path*", destination: "https://[서브프로젝트-배포주소].vercel.app/[기능경로]/:path*" },
      ];
    }
  };
  export default nextConfig;
  ```

### ② 서브 프로젝트 규칙
* **경로 접두사(Base Path) 강제**: 모든 서브 프로젝트는 빌드 결과물 및 정적 자산 경로가 꼬이지 않도록 `basePath`를 본인의 경로 명칭으로 고정해야 합니다.
* **설정 예시 (블로그 기준 `next.config.ts`)**:
  ```typescript
  import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    basePath: "/blog", // 해당 서브 프로젝트의 디렉토리 경로명 기입
  };
  export default nextConfig;
  ```

---

## 2. 공통 디자인 토큰 (Tailwind v4 / CSS Variables)

모든 프로젝트는 아래의 글로벌 CSS 변수를 `app/globals.css`에 주입하여 스타일 테마를 완벽하게 통일해야 합니다.

### CSS 테마 변수 정의 (`globals.css`)
```css
@import 'tailwindcss';
@import 'tw-animate-css';
@plugin 'tailwindcss-animate';
@plugin '@tailwindcss/typography';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  
  /* Wedodare 대표 민트색 브랜딩 컬러 */
  --primary: hsl(153 47% 49%);
  --primary-foreground: oklch(0.985 0 0);
  
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  
  /* 공통 레이아웃 상수 */
  --header-height: 3.5rem;
  --sticky-offset: 1.5rem;
  --sticky-top: calc(var(--header-height) + var(--sticky-offset));
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  
  /* 다크모드 차분한 그레이/화이트 매칭 */
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}
```

---

## 3. 글로벌 공통 내비게이션 바 (Header) 가이드라인

모든 서브디렉토리로의 이동 시 헤더가 깜빡이거나 형태가 어긋나지 않도록 다음 디자인 가이드를 강제합니다.

### ① 헤더 디자인 핵심 스펙
* **높이(Height)**: `h-[3.5rem]` (`h-14`) 고정.
* **배경색(Background)**: 투명도가 가미된 배경 (`bg-background/80 backdrop-blur-md`).
* **경계선(Border)**: 하단에 얇은 보더선 적용 (`border-b border-border`).
* **폭(Width)**: `.container` 클래스 내에 배치하여 좌우 여백을 `max-w-7xl px-4`로 일치시킵니다.

### ② React / Tailwind 컴포넌트 마크업 표준 구조
```tsx
import Link from 'next/link';

export function GlobalHeader({ currentPath }: { currentPath: string }) {
  const navItems = [
    { label: '홈', href: '/' },
    { label: '블로그', href: '/blog' },
    { label: '기능1', href: '/[기능경로]' }, // [기능경로]는 실제 폴더명/경로명으로 치환하여 사용
  ];

  return (
    <header className="sticky top-0 z-50 w-full h-14 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
        
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground hover:opacity-90">
          <span className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs">W</span>
          Wedodare
        </Link>

        {/* 내비게이션 메뉴 */}
        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = currentPath.startsWith(item.href) && (item.href !== '/' || currentPath === '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 오른쪽 유틸리티 영역 (다크모드 토글 등) */}
        <div className="flex items-center gap-4">
          {/* ThemeToggle 컴포넌트 위치 */}
        </div>

      </div>
    </header>
  );
}
```

---

## 4. 검색엔진 최적화(SEO) 및 성능 연동 체크리스트

1. **상대경로/절대경로 검사**: 내부 에셋(이미지, 파비콘 등)을 가리킬 때 반드시 절대 경로 `/`가 아닌 상대 경로 또는 `basePath`가 적용된 경로를 활용합니다.
2. **Canonical 태그 설정**: 중복 사이트 제거를 위해 모든 페이지는 `<link rel="canonical" href="https://www.wedodare.com/blog/..." />` 형태의 통합 도메인 Canonical URL을 가져야 합니다.
3. **통합 로봇 파일**: 메인 사이트의 `public/robots.txt`만 외부에 검색 노출되며, 서브 프로젝트들의 `robots.txt`는 비활성화하거나 무시됩니다.
