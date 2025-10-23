import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function BigWatchPage() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    if (!scope.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Разбиваем текст на символы ВНУТРИ scope
      const split = new SplitType(".bitWatch-char", { types: "chars" });

        gsap.set(split.chars, {
        opacity: 0,
        y: 20,
        display: "inline-block", 
        })  

      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "center bottom",
          end: "bottom bottom",
          scrub: false,
        },
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
<section
  ref={scope}
  className="relative min-h-screen w-full text-white overflow-hidden py-10"
>


  {/* мягкий градиент сверху/снизу для контраста текста */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none" />

  {/* Контент: центрируем на мобилке, вправо на десктопе; ограничаем max-width */}
  <div className="relative h-full max-w-6xl mx-auto px-6 flex items-center">
    <div className="w-full flex justify-center md:justify-end">
      <div className="max-w-[56ch] md:max-w-[42ch] lg:max-w-[48ch]">
        <h1
          className="bitWatch-char translate-y-2 font-extrabold leading-tight
            text-[clamp(1.75rem,6vw,3.75rem)] md:text-[clamp(2.25rem,4.5vw,4.25rem)]"
        >
          Best Watch Model
        </h1>

        <p className="bitWatch-char translate-y-2 mt-3 text-[clamp(.92rem,2.2vw,1.05rem)] text-gray-300">
          Get free guide about smart watches daily. Short, clear Smart Watch.
        </p>

        {/* Пример CTA (необязательно) */}
        <div className="mt-6 flex gap-3 justify-center md:justify-start">
          <button className="px-5 py-3 rounded-full bg-white text-black font-medium shadow-sm">
            Get Guide
          </button>
          <button className="px-4 py-3 rounded-full border border-white/20 text-white">
            Learn More
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
