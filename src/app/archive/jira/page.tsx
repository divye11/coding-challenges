import ContainerPage from "../components/Common/Container";
import IssueTracking from "./components/IssueTracking";
import { TicketContextProvider } from "./context/TicketContext";
import { TICKET_LANES } from "./helpers/constants";

const Jira: React.FC = () => {
   return (
      <ContainerPage containerClassName="h-full">
         <TicketContextProvider>
            <IssueTracking TICKET_LANES={TICKET_LANES}/>         
         </TicketContextProvider>
      </ContainerPage>  
   )
}

export default Jira;