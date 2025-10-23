import Header from "./pages/mainPage/Header";
import Hero from './pages/mainPage/Hero';
import Features from './pages/mainPage/Features';
import Footer from "./pages/footer/footer";
import SVGWatch from "./svgStyle/svg";
import {  useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import WatchList from "./pages/mainPage/watchList/watchList";
import BigWatchPage from "./pages/mainPage/bigWatchPage/bigWatchPage";

export default function App() {
 
  const mainScope = useRef(null);
  const svgAnimate = useRef(null);
  const contentBlock = useRef(null);
/*
      gsap.to(svgAnimate.current, {
        backgroundColor: 'transparent',
        delay: 4,
        duration: 4,
        z: 0,
        ease: 'power2.inOut'
      });
*/
useLayoutEffect(() => {
 gsap.registerPlugin(ScrollSmoother);
 if(!mainScope || !contentBlock) return null;
      
      gsap.to(svgAnimate.current, {
        backgroundColor: 'transparent',
        delay: 4,
        duration: 4,
        z: 0,
        ease: 'power2.inOut'
      });

  const smoother = ScrollSmoother.create({
    wrapper: mainScope.current,
    content:contentBlock.current,
    smooth: 3,
    effects: true
  });

  return () => {
    smoother.kill();
  };
}, [mainScope]);


return (
  <>
  <div className="font-sans" ref={mainScope}>
    <div ref={contentBlock}>
     <div ref={svgAnimate} className="w-full h-[100vh] absolute bg-black z-10">
          <SVGWatch/>
    </div>

    <div ref={contentBlock}>
      <Header />
      <Hero />
      <Features />
    
    </div>
      <WatchList/>
      <BigWatchPage/>
  <Footer />
    </div>

 
  </div>
</>
);
}