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
    <div className="fixed top-16 bottom-0 left-0 right-0 flex flex-col">
      {/* Main content area - fills available space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Question card - 35% of remaining space */}
        <div className="h-[35%] p-4">
          <QuestionCard 
            question={question} 
            questionNumber={questionNumber}
          />
        </div>
        
        {/* Map container - 65% of remaining space */}
        <div className="h-[65%]">
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

      {/* Controls - fixed height at bottom */}
      <div className="h-20 flex-none px-4 py-4 bg-gradient-to-t from-black/50 to-transparent">
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
