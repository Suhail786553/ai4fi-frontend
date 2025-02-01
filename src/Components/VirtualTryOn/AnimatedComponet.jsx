/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import  { forwardRef, useRef } from "react";
import { AnimatedBeam } from "./AnimatesBeam";
import { ImageIcon } from "lucide-react";
import { RefreshCw } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Model = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-10 flex h-64 w-48 rounded-md  items-center justify-center border-2 bg-gray-800 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
       ${className} 
      `}>
      {children}
    </div>
  );
});

const Garment = forwardRef(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-10 flex h-44 w-32 items-center rounded-md justify-center border-2 bg-gray-800 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
       ${className} 
      `}>
      {children}
    </div>
  );
});

export function AnimatedBeamCard({ id, model, garmentImage, resultImage, isGenerating }) {
  const containerRef = useRef(null);
  const div2Ref = useRef(null);
  const div4Ref = useRef(null);
  const div6Ref = useRef(null);

  return (
    <div className=' relative flex w-full overflow-hidden justify-center py-5 px-10' ref={containerRef}>
      <div className='flex  w-full flex-col max-w-[1200px]  min-h-[200px]  items-stretch justify-between gap-10'>
        <div className='flex flex-row items-center justify-between'>
          <Model ref={div2Ref}>
            <img src={model.url} className='h-full w-full object-cover' alt='garment' />
          </Model>
          <Garment ref={div4Ref}>
            {garmentImage ? (
              <img src={garmentImage.url} className='h-full w-full object-cover' alt='garment' />
            ) : (
              <ImageIcon className='w-8 h-8 text-gray-400' />
            )}
          </Garment>
          <Model ref={div6Ref}>
            {resultImage?.length ? (
              <img src={resultImage[id][0]} className='h-full w-full object-cover' alt='garment' />
            ) : isGenerating ? (
              <RefreshCw className='h-5 w-5 animate-spin text-gray-400' />
            ) : (
              <ImageIcon className='w-8 h-8 text-gray-400' />
            )}
          </Model>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} />
    </div>
  );
}
