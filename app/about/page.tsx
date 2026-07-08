import type { Metadata } from 'next';
import { Mail, Github, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: '소개',
  alternates: {
    canonical: '/blog/about',
  },
};

export default function About() {
  return (
    <div className="container max-w-2xl py-16 px-4">
      <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Us</span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-primary to-emerald-500 bg-clip-text text-transparent">
            WeDoDare
          </h1>
          <p className="text-muted-foreground text-lg font-light leading-relaxed">
            나를 이루는 작은 도전들
          </p>
        </div>

        {/* Description card */}
        <div className="w-full rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur-sm text-left space-y-6">
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            우리는 일상의 작은 도전을 기록하고, 새로운 아이디어를 기술로 실현하며, 함께 성장의 가치를 나누는 공간입니다. 여행, 의료, 음악, 기술 등 경계를 두지 않고 다양한 분야의 도전과 배움을 기록해 나갑니다.
          </p>

          <div className="h-[1px] bg-border/60" />

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">Contact & Links</h3>
            
            <div className="grid gap-3">
              {/* Email */}
              <a
                href="mailto:mrjbk77@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-xs text-muted-foreground font-medium">Email</span>
                  <span className="text-xs md:text-sm font-semibold text-foreground">mrjbk77@gmail.com</span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/ZzomB"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-background/30 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-xs text-muted-foreground font-medium">GitHub</span>
                  <span className="text-xs md:text-sm font-semibold text-foreground">github.com/ZzomB</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
