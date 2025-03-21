"use client";
import { useContext, useState } from "react"
import { XCircleIcon } from '@heroicons/react/24/solid'
import { FFContext } from "../context/FFManager"

const FlagTable: React.FC = () => {
   const context = useContext(FFContext);
   if (!context) {
      throw new Error('Context not init');
   }

   const { flagList, addFlag, removeFlag } = context;
   const [flagName, setFlagName] = useState<string>('');
   const [flagValue, setFlagValue] = useState<string>('');

   const createFlag = () => {
      const payload = {
         value: flagValue,
         isActive: true
      }

      addFlag(payload, flagName);
      setFlagName('');
      setFlagValue('');
   }

   return (
      <div className="w-full h-full">
         <div className="flex row">
            <input 
               value={flagName} 
               onChange={(e) => {
                  setFlagName(e.target.value)
               }} 
               className="border-1 w-full p-1 px-2"
               placeholder="flag name"
            />
            <input 
               value={flagValue} 
               onChange={(e) => {
                  setFlagValue(e.target.value)
               }} 
               className="border-1 w-full ml-2 p-2 px-w"
               placeholder="flag value"
            />
            <button 
               className="p-2 border-1 rounded-xs ml-2"
               onClick={createFlag}
            >
               Submit
            </button>
         </div>

         <table className="w-full mt-5 border-1">
            <tr className="w-full border-b">
               <th className="border-r">Flag Name</th>
               <th className="border-r">Flag Value</th>
               <th>Action</th>
            </tr>
            {[...flagList.entries()].map(([key, value]) => (
                  <tr key={key} className="w-full text-center border-b">
                     <td className="border-r">{key}</td>
                     <td className="border-r">{value.value}</td>
                     <td className="flex items-center w-full justify-center h-full">
                        <XCircleIcon 
                           height={30} 
                           width={30} 
                           color="red" 
                           className="cursor-pointer"
                           onClick={() => {
                              removeFlag(key);
                           }}
                        />
                     </td>
                  </tr>
            ))}
         </table>
      </div>
   )
}

export default FlagTable