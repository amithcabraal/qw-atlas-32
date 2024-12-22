import React from 'react';
import { usePlayerGame } from './usePlayerGame';
import GameMap from './GameMap';
import AnswerControls from './AnswerControls';
import QuestionCard from '../QuestionCard';

interface PlayerViewProps {
  gameId: string;
  playerId: string;
  question: Question;
  questionNumber: number;
  hasAnswered: boolean;
  gameStatus: 'waiting' | 'playing' | 'revealing' | 'finished';
}

export default function PlayerView({
  gameId,
  playerId,
  question,
  questionNumber,
  hasAnswered: initialHasAnswered,
  gameStatus
}: PlayerViewProps) {
  const {
    selectedLocation,
    isSubmitting,
    error,
    hasAnswered,
    markers,
    mapRef,
    mapKey,
    handleMapClick,
    handleSubmit
  } = usePlayerGame({
    gameId,
    playerId,
    question,
    questionNumber,
    initialHasAnswered,
    gameStatus
  });

  return (
    <div className="h-[calc(100vh-128px)] flex flex-col mt-16">
      {/* Main content area that fills remaining space */}
      <div className="flex-1 flex flex-col">
        {/* Question card - approximately 35% of remaining height */}
        <div className="h-[30%] p-4">
          <QuestionCard 
            question={question} 
            questionNumber={questionNumber}
          />
        </div>
        
        {/* Map container - fills remaining space */}
        <div className="flex-1">
          <GameMap
            ref={mapRef}
            mapKey={mapKey}
            markers={markers}
            onMapClick={gameStatus === 'playing' && !hasAnswered ? handleMapClick : undefined}
            showLabels={gameStatus === 'revealing'}
            showMarkerLabels={gameStatus === 'revealing'}
            interactive={!isSubmitting}
          />
        </div>
      </div>

      {/* Fixed height footer section - 80px for controls */}
      <div className="h-20 flex-none px-4">
        <AnswerControls
          error={error}
          gameStatus={gameStatus}
          hasAnswered={hasAnswered}
          isSubmitting={isSubmitting}
          selectedLocation={selectedLocation}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
