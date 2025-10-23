import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import apple1 from '../../../assets/watchs/watch1.png';
import apple2 from '../../../assets/watchs/watch2.png';
import apple3 from '../../../assets/watchs/watch3.png';
import apple4 from '../../../assets/watchs/watch4.png';
import apple5 from '../../../assets/watchs/watch5.png';
import apple6 from '../../../assets/watchs/watch6.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWindowWidth from '../../functions';
export default function WatchList(){
  const scope = useRef()
  const [start, setStart] = useState(false);
  const scollWatch = useRef(null);
  const width = useWindowWidth();
    const watchArr = [
        {
            title:'Apple Smart 1',
            price:370,
            img:apple1,
            stars:3
        },
         {
            title:'Apple Smart 2',
            price:642,
            img:apple2,
            stars:4
        },
         {
            title:'Apple Smart 3',
            price:525,
            img:apple3,
            stars:5
        },
         {
            title:'Apple Smart 4',
            price:235,
            img:apple4,
            stars:5
        },
         {
            title:'Apple Smart 5',
            price:155,
            img:apple5,
            stars:2
        },
        {
            title:'Apple Smart 6',
            price:355,
            img:apple6,
            stars:4
        }
]

function easeOutQuad(t) {
  return t * (2 - t);
}

useLayoutEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  
const mm = gsap.matchMedia();
  const ctx = gsap.context(()=>{
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: scope.current,
    start: 'center bottom',
    onEnter: () => setStart(true)
  }
});

tl.to('.watchList-image', {
  opacity:1,
  stagger:0.2,
  duration:0.8
})

tl.to('.watchList-nofill-star', {
  opacity: 1,
  duration: 0.5,
  stagger: 0.1
}, '-=1');


gsap.utils.toArray('.watchList-fill-star').forEach((star, i) => {
  gsap.timeline({ delay: i * 0.3 }) // каждая звезда стартует чуть позже
    .to(star, {
      fill: 'white',
      scale: 1.6,
      duration: 0.5,
      ease: 'power2.out'
    })
    .to(star, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in'
    });
});

mm.add("(max-width: 630px)", () => {
  gsap.to(scollWatch.current, {
    yPercent: 260,
    scale: 1.3,
    scrollTrigger: {
      trigger: scollWatch.current,
      start: 'center center',
      end: '+=500',
      scrub: true,
    }
  });
});


mm.add("(min-width: 631px)", () => {
  gsap.to(scollWatch.current, {
    xPercent: -60,
    yPercent: 235,
    scale: 1.2,
    scrollTrigger: {
      trigger: scollWatch.current,
      start: 'center center',
      end: '+=500',
      scrub: true,
    }
  });
});

mm.add("(min-width: 736px)", () => {
  gsap.to(scollWatch.current, {
    xPercent: -150,
    yPercent: 155,
    scale: 1.2,
    scrollTrigger: {
      trigger: scollWatch.current,
      start: 'center center',
      end: '+=500',
      scrub: true,
    }
  });
});

mm.add("(min-width: 1030px)", () => {
  gsap.to(scollWatch.current, {
    xPercent: -210,
    yPercent: 170,
    scale: 1.5,
    scrollTrigger: {
      trigger: scollWatch.current,
      start: 'center center',
      end: '+=700',
      scrub: true,
    }
  });
});



}, scope)

    return () => {
    if (ctx) ctx.revert();
    if (mm) mm.revert();
  };
});

function AnimatedNumber({ value, duration = 1000 }) {
  const [count, setCount] = useState(0);
  const [scale, setScale] = useState(false);

  // рефы, чтобы хранить данные между кадрами без перерендеров
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const fromRef = useRef(0); // число, с которого анимируемся

  useEffect(() => {
    // отменяем прошлую анимацию (если была)
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    // берем текущее число, отображаемое на экране, как старт
    fromRef.current = count;
    startRef.current = performance.now();
    setScale(true);

    function update(now) {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      // интерполируем от from -> value
      const current = Math.floor(fromRef.current + (value - fromRef.current) * eased);
      setCount(current);
  
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      } else {
        // финал — выставим точно целевое значение (на случай округлений)
        setCount(value);
        rafRef.current = null;
        setScale(false)
      }
    }

    rafRef.current = requestAnimationFrame(update);

    return () => {
      // cleanup при unmount или перед следующим эффектом
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]); // запускаем заново, когда изменился target

  return <span
  className={`inline-block transform transition-transform duration-200 ease-out ${
    scale ? 'scale-125 font-bold' : 'scale-100'
  }`}
>
  {count}
</span>

};

  console.log(width);
 return (
    <section
      ref={scope}
      className="min-h-screen w-full text-white flex flex-col items-center"
      aria-labelledby="watchlist-heading"
    >
      <div className="w-full max-w-7xl px-6">
        <header className="watchlist-header-block flex items-center justify-center font-bold mb-8">
          <h2
            id="watchlist-heading"
            className="text-center text-[clamp(1.4rem,4.8vw,2.5rem)] md:text-[clamp(1.8rem,3.6vw,3rem)]"
          >
            Our Latest Products
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {watchArr.map((item, idx) => {
            const key = item.id ?? idx;
            return (
              <article
                key={key}
                className="watchlist-card bg-gradient-to-b from-white/3 to-black/5 p-5 md:p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center text-center"
                role="group"
                aria-labelledby={`watch-title-${key}`}
              >
                {/* Image */}
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={item.img}
                    alt={item.title ?? `watch ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    ref={idx + 1 === watchArr.length ? scollWatch : null}
                    className="
                      watchList-image
                      w-[clamp(160px,38vw,260px)]
                      md:w-[clamp(180px,32vw,300px)]
                      h-auto object-contain
                      rounded-xl
                      drop-shadow-lg
                      transition-transform duration-300 ease-out
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* Title */}
                <h3
                  id={`watch-title-${key}`}
                  className="text-[clamp(1rem,2.4vw,1.25rem)] font-semibold mb-2 text-white"
                >
                  {item.title}
                </h3>

                {/* Stars */}
                <div
                  className="watchList-stars flex items-center justify-center gap-1 mb-3"
                  aria-hidden="false"
                  role="img"
                  aria-label={`${item.stars ?? 0} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => {
                    const filled = i < (item.stars ?? 0);
                    return (
                      <svg
                        key={i}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={"none"}
                        stroke={'white'}
                        className={`transition-opacity duration-250 ${
                          filled ? "watchList-fill-star watchList-nofill-star" : "watchList-nofill-star"
                        }`}
                        aria-hidden="true"
                      >
                        <polygon
                          points="12,2 14,9 21,9 15,14 17,21 12,17 7,21 9,14 3,9 10,9"
                          strokeWidth={filled ? 0 : 1}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    );
                  })}
                </div>

                {/* Price row */}
                <div className="watchlist-price flex items-baseline gap-2.5">
                  <span className="text-gray-400 line-through text-sm">$1000</span>
                  <h4 className="text-[clamp(1.05rem,2.4vw,1.35rem)] font-bold text-white">
                    {start ? (
                      <span aria-live="polite">
                        {/* AnimatedNumber должен вернуть число без $ */}
                        <AnimatedNumber value={item.price} duration={2000} />$
                      </span>
                    ) : (
                      <span>0$</span>
                    )}
                  </h4>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  ); 

}