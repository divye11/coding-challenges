"use client";

import { useEffect, useMemo, useState } from "react";
import ContainerPage from "../components/Common/Container";
import { debounceCalls, fetchResults, SearchResult } from "./helpers/utils";
import HighlightedResult from "./components/highlightedResult";

const TypeAhead = () => {
   const [input, setInput] = useState('');
   const [results, setResults] = useState<SearchResult[]>([])
   const [loading, setLoading] = useState<boolean>(false)

   const fetchServerResponse = async (query: string) => {
      if (query) {
         setLoading(true)
         const res = await fetchResults(query);
         setResults(res);
         setLoading(false);
      } else {
         setResults([])
      }
   }

   const debouncedApi = useMemo(() => debounceCalls(fetchServerResponse, 1000), [])

   useEffect(() => {
      debouncedApi(input)
   }, [input, debouncedApi]);


   return (
      <ContainerPage>
         <div className="w-100 mx-5 p-3 h-[50px] border-1 border-white mt-8 relative">
            <input 
               className="border-0 outline-0 text-lg w-full"
               onChange={(e) => setInput(e.target.value)}
            />
            {(results.length > 0 || loading) && 
               <div className="absolute top-[100%] w-full max-h-[500px] border-1 translate-x-[-3%] overflow-y-scroll">
                  {results.length > 0 && results.map((res) => {
                     return(
                        <div key={res.text} className="w-full p-5 cursor-pointer border-b">
                           <HighlightedResult query={input} result={res}/>
                        </div>
                     )
                  })}
                  {loading && (
                     <div>
                        Loading
                     </div>
                  )}
               </div>
            }
         </div>
      </ContainerPage>
     
   )
}

export default TypeAhead;