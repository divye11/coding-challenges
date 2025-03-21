import { useMemo } from "react"
import { useDrag, useDrop } from "react-dnd"
import { ComponentTypes } from "../helpers/constants"
import Ticket from "./Ticket"

type LaneItemProps = {
   tickets: string[] 
   ticketLookup: Map<string, LaneItem>
   lane: string
}

const LaneItems: React.FC<LaneItemProps> = ({ tickets, ticketLookup, lane }) => {
   const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: ComponentTypes.TICKET,
      drop: () => ({ name: lane }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }))
  
   const laneTickets: LaneItem[] = useMemo(() => {
      return tickets
         .map((ticket) => ticketLookup.get(ticket)) 
         .filter(Boolean) as LaneItem[];
   }, [tickets, ticketLookup.size]);

   const [] = useDrag(() => ({
      type: ComponentTypes.TICKET,
   }))

   const isActive = canDrop && isOver
   let backgroundColor = '#222'
   if (isActive) {
     backgroundColor = 'darkgreen'
   } else if (canDrop) {
     backgroundColor = 'transparent'
   }

   return (
      <ul ref={drop} className="mt-5 h-full" style={{ backgroundColor }}>
         {laneTickets.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
         ))}
      </ul>
   )
}

export default LaneItems;