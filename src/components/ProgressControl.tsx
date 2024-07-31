import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProgressControlType } from "../types/progressControl"
import clsx from "clsx"

export const ProgressControl: React.FC<ProgressControlType> = ({ layer, progressPercentage, maxLayer, handleLayer }) => {
  return (
    <>
      {layer !== 0 &&
        <div className="w-full h-14  flex items-center justify-center gap-2 py-4 fixed bottom-5 left-0 right-0 ">
          <button onClick={() => layer !== 1 && handleLayer('GOBACK')}
            className={clsx("bg-foggy-slate p-4 rounded-full text-white", { "opacity-0": layer === 1 })}>
            <ChevronLeft />
          </button>
          <div className="w-56 h-full flex rounded-full bg-foggy-slate overflow-hidden ">
            <div className="h-full bg-sunshine" style={{ width: `${progressPercentage}%` }} />
          </div>
          <button onClick={() => layer !== maxLayer && handleLayer('CONTINUE')} 
          className={clsx("bg-foggy-slate p-4 rounded-full text-white", { "opacity-0": layer === maxLayer })}>
            <ChevronRight />
          </button>
        </div>
      }
    </>
  )
}
