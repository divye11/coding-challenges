import { projectList } from "../../utils/constants";
import ProjectCard from './archive/components/Common/ProjectCard';

export default function Home() {
  return (
    <div className="flex bg-black flex-col items-center h-full">
      <div className="max-w-[862px] pt-10 flex items-center flex-col">
        <h1 className="text-4xl">Coding Challenges</h1>
        <div className='grid grid-cols-3 mt-10 gap-4'>
          {projectList.map((project) => (
            <ProjectCard key={project.id} project={project} /> 
          ))}
        </div>
      </div>
    </div>
  );
}
