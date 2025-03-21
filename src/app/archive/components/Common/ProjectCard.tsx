"use client";

import Link from "next/link";
import { JSX } from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
   const { name, description, url } = project;
   return (
      <motion.div 
         className="border-1 border-white rounded-sm font-mono"
         whileHover={{ scale: 1.2 }}
         whileTap={{ scale: 0.9 }}
      >
         <Link href={url}>
            <h3 className="text-lg font-medium p-3">{name}</h3>
            <div className="border-b-1 border-white"/>
            <p className="p-3">{description}</p>
         </Link>
      </motion.div>

   )
}

export default ProjectCard;