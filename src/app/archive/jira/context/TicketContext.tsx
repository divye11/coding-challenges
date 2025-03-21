"use client";
import { createContext, useEffect, useState } from "react";
import { fetchApi } from "../helpers/utils";

type TicketLookup = Map<string, LaneItem>;
type LaneLookup = Map<string, string[]>;

export const TicketContext = createContext<{ 
    ticketLookup: TicketLookup, 
    laneLookup: LaneLookup, 
    updateTicket: (ticketId: string, newLane: string) => void 
} | null>(null);

export const TicketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ticketLookup, setTicketLookup] = useState<TicketLookup>(new Map());
    const [laneLookup, setLaneLookup] = useState<LaneLookup>(new Map());

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        const tickets = await fetchApi();
        const newTicketLookup = new Map<string, LaneItem>();
        const newLaneLookup = new Map<string, string[]>();

        tickets.forEach(ticket => {
            newTicketLookup.set(ticket.id, ticket);
            newLaneLookup.set(ticket.status, [...(newLaneLookup.get(ticket.status) || []), ticket.id]);
        });

        setTicketLookup(newTicketLookup);
        setLaneLookup(newLaneLookup);
    };

    const updateTicket = (ticketId: string, newLane: string) => {
      const oldTicket = ticketLookup.get(ticketId);
      if (oldTicket) {
         setLaneLookup((prevLookup) => {
            const temp = new Map(prevLookup);
            temp.set(oldTicket.status, (temp.get(oldTicket.status) || [])?.filter((ticket) => ticket !== ticketId));
            temp.set(newLane, [...(temp.get(newLane) || []), ticketId])

            return temp;
         })

         setTicketLookup((prevLookup) => {
            const temp = new Map(prevLookup);
            temp.set(ticketId, { ...(temp.get(ticketId) as LaneItem), status: newLane });

            return temp;
         })
      }
   };

    return (
        <TicketContext.Provider value={{ ticketLookup, laneLookup, updateTicket }}>
            {children}
        </TicketContext.Provider>
    );
};