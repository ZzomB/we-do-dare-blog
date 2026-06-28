'use client';

import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

export default function ShareButton() {
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    if (!mounted) return;

    const shareData = {
      title: document.title,
      url: window.location.href,
    };

    // navigator.share API가 브라우저에 존재하고 호출 가능할 때 실행
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err: any) {
        // 사용자가 취소(AbortError)한 경우가 아니라면 클립보드 복사로 대체
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      
      // 2.5초 후 토스트 알림 닫기
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2500);

      return () => clearTimeout(timer);
    } catch (err) {
      console.error('Failed to copy link: ', err);
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 hover:bg-neutral-100/80 dark:bg-neutral-900/40 dark:hover:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 text-sm font-medium transition-all duration-200 active:scale-95 cursor-pointer shadow-xs hover:shadow-sm"
        aria-label="게시글 공유하기"
      >
        <Share2 className="w-4.5 h-4.5 text-neutral-600 dark:text-neutral-400" />
        <span>공유</span>
      </button>

      {/* 복사 성공 토스트 알림 */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-neutral-900/90 dark:bg-neutral-100/95 text-neutral-50 dark:text-neutral-900 px-5 py-2.5 rounded-full text-xs font-semibold shadow-lg border border-neutral-800 dark:border-neutral-200 transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-300">
            링크가 클립보드에 복사되었습니다!
          </div>
        </div>
      )}
    </>
  );
}
