import type { BoxAlertProps } from "../types/boxAlert"

export const BoxAlert: React.FC<BoxAlertProps> = ({ message, onClose }) => {
  return (
    <div className="h-screen w-screen p-10 fixed top-0 left-0 z-10 flex items-center justify-center bg-custom-black-50">
      <div className="p-4 flex flex-col gap-4 items-center justify-center bg-white rounded-3xl">
        <p className="text-center">{message}</p>
        <button onClick={onClose} className="px-6 py-2 bg-sunshine text-deep-blue rounded-lg">
          Fechar
        </button>
      </div>
    </div>
  )
}
