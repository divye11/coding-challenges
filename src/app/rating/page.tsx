"use client";
import cn from "classnames";
import { JSX, useState } from "react";
import { Star } from "./components/star";
import styles from './Star.module.scss';
import ContainerPage from "../components/Common/Container";

const MAX_STARS = 5;
const RatingComponent = (): JSX.Element => {
   const [rating, setRating] = useState<number>(0);

   const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
      let diff = index-rating;
      const isFullStarSelected = e.clientX - e.currentTarget.offsetLeft > e.currentTarget.offsetWidth/2;
      diff = isFullStarSelected ? diff : diff-0.5;
      setRating((prevRating) => prevRating+diff);
   }

   const getTestId = (rating: number, index: number): string => {
      if (rating-(index+1) >= 0) {
         return "star-highlighted";
      } else if (rating-(index+1) < 0 && rating-(index+1) > -1) {
         return "star-highlighted-half";
      }
         return "star-unhighlighted";
   }

   return (
      <ContainerPage>
         <div className="flex h-full w-full justify-center items-center flex-col mt-10">
            <h1 className="text-3xl">Rating Component</h1>
            <div className="h-[40px] w-full flex justify-center mt-5">
               {Array.from({length: MAX_STARS}, (_, index) => 
                  <div 
                     key={index} 
                     onMouseUp={(e) => handleClick(e, index+1)}
                     className="h-[30px] w-[30px] mx-3 relative"
                     data-testid={getTestId(rating, index)}
                  >
                     <Star className='absolute h-full w-full fill-yellow-50 opacity-20 cursor-pointer' />
                     <Star 
                        className={cn("absolute h-full w-full opacity-20 cursor-pointer", {
                           'opacity-0': rating-(index+1) < 0,
                           [`${styles.clip_star} fill-yellow-500 opacity-100`]: rating-(index+1) < 0 && rating-(index+1) > -1,
                           'fill-yellow-500 opacity-100': rating-(index+1) >= 0
                        })}
                     />
                  </div>
               )}
            </div>
         </div>
      </ContainerPage>
   )
}  

export default RatingComponent;