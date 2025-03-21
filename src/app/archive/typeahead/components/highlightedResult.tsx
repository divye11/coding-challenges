import { JSX } from "react";
import { SearchResult } from "../helpers/utils";

const HighlightedResult = ({ query, result }: { query: string, result: SearchResult }): JSX.Element => {
   if (!result.text.includes(query)) {
      return <span>{result.text}</span>
   }

   const lowerResult = result.text.toLowerCase();
   const lowerQuery = query.toLowerCase();

   const startIndex = lowerResult.indexOf(lowerQuery);
   const endIndex = startIndex + lowerQuery.length;

   return (
      <>
         <span className="text-gray-500">{result.text.substring(0, startIndex)}</span>
         <span className="font-medium">{result.text.substring(startIndex, endIndex)}</span>
         <span className="text-gray-500">{result.text.substring(endIndex, lowerResult.length)}</span>
      </>
   )

}

export default HighlightedResult