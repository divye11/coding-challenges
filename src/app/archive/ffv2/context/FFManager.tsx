"use client";
import { createContext, useEffect, useState } from "react"

type Segment = {
   audience: number
   value: number
}
type FlagPayload = { value: string, segments?: Segment, isActive: boolean}
type Flags = Map<string, FlagPayload>

type FFContextProviderProps = {
   identifier: string
   trafficType: string
   children: React.ReactNode
}

type FFContext = {
   addFlag: (flag: FlagPayload, flagName: string) => void
   removeFlag: (flagName: string) => void
   editFlag: (flag: FlagPayload, flagName: string) => void
   flagList: Flags
}

export const FFContext = createContext<FFContext | null>(null)

export const FFContextProvider: React.FC<FFContextProviderProps> = ({ children, identifier, trafficType }) => {
   const [id, setId] = useState(identifier);
   const [traffic, setTrafficType] = useState<string>(trafficType);
   const [flagList, setFlagList] = useState<Flags>(new Map())

   useEffect(() => {
      setId(identifier);
      setTrafficType(trafficType);
   }, [identifier, trafficType]);

   const addFlag = (flag: FlagPayload, flagName: string) => {
      setFlagList((prevFlags) => prevFlags.set(flagName, flag))
   }

   const editFlag = (flag: FlagPayload, flagName: string) => {
      setFlagList((prevFlags) => prevFlags.set(flagName, flag))
   }

   const removeFlag = (flagName: string) => {
      setFlagList((prevFlags) => {
         const updatedFlags = new Map(prevFlags);
         updatedFlags.delete(flagName);
         return updatedFlags;
      });
   }

   return <FFContext.Provider value={{ addFlag, removeFlag, editFlag, flagList }}>{children}</FFContext.Provider>
}

