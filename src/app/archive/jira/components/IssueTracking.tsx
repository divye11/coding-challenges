"use client";
import { useContext } from "react"
import LaneItems from "./LaneItems";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TicketContext } from "../context/TicketContext";

type IssueTrackingProps = {
   TICKET_LANES: string[]
}

const LaneHeader: React.FC<{title: string}> = ({ title }) => (
   <div className="font-bold text-xl border-1 p-2">
      {title}
   </div>
)


const IssueTracking: React.FC<IssueTrackingProps> = ({ TICKET_LANES }) => {
   const context = useContext(TicketContext);

   if (!context) {
      throw new Error('TicketContext is not initialized');
   }

   const { laneLookup, ticketLookup } = context;

   return (
      <div className="w-full h-full">
         <h1 className="text-4xl mt-5">Issue tracking</h1>
         <DndProvider backend={HTML5Backend}>
            <div className="flex row w-full mt-5 h-full">
               {TICKET_LANES.map((lane) => {
                  return (
                     <div key={lane} className="w-full pr-2">
                        <LaneHeader title={lane} />
                        <LaneItems lane={lane} tickets={laneLookup.get(lane) || []} ticketLookup={ticketLookup}/>
                     </div>
                  )
               })}
            </div>
         </DndProvider>

      </div>
   )
}

export default IssueTracking