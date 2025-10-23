import apple from '../../assets/AppleWatch.png';
import search from '../../assets/Search.png';
import contact from '../../assets/PersonContact.png';
import shop from '../../assets/Shopping.png';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';


export default function Header() {
    const el = useRef(null);
    const [open, setOpen] = useState(false);
    useLayoutEffect(()=>{
        const split = new SplitType('.header-char', { types: 'chars' });
        const ctx = gsap.context(()=>{
            const tl = gsap.timeline()        
            tl.from('.header-logo-animate', {
                y:50,
                opacity:0,
                stagger:0.1,
                duration:1,
                ease:'back.in'
            })
            tl.from(split.chars, {
                y: 50,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                ease: "back.out(1.7)",
                delay:2.5
            }, '-=1')
            .fromTo(
                split.chars,
        {
            color: "#777",
            textShadow: "0 0 10px rgba(255,255,255,0)",
        },
        {
            color: "#fff",
            textShadow: "0 0 15px rgba(255,255,255,0.6)",
            stagger: 0.04,
            duration: 0.6,
            ease: "power2.out",
            yoyo: true, // заставляем "пульсировать"
        }
    );
            
        }, el)

        return () => ctx.revert(); // всё чисто при размонтировании
    }, [el]);

return (
    <header
      ref={el}
      className="bg-transparent sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Home"
            className="flex items-center gap-2 bg-transparent p-0 border-0"
          >
            <img
              src={apple}
              alt="logo"
              className="header-logo-animate w-[clamp(20px,4vw,32px)] h-auto object-contain"
            />
            <span className="text-white header-char font-poppins font-bold
              text-[clamp(1rem,2.2vw,1.4rem)] leading-tight"
            >
              Mohid
            </span>
          </button>
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center space-x-6"
          aria-label="Primary"
        >
          {["Home", "Brands", "Recent Products", "Contact", "About"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="header-char text-[clamp(.85rem,1.4vw,1rem)] text-gray-300 hover:text-indigo-400 transition-colors duration-150"
              >
                {item}
              </a>
            )
          )}
        </nav>

        {/* Right icons + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="header-logo-animate p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <img src={search} alt="search" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </a>
            <a href="#" className="header-logo-animate p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <img src={contact} alt="contact" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </a>
            <a href="#" className="header-logo-animate p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <img src={shop} alt="cart" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {/* simple icons: hamburger / x */}
            {!open ? (
              <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-black/70 backdrop-blur-sm border-t border-white/5 transition-all duration-200 ease-out
          ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-col gap-3" aria-label="Mobile Primary">
            {["Home", "Brands", "Recent Products", "Contact", "About"].map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setOpen(false)}
                className="header-char text-[clamp(.95rem,2.4vw,1.05rem)] text-gray-200 hover:text-indigo-400 py-2 px-3 rounded transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-4">
            <a href="#" className="header-logo-animate p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <img src={search} alt="search" className="w-6 h-6 object-contain" />
            </a>
            <a href="#" className="header-logo-animate p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <img src={contact} alt="contact" className="w-6 h-6 object-contain" />
            </a>
            <a href="#" className="header-logo-animate p-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <img src={shop} alt="cart" className="w-6 h-6 object-contain" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );

}