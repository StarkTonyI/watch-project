import apple from '../../assets/watchs/apple.png';
import xaomi from '../../assets/watchs/xaomi.png';
import fitbit from '../../assets/watchs/fitbit.png';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

export default function Features() {
    const scope = useRef(null);
    gsap.registerPlugin(ScrollTrigger);
    


    const features = [
        {
            title: "Apple",
            desc: "Apple is one of the most famous smart watches providing company.",
            img:apple
        },
        {
            title: "Xaomi",
            desc: "Xiaomi smart watches are produced by MI company.",
            img:xaomi
        },
        {
            title: "FitBit",
            desc: "FitBit smart watches are best for there health and fitness features.",
            img:fitbit
        },
    ];

    useLayoutEffect(()=>{
        const ctx = gsap.context(()=>{
            const tl = gsap.timeline({
                scrollTrigger: {
                trigger:scope.current,
                start:'top center',
                end:'130% bottom',
                scrub:true
        }})
            tl.from('.features-watch-svg', {
                opacity:0,
                y:150
            });


        }, scope);
        return () => ctx.revert();
    }, []);


  return (
    <section className="py-16 bg-transparent" ref={scope} aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-6">
        <h2 id="features-title" className="sr-only">Features</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={i}
              className="
                group
                bg-gradient-to-br from-white/2 to-black/5
                p-5 md:p-6 rounded-2xl
                shadow-md hover:shadow-2xl transition
                transform hover:-translate-y-2 motion-reduce:transform-none
                flex flex-col md:flex-row items-start md:items-center gap-4
                min-h-[120px]
              "
              aria-labelledby={`feature-${i}-title`}
              role="article"
            >
              {/* image block */}
        <div className="flex-shrink-0 w-full sm:w-32 md:w-24 lg:w-28 max-w-[80px] sm:max-w-none features-watch-svg">
  <img
    src={f.img}
    alt={f.title || `feature ${i + 1}`}
    loading="lazy"
    className="w-full h-auto object-contain"
  />
</div>



              {/* text block */}
              <div className="flex-1">
                <h4
                  id={`feature-${i}-title`}
                  className="
                    text-white font-semibold
                    text-[clamp(1rem,2.6vw,1.25rem)]
                    leading-tight mb-2
                  "
                >
                  {f.title}
                </h4>

                <p className="text-gray-400 text-[clamp(.85rem,1.6vw,1rem)]">
                  {f.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
