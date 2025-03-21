"use client";
import cn from 'classnames';
import { motion } from "motion/react"
import styles from './Barchart.module.scss';

const BarChart = ({ data, maxPoints }) => {

   return (
      <motion.div 
         className={cn("w-full bg-blue-500 grow relative", styles.bar_chart)}
         initial={{ height: 0 }}
         animate={{ height: `${(data.points/maxPoints) * 100}%` }}
      >
         <div id="tooltip" className={cn("absolute top-0 left-[100%] z-10 translate-x-[-50%] translate-y-[-50%] bg-pink-500 p-2 rounded-xs", styles.tooltip)}>
            {data.department}
         </div>
      </motion.div>
   )
}

export default BarChart;