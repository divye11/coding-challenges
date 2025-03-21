"use client";
import { useMemo, useState } from "react";
import { motion } from "motion/react"
import ContainerPage from "../components/Common/Container"
import BarChart from "./components/BarChart";

const dummyData = [
   { department: "HR", points: 80 },
   { department: "Engineering", points: 120 },
   { department: "Marketing", points: 60 },
   { department: "Sales", points: 90 },
   { department: "Finance", points: 100 },
];

const lineData: Coords[] = [
   { x: 0, y: 10 },
   { x: 1, y: 25 },
   { x: 2, y: 15 },
   { x: 3, y: 30 },
   { x: 4, y: 20 },
];

type Coords = {
   x: number
   y: number
}
const getMax = (arr: Coords[], param: keyof Coords): number => {
   return Math.max(...arr.map((item: Coords) => item[param]));
} 

const getAdjustedCoordX = (val: number, maxX: number, width: number): number => {
   return val/maxX * width
}

const getAdjustedCoordY = (val: number, maxY: number, height: number): number => {
   return height - (val/maxY * height);
}

const ChartUI = () => {
   const [showChart, setShowChart] = useState<boolean>(false);
   const [showLineChart, setShowLineChart] = useState<boolean>(false);

   const maxPoints = useMemo(() => {
      return Math.max(...dummyData.map((data) => data.points));
   }, []);

   const maxX = getMax(lineData, 'x');
   const maxY = getMax(lineData, 'y');

   const pathData = lineData.map((point: Coords, index: number) => {
      const adjustedX = getAdjustedCoordX(point.x, maxX, 862);
      const adjustedY = getAdjustedCoordY(point.y, maxY, 500);

      return `${index === 0 ? "M" : "L"} ${adjustedX} ${adjustedY}`
   }).join(" ")

   const toggleChart = (e: React.SyntheticEvent) => {
      if (e.currentTarget.id === 'bar_chart') {
         setShowChart((prevState) => !prevState);
      } else {
         setShowLineChart((prevState) => !prevState);
      }
   }
   
   return (
      <ContainerPage>
         <h1 className="mt-5 text-2xl">Charts</h1>
         <div className="flex row">
            <motion.button
               id="bar_chart"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               onClick={toggleChart}
               className="border-1 border-white rounded-xs p-3 cursor-pointer"
            >
               Toggle Chart
            </motion.button>
            <motion.button
               id="line_chart"
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               onClick={toggleChart}
               className="ml-3 border-1 border-white rounded-xs p-3 cursor-pointer"
            >
               Toggle Line Chart
            </motion.button>
         </div>
         
         {showChart ? 
            <div className="mt-6 relative border-l border-b w-full h-[500px] ml-5 flex">
               <div className="absolute top-[50%] left-0 translate-x-[-100%] translate-y-[-50%] rotate-270">
                  Points
               </div>
               <div className="absolute top-[100%] right-[50%] translate-y-[50%] translate-x-[50%]">
                  Departments
               </div>
               <div className="w-full h-full gap-4 row flex items-end">
                  {dummyData.map((data) => {
                  return <BarChart data={data} key={data.department} maxPoints={maxPoints} />
                  })}
               </div>
            </div> 
         : null }

         {showLineChart && (
            <div className="h-[500px] relative border-l border-b w-full flex mt-6">
               <div className="absolute top-[50%] left-0 translate-x-[-100%] translate-y-[-50%] rotate-270">
                  Points
               </div>
               <div className="absolute top-[100%] right-[50%] translate-y-[50%] translate-x-[50%]">
                  Departments
               </div>
               <div className="w-full h-[500px]">
                  <svg height={500} width={862}>
                     <motion.path 
                        d={pathData} 
                        fill="none" 
                        stroke="blue" 
                        strokeWidth="2" 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                     />
                  </svg>
               </div> 
            </div>
         )}


      </ContainerPage>
   )
}

export default ChartUI