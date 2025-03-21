import Link from "next/link";
import { JSX } from "react";

const Navbar = (): JSX.Element => {
   return (
      <div className="flex min-w-[100%] top-0 sticky py-4 px-8 border-b-1 border-white font-bold font-mono text-lg text-gray-100 z-9999 bg-black">
         <div>
            <Link href="/">
               Home
            </Link>
         </div>
      </div>
   )
}

export default Navbar;