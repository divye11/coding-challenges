import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import DirectoryComponent from "../page"
import DirectoryStructure from "../Components/DirectoryStructure";
import { mockEmptyDir } from "./mockData";
import { data } from "../utils/constants";
import DirectoryNode from "../Components/DirectoryNode";
import axios from "axios";

// Mock next/navigation
jest.mock('next/navigation', () => {
  const mockUseSearchParams = jest.fn().mockImplementation(() => ({
    get: (param) => {
      if (param === 'url') return 'test/path/mock.md';
      return null;
    }
  }));
  
  const mockUseRouter = jest.fn().mockImplementation(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: '/',
    query: {}
  }));
  
  return {
    ...jest.requireActual('next/navigation'),
    useSearchParams: mockUseSearchParams,
    useRouter: mockUseRouter
  };
});

describe('Directory Component', () => {
   beforeEach(() => {
      jest.restoreAllMocks();
   });

   it('Should render Directory Component', () => {
      render(<DirectoryComponent />);
      expect(screen.getByText(/Directory Component/i)).toBeInTheDocument();
   })

   it('Should render the top level directory', () => {
      render(<DirectoryStructure data={mockEmptyDir}/>);

      expect(screen.getByText(/MyProject/i)).toBeInTheDocument();
   })

   it('Should render all the nested components', async () => {
      render(<DirectoryNode data={data} />);
      expect(screen.queryByText('README.md')).not.toBeInTheDocument();
      expect(screen.queryByText('docs')).not.toBeInTheDocument();

      const rootNode = screen.getByText('MyProject');
      fireEvent.click(rootNode);

      expect(screen.getByText('docs')).toBeInTheDocument();
   });

   it('Should display the content on right when a link is selected', () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: 'Test Content' });
      
      render(<DirectoryStructure data={data} />);
      
      // Wait for the content to load (since we have a useEffect that fetches content)
      waitFor(() => {
        expect(screen.getByTestId('content')).toHaveTextContent('Test Content');
      });
   })
})