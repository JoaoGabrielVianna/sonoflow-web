export type headerTitleType = {
  [key: number]: string
}

export const headerTitle: headerTitleType = {
  0: 'Diário do sono',
  1: 'Rotina do sono',
  2: 'Rotina do sono',
  3: 'Rotina do sono',
  4: 'Qualidade do sono',
  5: 'Qualidade do sono',
  6: 'Ativadores de Hormônios',
  7: 'Bloqueadores',
  8: 'Aceleradores',
  9: 'Rotina do Sono',
  10: 'Comentários',
  11: 'Finalizar Questionário'
}

export type handleLayerType = 'CONTINUE' | 'GOBACK'


export interface DiaryCardModel {
  title: string,
  value: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeSelected?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  onChangeTextArea? : (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onClick?: (option: string) => void,
  onClick1?: () => void,
  onClick2?: () => void,
  options?: string[],
  subTitle1?: string,
  subTitle2?: string,
  type: 'Count' | 'Date' | 'Clock' | 'Slider' | 'Text' | 'Select' | 'ChoiceChip' | 'Boolean';
  
}


export interface DiaryModelProps {
  // Layer 1
  sleepDate: string; // Data do sono
  bedtime: string; // A que horas você foi para cama?
  sleepAttemptTime: string; // Depois de ir para a cama, qual foi o horário que você decidiu tentar dormir?

  // Layer 2
  timeToFallAsleep: string; // Quanto tempo você acha que demorou até pegar no sono?
  nightAwakenings: number; // Quantas vezes você acordou durante a noite?
  timeToFallAsleepAgain: string; // Quanto tempo você acha que demorou até pegar no sono novamente?

  // Layer 3
  lastWakeUpTime: string; // A que horas você acordou pela última vez?
  wakeUpTime: string; // A que horas você levantou da cama?

  // Layer 4
  anxietyComparisonToday: number; // Comparado ao dia de ontem, como está sua ansiedade hoje?
  fatigueReduction: number; // O quanto o seu cansaço diminuiu de ontem para hoje?

  // Layer 5
  stressComparisonToday: number; // Em relação a ontem, como você se sente em relação ao estresse?
  morningFeeling: number; // Como você se sente ao acordar hoje?

  // layer 6
  techniquesUsedToday: string[]; // Selecione os fatores que estiveram presentes durante o seu dia e antes de você ir dormir

  // Layer 7
  positiveFactorsToday: string[]; // Selecione os fatores presentes durante o período de sono

  // Layer 8
  negativeFactorsToday: string[]; // Selecione os fatores negativos que estiveram presentes antes de dormir
  
  // Layer 9
  sleepFactors: string[]; // Fatores durante o sono

  // Layer 10
  medicationUsageYesterday: boolean; // Você fez uso de algum medicamento para dormir/ansiedade?
  additionalComments: string; // Algum comentário a mais? (opcional)
  
  // Layer 11
  sleepFlowDedication: number; // O quanto você se dedicou ao programa Sonoflow hoje

}