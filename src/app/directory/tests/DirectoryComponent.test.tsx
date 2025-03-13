import { render, screen, act, fireEvent } from "@testing-library/react"
import DirectoryComponent from "../page"
import DirectoryStructure from "../Components/DirectoryStructure";
import { mockEmptyDir } from "./mockData";
import { data } from "../utils/constants";
import DirectoryNode from "../Components/DirectoryNode";

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
   })
})