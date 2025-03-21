import { render, screen, waitFor, act } from "@testing-library/react";
import IssueTracking from "../components/IssueTracking";
import * as utils from "../helpers/utils";

jest.mock("../helpers/utils", () => ({
   fetchApi: jest.fn()
}));


describe('Issue tracking', () => {
   afterEach(() => {
      jest.restoreAllMocks();
   })

   it('should render all the lanes correctly', () => {
      const lanes = ['lane1', 'lane2'];

      render(<IssueTracking TICKET_LANES={lanes}/>);

      const lane = screen.getByText('lane1');
      expect(lane).toBeInTheDocument();
   })

   it('should render tickets properly in each lane', async () => {
      const lanes = ['lane1', 'lane2'];
      const tickets = [{
         id: "mock-1",
         status: "lane1",
         title: "Mocked Ticket",
         tags: ["mock"],
         points: 1,
         assignee: { firstName: "Mock", lastName: "User" }
      }];

      (utils.fetchApi as jest.Mock).mockResolvedValue(tickets);

      await act(async () => {
         render(<IssueTracking TICKET_LANES={lanes}/>);
      });

      // Wait for the ticket to be rendered after async API call
      await waitFor(() => {
         expect(screen.getByText("Mocked Ticket")).toBeInTheDocument();
      });

   })
})