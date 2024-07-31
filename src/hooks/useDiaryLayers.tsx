import { useState } from "react";
import ManDiary from "../assets/svgs/man-diary.svg"
import { handleLayerType } from "../types/diary";
import { formatDate } from "../utils/formatDate";
import useDiaryHandlers from "./useDiaryHandlers";

const useDiaryLayers = () => {
  const [layer, setLayer] = useState<number>(0);
  const maxLayer = 11;
  const progressPercentage = (layer / maxLayer) * 100;

  const handleLayer = (direction: handleLayerType) => {
    direction === 'CONTINUE' ? setLayer(layer + 1) : setLayer(layer - 1)
  }

  const {
    diaryData,
    handleSleepDateChange,
    handleBedTimeChange,
    handleSleepAttemptTimeChange,
    handleTimeToFallAsleepChange,
    handleNightAwakeningsChange,
    handleTimeToFallAsleepAgainChange,
    handleLastWakeUpTimeChange,
    handleWakeUpTimeChange,
    handleAnxietyComparisonTodayChange,
    handleFatigueReductionChange,
    handleStressComparisonTodayChange,
    handleMorningFeelingChange,
    handleTechniquesUsedTodayChange,
    handlePositiveFactorsTodayChange,
    handleNegativeFactorsTodayChange,
    handleSleepFactorsChange,
    handleMedicationUsageYesterday,
    handleAdditionalCommentsChange,
    handleSleepFlowDedicationChange
  } = useDiaryHandlers({
    sleepDate: formatDate(new Date(), 'yyyy-mm-dd'),
    bedtime: '00:00',
    sleepAttemptTime: '00:00',
    timeToFallAsleep: 'Menos de 5 minutos',
    nightAwakenings: 0,
    timeToFallAsleepAgain: '00:00',
    lastWakeUpTime: '00:00',
    wakeUpTime: '00:00',
    anxietyComparisonToday: 50,
    fatigueReduction: 50,
    stressComparisonToday: 50,
    morningFeeling: 50,
    techniquesUsedToday: [],
    positiveFactorsToday: [],
    negativeFactorsToday: [],
    sleepFactors: [],
    medicationUsageYesterday: false,
    additionalComments: '',
    sleepFlowDedication: 50,
  })

  const layer0 = () => {
    return (
      <div className="flex flex-col justify-center gap-16">
        <div className="flex flex-col items-center bg-white p-7 rounded-3xl">
          <h1 className="text-center text-xl text-deep-blue">Realize o seu <strong>diário do sono</strong> para que possamos te ajudar a melhorar sua qualidade do sono</h1>
          <img src={ManDiary} alt="" />
        </div>
        <button onClick={() => handleLayer('CONTINUE')} className="bg-sunshine p-4 rounded-3xl text-2xl text-deep-blue">Iniciar questionário</button>
      </div>
    )
  }


  return {
    layer,
    layer0,
    maxLayer,
    progressPercentage,
    handleLayer,

    diaryData,
    handleSleepDateChange,
    handleBedTimeChange,
    handleSleepAttemptTimeChange,
    handleTimeToFallAsleepChange,
    handleNightAwakeningsChange,
    handleTimeToFallAsleepAgainChange,
    handleLastWakeUpTimeChange,
    handleWakeUpTimeChange,
    handleAnxietyComparisonTodayChange,
    handleFatigueReductionChange,
    handleStressComparisonTodayChange,
    handleMorningFeelingChange,
    handleTechniquesUsedTodayChange,
    handlePositiveFactorsTodayChange,
    handleNegativeFactorsTodayChange,
    handleSleepFactorsChange,
    handleMedicationUsageYesterday,
    handleAdditionalCommentsChange,
    handleSleepFlowDedicationChange,
  }
}

export default useDiaryLayers;