import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import { useDrag } from 'react-dnd';
import { ComponentTypes } from '../helpers/constants';
import { useContext } from 'react';
import { TicketContext } from '../context/TicketContext';

const Ticket = ({ ticket }: {ticket: LaneItem}) => {
   const context = useContext(TicketContext)
   if (!context) {
      throw new Error('Context not initialised');
   }

   const { updateTicket, ticketLookup } = context

   const [{isDragging}, drag] = useDrag(() => ({
      type: ComponentTypes.TICKET,
      item: { id: ticket.id },
      end: (item, monitor) => {
         const dropResult = monitor.getDropResult<{name: string}>()
         if (item && dropResult) {
           console.log(`You dropped ${item.id} into ${dropResult.name}!`)
           updateTicket(item.id, dropResult.name);
           console.log(ticketLookup.get(item.id));
         }
       },
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
         handlerId: monitor.getHandlerId(),
       }),
   }))

   const opacity = isDragging ? 0.5 : 1;

   return (
      <li ref={drag} key={ticket.id} className="border-1 mt-3" style={{ opacity }}>
               <div className="border-b p-3">
                  {ticket.title}
               </div>
               <div className="p-2">
                  {ticket.assignee.firstName} {ticket.assignee.lastName}
               </div>
               <div className="border-t p-2">
                  {ticket.points}
               </div>
               <div className="flex justify-between p-2 cursor-pointer">
                  <ArrowLeftCircleIcon className="w-[30px]" />
                  <ArrowRightCircleIcon className="w-[30px]" />
               </div>
            </li>
   )
}

export default Ticket;