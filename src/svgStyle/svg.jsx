import gsap  from 'gsap';
import DrawSVGPlugin from 'gsap/dist/DrawSVGPlugin';
import { useRef, useLayoutEffect } from 'react';
import appleW from '../assets/watch.svg';

function adjustArray(text, length, diff) {
  // вспомогательная функция для проверки числа и корректировки
  const final = [];
  const makeArray = text.split(' ');
  let minX = Infinity;
  let minY = Infinity;

  const symbolOffsets = {
    M: [1, 2],
    L: [1, 2],
    A: [6, 7]
  };

makeArray.forEach((val, i) => {
  if (val === 'L' || val === 'M') {
    const x = Number(makeArray[i + 1]);
    const y = Number(makeArray[i + 2]);
    if (!isNaN(x) && !isNaN(y)) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
    }
  }
});



  const adjustValue = (value, min) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      return num <= min ? num - diff : num + diff;
    }
    return value;
  };

Array.from({ length }).forEach((_, index) => {
  if(index > 0) {
  makeArray.forEach((s, i, arr) => {
    for(const [symbol, offsets] of Object.entries(symbolOffsets)){
      for(const offset of offsets){
        if(arr[i - offset] === symbol){
            
          const min = (symbol === 'L' || symbol === 'M') ? offset === 1 ? minX
          : minY : offset === 6 ? minX : minY; 
            
            const newValue = adjustValue(s, min);
            arr[i] = newValue; // ← вот оно! реально обновляет элемент
            return; // просто выходим из этой функции
          }
      }
    }
    return s;
  }); 
}
  final[index] = makeArray.join(' ');
})
  return final;
}




