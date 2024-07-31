import { CalendarDays, Clock, Minus, Plus } from "lucide-react";
import { DiaryCardModel } from "../types/diary";

export const DiaryCard: React.FC<DiaryCardModel> = ({
  title,
  subTitle1,
  subTitle2,
  type,
  value,
  options,
  onChange,
  onChangeSelected,
  onChangeTextArea,
  onClick,
  onClick1,
  onClick2,
}) => {
  const renderInput = () => {
    switch (type) {
      case 'Date':
        return (
          <div className="p-2 flex items-center rounded-full bg-foggy-slate">
            <CalendarDays color="white" />
            <input
              type="date"
              value={value}
              onChange={onChange}
              className="flex-1 text-center bg-transparent text-white border-none outline-none"
            />
          </div>
        );
      case 'Clock':
        return (
          <div className="p-2 flex items-center rounded-full bg-foggy-slate">
            <Clock color="white" />
            <input
              type="time"
              value={value}
              onChange={onChange}
              className="flex-1 text-center bg-transparent text-white border-none outline-none"
            />
            <h1 className="text-white">{value >= '12:30' ? 'PM' : 'AM'}</h1>
          </div>
        );
      case 'Select':
        return (
          <div className="p-2 flex items-center gap-16  rounded-full bg-foggy-slate">
            <Clock color="white" />
            <select
              value={value}
              onChange={onChangeSelected}
              className="flex-1 bg-transparent text-white border-none outline-none">
              {options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case 'Count':
        return (
          <div className="p-2 flex items-center rounded-full ">
            <div className="w-full flex items-center justify-between">
              <button
                onClick={onClick1}
                className="p-2 rounded-full bg-custom-white-0.5 border border-gray-500">
                <Minus color="white" size={20} />
              </button>
              <div className="px-10 py-2 bg-custom-white-0.5 rounded-full text-white border border-gray-500">
                {value}
              </div>
              <button
                onClick={onClick2}
                className="p-2 rounded-full bg-custom-white-0.5 border border-gray-500">
                <Plus color="white" size={20} />
              </button>
            </div>

          </div>
        );
      case 'Slider':
        return (
          <div className="p-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-white">
                <span>{subTitle1}</span>
                <span>{subTitle2}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={parseInt(value)}
                onChange={onChange}
                className="w-full bg-gray-400 h-1 text-white border-none outline-none appearance-none"
              />
            </div>
            <div className="flex text-white">
              <span className="flex-1">0%</span>
              <span className="flex-1 text-center">50%</span>
              <span className="flex-1 text-end">100%</span>
            </div>
          </div>
        );
      case 'ChoiceChip':
        return (
          <div className="p-4 flex flex-wrap gap-2 rounded-3xl bg-foggy-slate overflow-scroll h-80">
            {options?.map((option) => {
              // Verifica se a técnica está selecionada
              const isSelected = value.includes(option);
              return (
                <div
                  key={option}
                  className={`flex items-center justify-center p-2  max-w-32 text-base border   rounded-3xl cursor-pointer 
                    ${isSelected ? 'bg-custom-white-0.5 border border-green-300 text-white' : 'bg-transparent text-white'
                    }`}
                  onClick={() => onClick?.(option)}
                >
                  {option}
                </div>
              );
            })}
          </div>
        );
      case 'Boolean':
        return (
          <div className="flex items-center justify-evenly">
            <button
              onClick={() => onClick?.('true')}
              className={`px-4 py-2 text-white rounded-full bg-foggy-slate border ${value === 'true' ? 'border-green-300' : 'border-gray-500'}`}>
              Sim
            </button>
            <button
              onClick={() => onClick?.('false')}
              className={`px-4 py-2 text-white rounded-full bg-foggy-slate border ${value === 'false' ? 'border-green-300' : 'border-gray-500'}`}>
              Não
            </button>
          </div>
        );
      case 'Text':
        return (
          <textarea
            value={value}
            onChange={onChangeTextArea}
            placeholder="Digite algo..."
            className="w-full h-32 px-4 py-2 resize-none text-white bg-transparent outline-none border border-gray-500 rounded-3xl" />
        )
      default:
        return (
          <div className="p-4 bg-foggy-slate text-white">
            Sem Type
          </div>
        );
    }
  };

  return (
    <div className="p-4 rounded-2xl space-y-4 bg-foggy-slate" >
      <h1 className="text-white text-center">{title}</h1>
      {renderInput()}
    </div>
  );
};
