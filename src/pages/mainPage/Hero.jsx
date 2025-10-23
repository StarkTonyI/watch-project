// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import SplitType from "split-type";

export default function Hero() {
    const heroBlock = useRef(null);
    useLayoutEffect(()=>{
        const split = new SplitType('.hero-char', { types: 'chars' });
        gsap.from(split.chars, {
            x: () => gsap.utils.random(-200, 200), 
            y: () => gsap.utils.random(-200, 200), opacity: 1, duration:2, stagger:0.02, delay:4.5
        })
    }, []);

    return (
// React + Tailwind (Motion оставил как есть)
<section className="bg-transparent py-16 md:py-20" ref={heroBlock}>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 mt-11  md:gap-10 items-center">
   <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Заголовок: используем clamp для плавного масштабирования */}
      <h2 className="text-[clamp(2rem,6.5vw,3.75rem)] md:text-[clamp(2.25rem,5.5vw,3.75rem)] text-white font-poppins font-bold mb-6 leading-[0.98] md:leading-[1.02] flex flex-col gap-2">
        <span className="hero-char inline-block break-words">Discover</span>
        <span className="hero-char inline-block break-words">Most Suitable</span>
        <span className="hero-char inline-block break-words">Watches</span>
      </h2>

      {/* Параграф: ограничиваем ширину, используем clamp для размера текста */}
      <p className="text-[clamp(.85rem,1.6vw,1rem)] md:text-[clamp(.95rem,1.2vw,1.05rem)] text-[#8B8E99] font-poppins font-medium mb-6 max-w-[55ch]">
        Find the best, reliable, and cheap smart watches here. We focus on product quality. Here you can find smart watches of almost all brands. So why you are waiting? Just order now!
      </p>

      {/* Кнопки/CTA — тоже адаптивные */}
      <div className="flex flex-wrap gap-3">
        <button className="px-5 py-3 text-[clamp(.8rem,1.2vw,.95rem)] font-medium rounded-full bg-white text-black shadow-sm">
          Shop Now
        </button>
        <button className="px-5 py-3 text-[clamp(.8rem,1.2vw,.95rem)] font-medium rounded-full border border-white/20 text-white">
          Learn More
        </button>
      </div>
    </motion.div>

  </div>
</section>

    );
}

