"use client";

import { TrafficType, type FeatureFlagStore } from "../utils/FeatureFlag";
import { JSX, useContext, useEffect, useState } from "react";
import { FeatureFlagContext } from "../utils/FeatureFlagContext";

const FeatureFlags = (): JSX.Element => {
   const context = useContext(FeatureFlagContext);
   const [flags, setFlags] = useState<Record<string, string>[]>([])
   const [newFlag, setFlagValue] = useState({ flagName: '', flagValue: '' });

   if (!context) {
      throw new Error('Feature Flag Manager not initialized');
   }

   const { manager } = context;

   useEffect(() => {
      const flagValues = manager.pollFlags();
      setFlags(flagValues);
   }, [manager]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFlagValue((prevFlag) => ({
         ...prevFlag,
         [id]: value
      }))
   }

   const addFlag = () => {
      const flagValue: FeatureFlagStore = {
         value: newFlag.flagValue,
         updatedAt: new Date()
      }
      manager.addFlag(newFlag.flagName, flagValue);
      setFlagValue({
         flagName: '',
         flagValue: ''
      })
      manager.pollFlags();
   }

   return (
      <div className="w-full h-full mt-5">
         <div className="mt-3 flex flex-row w-full">
            <input id="flagName" value={newFlag.flagName} onChange={handleChange} className="w-[100%] border-white border-solid border-1 p-3" />
            <input id="flagValue" value={newFlag.flagValue} onChange={handleChange} className="w-[100%] border-white border-solid border-1 ml-2 p-3" />
            <button className="w-[100%] border-1 text-xl border-white ml-2 cursor-pointer" onClick={addFlag}>Submit</button>
         </div>
         <table className="table-fixed w-full mt-5 border-1 border-solid">
            <thead className="flex flex-row w-full border-bottom border-1">
               <tr className="w-[100%] flex justify-center">
                  <th className="p-3">Name</th>
               </tr>
               <tr className="w-[100%] flex justify-center">
                  <th className="p-3">Value</th>
               </tr>
            </thead>
            <tbody>
               {flags.map((flag, index) => {
                  const flagName = Object.keys(flag)[0];
                  const flagValue = flag[flagName];
                  return (
                  <tr key={index} className="flex flex-row">
                     <td className="w-[100%] border-r p-3 text-center">
                        {flagName}
                     </td>
                     <td className="w-[100%] p-3 text-center">
                        {flagValue}
                     </td>
                  </tr>
               )})}
            </tbody>
         </table>

      </div>
   )
}

export default FeatureFlags;