gsap.registerPlugin(DrawSVGPlugin);
export default function SVGWatch(){

const scope = useRef(null);
const svgRef = useRef(null);
const imgRef = useRef(null);

useLayoutEffect(() => {
  const mm = gsap.matchMedia();

  if (!scope.current || !svgRef.current || !imgRef.current) return;

  const ctx = gsap.context(() => {
    const tl = gsap.timeline();

    const imgRect = imgRef.current.getBoundingClientRect();
    const imgCenterX = imgRect.left + imgRect.width / 2;
    const imgCenterY = imgRect.top + imgRect.height / 2;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const deltaX = imgCenterX - viewportCenterX;
    const deltaY = imgCenterY - viewportCenterY;

    mm.add("(min-width: 890px)", () => {
      gsap.set(svgRef.current, { x: 0, y: 0, xPercent: -50, yPercent: -50 });

      tl.set('.my-ellipse', { drawSVG: "0%", stroke: 'white', strokeWidth: 3 });
      tl.set("#my-path-animate", { drawSVG: "0%" })
        .to("#my-path-animate", { drawSVG: "100%", duration: 2, ease: "power2.out" })
        .to("#clip-1 rect", { height: 600, duration: 1.5, ease: "power2.inOut" }, "-=1")
        .to('.my-ellipse', { drawSVG: '100%', duration: 2, ease: "power2.out", strokeWidth: 2, stroke: 'rgba(76, 79, 82, 0.2)' })
        .to(svgRef.current, {
          x: deltaX - deltaX / 4,
          y: deltaY,
          duration: 1.8,
          scale: 0.6,
          ease: 'power2.out'
        })
        .to('.svg-watch', { display: 'none' }, '-=0.9')
        .to('.image-clip', { opacity: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 2 }, '-=0.4');
    });
    mm.add("(max-width: 889px)", () => {
      gsap.set(svgRef.current, { x: 0, y: 0, xPercent: -50, yPercent: -50 });

      tl.set('.my-ellipse', { drawSVG: "0%", stroke: 'white', strokeWidth: 3 });
      tl.set("#my-path-animate", { drawSVG: "0%" })
        .to("#my-path-animate", { drawSVG: "100%", duration: 2, ease: "power2.out" })
        .to("#clip-1 rect", { height: 600, duration: 1.5, ease: "power2.inOut" }, "-=1")
        .to('.my-ellipse', { drawSVG: '100%', duration: 2, ease: "power2.out", strokeWidth: 2, stroke: 'rgba(76, 79, 82, 0.2)' })
        .to('.svg-watch',  { opacity:0, duration:1 }, '-=0.9')
    })

  }, scope);

  return () => {
    if (ctx) ctx.revert();
    if (mm) mm.revert();
  };
}, []);


return <div ref={scope} className="w-full flex justify-center items-center min-h-[100vh] relative">
<svg ref={svgRef} className='svg-watch' 
viewBox="300 150 400 400" 
width="450px" height="100%"
xmlns="http://www.w3.org/2000/svg">
  
    <defs>
      <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgb(181, 115, 49)" />
        <stop offset="100%" stopColor="rgb(250, 206, 95)" />
      </linearGradient>
    </defs>
    <defs>
        <linearGradient id="myGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(105, 240, 158)" />
          <stop offset="100%" stopColor="rgb(44, 158, 89)" /> 
        </linearGradient>
    </defs>
    <defs>
        <clipPath id="clip-1">
          <rect x="0" y="0" width="1000" height="0" />
        </clipPath>
    </defs>

    <g>
  { 
  Array.from({ length:7 }).map((_, index)=>(
    <ellipse
      className='my-ellipse'
      key={index}
      cx={530}
      cy={275}
      rx={35 + index * 6}
      ry={40 + index * 7}
      stroke='rgba(76, 79, 82, 0.2)'
      strokeWidth={2.0}
      fill='none'
      style={{ zIndex:0 }}
    />
  ))} 

  { Array.from({ length:8 }).map((_, index)=>(
    <ellipse
      className='my-ellipse'
      key={index}
      cx={520}
      cy={405}
      rx={35 + index * 6}
      ry={40 + index * 7}
      stroke='rgba(76, 79, 82, 0.2)'
      strokeWidth={2.0}
      fill='none'
      style={{ zIndex:0 }}
    />
  )) }

    { adjustArray('M 395 200 L 395 480 A 10 10 0 0 0 455 480 L 455 200 A 10 10 0 0 0 395 200', 8, 4.5).map((i, index)=>(
      <path d={i}
      key={index}
      className='my-ellipse'
      style={{ zIndex:1 }}
      stroke='rgba(76, 79, 82, 0.5)'
      strokeWidth={2.0}
      fill='none'/>

    )) 
    }
  { adjustArray('M 595 200 L 595 480  A 10 10 0 0 0 655 480 L 655 200 A 10 10 0 0 0 595 200', 8, 4.5).map((i, index)=>(
    <path d={i}
      key={index}
      className='my-ellipse'
      style={{ zIndex:1 }}
      stroke='rgba(76, 79, 82, 0.5)'
      strokeWidth={2.0}
      fill='none'/>
  ))}
 
    { adjustArray('M 455 260 A 40 40 0 0 1 605 260', 9, 5).map((i, index)=>(
      <path d={i}    
      className='my-ellipse'
      key={index}
      stroke='rgba(76, 79, 82, 0.5)'
      strokeWidth={2.0}
      fill='none'/>
    )) }
    { 
    adjustArray('M 460 421.9 A 40 40 0 0 0 600 422', 9, 6.5).map((i, index)=>(
      <path d={i}      
      key={index}
      className='my-ellipse'
      stroke='rgba(76, 79, 82, 0.5)'
      strokeWidth={2.0}
      fill='none'/>
    ))}
        
        <path  id='my-path-animate' d="M400 200 L400 480 A10 10 0 0 0 450 480 L450 200 A10 10 0 0 0 400 200" 
          stroke="white"
          strokeWidth="1" fill='none'/>

        <path  id='my-path-animate' d="M400 200 L400 480 A10 10 0 0 0 450 480
          L450 200 A10 10 0 0 0 400 200" 
          clipPath="url(#clip-1)"
          fill='rgb(61, 186, 157)'
        />    
   
        <path id='my-path-animate' d="
        M 400 450 L 400 300 
        A 10 10 0, 0, 1 450 300
        L 450 450"
        fill='none'
        stroke="white"
        strokeWidth="1"
        />

        <path id='my-path-animate' d="
        M 400 450 L 400 300 
        A 10 10 0, 0, 1 450 300
        L 450 450"
        clipPath="url(#clip-1)"
        fill="rgb(50, 123, 168)"
        />
      
        <path id='my-path-animate' d="
        M 400 300 Q 420 425 510 435
        A 10 10 0, 0, 0 525 375
        Q 470 370 450 300
        A10 10 0,0,0 400 300" 
        fill="rgb(73, 201, 193)"
        clipPath="url(#clip-1)"
        />
        
        <path id='my-path-animate' d="
        M 400 300 Q 420 425 510 435
        A 10 10 0, 0, 0 525 375
        Q 470 370 450 300
        A10 10 0,0,0 400 300" 
        stroke="white"
        strokeWidth="1" 
        fill='none'
        />

        <path id='my-path-animate' d="
        M 400 450 A 2 2 0 0,1 450 450
        L 450 480 A2 2 0 0, 1, 400 480
        L 400 450" 
        stroke="white"
        strokeWidth="1"
        fill='none'
        />

        <path id='my-path-animate' d="
        M 400 450 A 2 2 0 0,1 450 450
        L 450 480 A2 2 0 0, 1, 400 480
        L 400 450" 
        fill="rgb(119, 192, 237)"
        clipPath="url(#clip-1)"
        />
           
        <path id='my-path-animate' d="M 600 200 L 600 480 M 600 480 A10, 10 0 0, 0 650, 480
        L 650 200 A10,10 0 0, 0 600,200" 
        stroke="white"
        strokeWidth="1"
        fill='none'
         />   

        <path id='my-path-animate' d="M 600 200 L 600 480 M 600 480 A10, 10 0 0, 0 650, 480
        L 650 200 A10,10 0 0, 0 600,200" 
        clipPath="url(#clip-1)"
        fill='rgb(
        70, 138, 95)'
         />    

        <path id='my-path-animate'
        d=' M600 200 A10 10 0, 0, 1 650 200
        L 650 220 A10 10, 0, 0, 1 600 220
        L600 200'
        clipPath="url(#clip-1)"
        fill='url(#myGradient2'/>

        <path id='my-path-animate'
          d=' M600 200 A10 10 0, 0, 1 650 200
          L 650 220 A10 10, 0, 0, 1 600 220
          L600 200'
          stroke="white"
          strokeWidth="1"
          fill='none'
          />

        <path id='my-path-animate'
          d=' M600 200 A10 10 0, 0, 1 650 200
          L 650 220 A10 10, 0, 0, 1 600 220
          L600 200'
         clipPath="url(#clip-1)"
          fill="url(#myGradient2)"
          />

        <path id='my-path-animate' d="
        M 600 380 A 2 2 0 0,1 650 380
        L 650 480 A2 2 0 0, 1, 600 480
        L 600 380"
        stroke="white"
        fill='none'
        strokeWidth="1"/>

        <path id='my-path-animate' d="
        M 600 380 A 2 2 0 0,1 650 380
        L 650 480 A2 2 0 0, 1, 600 480
        L 600 380"
        clipPath="url(#clip-1)"
        fill="rgb(196, 113, 49)"/>
       
        <path id='my-path-animate' d='
          M650 370 
          Q 650 265 530 245
          A10 10 0, 0, 0, 535 307 
          Q 600 312 600 370
          A 10 10 0 0 0 650 370'
        stroke="white"
        strokeWidth="1"
        fill='none'      
        />

        <path id='my-path-animate' d='
          M650 370 
          Q 650 265 530 245
          A10 10 0, 0, 0, 535 307 
          Q 600 312 600 370
          A 10 10 0 0 0 650 370'
      clipPath="url(#clip-1)"
        fill="url(#myGradient)"
        
        />
    
      <text x="465" y="485" fontSize="46" fill="white">10:08</text>
      <text x="470" y="510" fontSize="17" fill="rgba(168, 181, 173, 1)">WEB</text>
      <text x="515" y="510" fontSize="17" fill="rgba(168, 181, 173, 1)">MAY 20</text>
    </g>
</svg>
<img src={appleW} alt="" ref={imgRef} className='left-[58%] scale-[0.9] opacity-0 top-[5%] absolute image-clip' />

</div>
}



