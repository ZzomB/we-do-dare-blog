'use client';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import profileLight from '@/public/images/profile-medical-light.png';
import profileDark from '@/public/images/profile-medical-dark.png';

export default function ProfileImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 서버와 클라이언트가 일치하지 않을 때는 기본 이미지를 보여줌
  if (!mounted) {
    return (
      <Image
        src={profileLight}
        alt="cat"
        width={144}
        height={144}
        className="object-cover"
      />
    );
  }

  return (
    <Image
      src={theme === 'light' ? profileLight : profileDark}
      alt="cat"
      width={144}
      height={144}
      className="object-cover"
    />
  );
}
