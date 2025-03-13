import { JSX } from "react"
import { StarIcon } from '@heroicons/react/24/solid'

type StarProps = {
   fill?: string
   className?: string
}

export const Star = ({ className }: StarProps): JSX.Element => {
   return (
      <StarIcon className={className} />
   )
}
