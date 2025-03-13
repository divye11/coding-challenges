import Link from "next/link";
import { JSX } from "react";

const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
   const { name, description, url } = project;
   return (
      <div className="border-1 border-white rounded-sm font-mono">
         <Link href={url}>
            <h3 className="text-lg font-medium p-3">{name}</h3>
            <div className="border-b-1 border-white"/>
            <p className="p-3">{description}</p>
         </Link>
      </div>

   )
}

export default ProjectCard;