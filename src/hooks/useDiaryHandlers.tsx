import { useState } from "react";
import type { DiaryModelProps } from "../types/diary";
import { formatDate } from "../utils/formatDate";

const useDiaryHandlers = (initalData: DiaryModelProps) => {
  const [diaryData, setDiaryData] = useState<DiaryModelProps>(initalData);

  const handleSleepDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value)
    const localDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000)
    setDiaryData(prevData => ({
      ...prevData,
      sleepDate: formatDate(localDate, 'yyyy-mm-dd')
    }))
  }

  const handleBedTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedBedTime = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      bedtime: selectedBedTime
    }))
  }

  const handleSleepAttemptTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedSleepAttemptTime = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      sleepAttemptTime: selectedSleepAttemptTime
    }))
  }

  const handleTimeToFallAsleepChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const selectedTimeToFallAsleep = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      timeToFallAsleep: selectedTimeToFallAsleep
    }))
  }

  const handleNightAwakeningsChange = (action: string) => {
    setDiaryData(prevData => ({
      ...prevData,
      nightAwakenings: action === '+' ? prevData.nightAwakenings + 1 : Math.max(0, prevData.nightAwakenings - 1)
    }))
  }

  const handleTimeToFallAsleepAgainChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const selectedTimeToFallAsleepAgain = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      timeToFallAsleepAgain: selectedTimeToFallAsleepAgain
    }))
  }

  const handleLastWakeUpTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedLastWakeUpTime = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      lastWakeUpTime: selectedLastWakeUpTime
    }))
  }

  const handleWakeUpTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedWakeUpTime = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      wakeUpTime: selectedWakeUpTime
    }))
  }

  const handleAnxietyComparisonTodayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAnxietyComparisonToday = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      anxietyComparisonToday: parseInt(selectedAnxietyComparisonToday)
    }))
  }

  const handleFatigueReductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFatigueReduction = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      fatigueReduction: parseInt(selectedFatigueReduction)
    }))
  }

  const handleStressComparisonTodayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStressComparisonToday = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      stressComparisonToday: parseInt(selectedStressComparisonToday)
    }))
  }

  const handleMorningFeelingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMorningFeeling = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      morningFeeling: parseInt(selectedMorningFeeling)
    }))
  }

  const handleTechniquesUsedTodayChange = (option: string) => {
    setDiaryData(prevData => {
      const newTechniques = [...prevData.techniquesUsedToday];
      const isSelected = newTechniques.includes(option);

      if (isSelected) {
        // Remove a opção se ela já estiver selecionada
        const updatedTechniques = newTechniques.filter(item => item !== option);
        return {
          ...prevData,
          techniquesUsedToday: updatedTechniques
        };
      } else {
        // Adiciona a opção se ela não estiver selecionada
        return {
          ...prevData,
          techniquesUsedToday: [...newTechniques, option]
        };
      }
    });
  };

  const handlePositiveFactorsTodayChange = (option: string) => {
    setDiaryData(prevData => {
      const newPositiveFactory = [...prevData.positiveFactorsToday];
      const isSelected = newPositiveFactory.includes(option)

      if (isSelected) {
        // Remova a opção se ela já estiver selecionada
        const updatePositiveFactory = newPositiveFactory.filter(item => item !== option)
        return {
          ...prevData,
          positiveFactorsToday: updatePositiveFactory
        };
      } else {
        // Adiciona a opção se ela não estiver selecioada
        return {
          ...prevData,
          positiveFactorsToday: [...newPositiveFactory, option]
        }
      }
    })
  }

  const handleNegativeFactorsTodayChange = (option: string) => {
    setDiaryData(prevData => {
      const newNegativeFactory = [...prevData.negativeFactorsToday];
      const isSelected = newNegativeFactory.includes(option)

      if (isSelected) {
        // Remova a opção se ela já estiver selecionada
        const updateNegativeFactory = newNegativeFactory.filter(item => item !== option)
        return {
          ...prevData,
          negativeFactorsToday: updateNegativeFactory
        };
      } else {
        // Adiciona a opção se ela não estiver selecioada
        return {
          ...prevData,
          negativeFactorsToday: [...newNegativeFactory, option]
        }
      }
    })
  }

  const handleSleepFactorsChange = (option: string) => {
    setDiaryData(prevData => {
      const newSleepFactory = [...prevData.sleepFactors];
      const isSelected = newSleepFactory.includes(option)

      if (isSelected) {
        // Remova a opção se ela já estiver selecionada
        const updateSleepFactory = newSleepFactory.filter(item => item !== option)
        return {
          ...prevData,
          sleepFactors: updateSleepFactory
        };
      } else {
        // Adiciona a opção se ela não estiver selecioada
        return {
          ...prevData,
          sleepFactors: [...newSleepFactory, option]
        }
      }
    })
  }

  const handleMedicationUsageYesterday = (value: string) => {
    setDiaryData(prevData => ({
      ...prevData,
      medicationUsageYesterday: value === 'true' ? true : false
    }));
  };

  const handleAdditionalCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setDiaryData(prevData => ({
      ...prevData,
      additionalComments: newValue
    }));
  };

  const handleSleepFlowDedicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedSleepFlowDedicationChange = e.target.value
    setDiaryData(prevData => ({
      ...prevData,
      sleepFlowDedication: parseInt(selectedSleepFlowDedicationChange)
    }))
  }

  return {
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
  }
}

export default  useDiaryHandlers;