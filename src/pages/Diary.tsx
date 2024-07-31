import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { headerTitle } from "../types/diary";
import { ProgressControl } from "../components/ProgressControl";
import useDiaryLayers from "../hooks/useDiaryLayers";
import { DiaryCard } from "../components/DiaryCard";

import { useAuthContext } from "../contexts/AuthContext";
import { BoxAlert } from "../components/BoxAlert";

export default function Diary() {

  const layer = useDiaryLayers()
  const { sendDiaryData, error, setError } = useAuthContext()

  return (
    <div className="w-full h-screen flex flex-col bg-diary-background bg-cover  fixed">
      <header className="p-4 flex items-center gap-4 text-white">
        {layer.layer === 0 ? (
          <Link to='/home'>
            <ChevronLeft />
          </Link>
        ) : (
          <button onClick={() => layer.handleLayer('GOBACK')}>
            <ChevronLeft />
          </button>
        )}

        <h1 className="text-2xl">{headerTitle[layer.layer]}</h1>
      </header>

      <main className="h-full flex flex-col p-6">
        <div className="flex-1">

          {layer.layer === 0 ?
            <layer.layer0 />
            : layer.layer === 1 ?
              <div className="space-y-5">
                <DiaryCard
                  title="Data do sono"
                  type="Date"
                  value={layer.diaryData.sleepDate}
                  onChange={layer.handleSleepDateChange}
                />

                <DiaryCard
                  title="A que horas você foi para a cama?"
                  type="Clock"
                  value={layer.diaryData.bedtime}
                  onChange={layer.handleBedTimeChange}
                />

                <DiaryCard
                  title="Depois de ir para a cama, qual foi o horário que você decidiu tentar dormir?"
                  type="Clock"
                  value={layer.diaryData.sleepAttemptTime}
                  onChange={layer.handleSleepAttemptTimeChange} />
              </div>
              : layer.layer === 2 ?
                <div className=" space-y-5">
                  <DiaryCard
                    title="Quanto tempo você acha que demorou até pegar no sono?"
                    type="Select"
                    value={layer.diaryData.timeToFallAsleep}
                    options={[
                      'Menos de 5 minutos',
                      'Menos de 10 minutos',
                      'Menos de 15 minutos',
                      'Menos de 20 minutos',
                      'Mais de 20 minutos',
                      'Mais de 30 minutos',
                      'Mais de 40 minutos',
                      'Mais de 50 minutos',
                      'Mais de 60 minutos',]}
                    onChangeSelected={layer.handleTimeToFallAsleepChange}
                  />
                  <DiaryCard
                    title="Quantas vezes você acordou durante a noite?"
                    type="Count"
                    value={layer.diaryData.nightAwakenings.toString()}
                    onClick1={() => layer.handleNightAwakeningsChange('-')}
                    onClick2={() => layer.handleNightAwakeningsChange('+')}
                  />

                  <DiaryCard
                    title="Quanto tempo você acha que demorou até pegar no sono novamente?"
                    type="Select"
                    value={layer.diaryData.timeToFallAsleepAgain}
                    options={[
                      'Menos de 5 minutos',
                      'Menos de 10 minutos',
                      'Menos de 15 minutos',
                      'Menos de 20 minutos',
                      'Mais de 20 minutos',
                      'Mais de 30 minutos',
                      'Mais de 40 minutos',
                      'Mais de 50 minutos',
                      'Mais de 60 minutos',]}
                    onChangeSelected={layer.handleTimeToFallAsleepAgainChange}
                  />
                </div>
                : layer.layer === 3 ?
                  <div className="space-y-5">
                    <DiaryCard
                      title="A que horas você acordou pela última vez?"
                      type="Clock"
                      value={layer.diaryData.lastWakeUpTime}
                      onChange={layer.handleLastWakeUpTimeChange}
                    />

                    <DiaryCard
                      title="A que horas você levantou da cama?"
                      type="Clock"
                      value={layer.diaryData.wakeUpTime}
                      onChange={layer.handleWakeUpTimeChange}
                    />

                  </div>
                  : layer.layer === 4 ?
                    <div className="space-y-5">
                      <DiaryCard
                        title="Comparado ao dia de ontem, como está sua ansiedade hoje?"
                        subTitle1="🧘‍- ansioso"
                        subTitle2="😯 + ansioso"
                        type="Slider"
                        value={layer.diaryData.anxietyComparisonToday.toString()}
                        onChange={layer.handleAnxietyComparisonTodayChange}
                      />

                      <DiaryCard
                        title="O quanto o seu cansaço diminuiu de ontem para hoje?"
                        subTitle1="😎 - cansaço"
                        subTitle2="🥵 + cansaço"
                        type="Slider"
                        value={layer.diaryData.fatigueReduction.toString()}
                        onChange={layer.handleFatigueReductionChange}
                      />

                    </div>
                    : layer.layer === 5 ?
                      <div className="space-y-5">
                        <DiaryCard
                          title="Comparado a ontem, como você se sente em relação ao estresse?"
                          subTitle1="😊 - estresse"
                          subTitle2="😡 + estresse"
                          type="Slider"
                          value={layer.diaryData.stressComparisonToday.toString()}
                          onChange={layer.handleStressComparisonTodayChange}
                        />
                        <DiaryCard
                          title="Como você se sente ao acordar hoje?"
                          subTitle1="🥱 - energia"
                          subTitle2="🔋 + eneriga"
                          type="Slider"
                          value={layer.diaryData.morningFeeling.toString()}
                          onChange={layer.handleMorningFeelingChange}
                        />
                      </div>
                      : layer.layer === 6 ?
                        <div className="space-y-5">
                          <DiaryCard
                            title="Selecione os hábitos  que foram feitos durante o dia"
                            type="ChoiceChip"
                            value={layer.diaryData.positiveFactorsToday.toString()}
                            options={[
                              'Expôr ao Sol (30min ou mais)',
                              'Beber água (2L ou mais)',
                              'Exercício Fisico (qualquer horário)',
                              'Cochilo (qualquer horário)',
                              'Técnica Emi-ansi-1',
                              'Técnica Emi-ansi-2',
                            ]}
                            onClick={layer.handlePositiveFactorsTodayChange}
                          />

                        </div>
                        : layer.layer === 7 ?
                          <div>
                            <DiaryCard
                              title="Selecione os fatores negativos que estiveram presentes antes de dormir"
                              type="ChoiceChip"
                              value={layer.diaryData.negativeFactorsToday.toString()}
                              options={[
                                'Eletrônicos (TV, computador, celular)',
                                'Luzes Brancas',
                                'Álcool',
                                'Cafeína',
                                'Nicotina',
                                'Refeição pesada',
                                'Líquidos'
                              ]}
                              onClick={layer.handleNegativeFactorsTodayChange}
                            />

                          </div>
                          : layer.layer === 8 ?
                            <div>
                              <DiaryCard
                                title="Selecione as técnicas que foram feitas antes de dormir"
                                type="ChoiceChip"
                                value={layer.diaryData.techniquesUsedToday.toString()}
                                options={[
                                  'Técnica Emi-sleep-1',
                                  'Técnica Emi-sleep-2',
                                  'Técnica Emi-sleep-3',
                                  'Técnica Emi-ton',
                                  'Técnica Emi-ansi-1',
                                  'Técnica Emi-ansi-2',
                                  'Outros Protocolos'
                                ]}
                                onClick={layer.handleTechniquesUsedTodayChange}
                              />
                            </div>
                            : layer.layer === 9 ?
                              <div>
                                <DiaryCard
                                  title="Fatores durante o sono"
                                  type="ChoiceChip"
                                  value={layer.diaryData.sleepFactors.toString()}
                                  options={[
                                    'Acordou para ir ao banheiro',
                                    'Barulho',
                                    'Dor',
                                    'Luz/Claridade',
                                    'Parceiro na cama',
                                    'Temperatura',
                                    'Sonho/Pesadelo',
                                    'Olhou as horas durante a insônia',
                                    'Continuou no quarto mesmo tendo insônia'
                                  ]}
                                  onClick={layer.handleSleepFactorsChange}
                                />
                              </div>
                              : layer.layer === 10 ?
                                <div className="space-y-5">
                                  <DiaryCard
                                    title="Você fez uso de algum medicamento para dormir/ansiedade?"
                                    type="Boolean"
                                    value={layer.diaryData.medicationUsageYesterday.toString()}
                                    onClick={layer.handleMedicationUsageYesterday}
                                  />
                                  <DiaryCard
                                    title="Algum comentário a mais? (opcional)"
                                    type="Text"
                                    value={layer.diaryData.additionalComments}
                                    onChangeTextArea={layer.handleAdditionalCommentsChange}
                                  />
                                </div>
                                : layer.layer === 11 ?
                                  <div className="h-full flex flex-col justify-evenly pb-16">
                                    <div className="flex-1">
                                      <DiaryCard
                                        title="O quanto você se dedicou ao programa Sonoflow hoje"
                                        subTitle1="🥱 - Pouco"
                                        subTitle2="🔋 + Muito"
                                        type="Slider"
                                        value={layer.diaryData.sleepFlowDedication.toString()}
                                        onChange={layer.handleSleepFlowDedicationChange}
                                      />
                                    </div>
                                    <button onClick={() => sendDiaryData(layer.diaryData)} className="bg-sunshine p-4 rounded-3xl text-2xl">Finalizar questionário</button>
                                  </div>

                                  : null}
                              
          {error && <BoxAlert message="Já existe um diário para esta data. Não é permitido criar um novo diário no mesmo dia." onClose={() => setError('')} />}
        </div>

        <ProgressControl
          layer={layer.layer}
          maxLayer={layer.maxLayer}
          handleLayer={layer.handleLayer}
          progressPercentage={layer.progressPercentage}
        />
      </main>
    </div>
  )
}
