import React from 'react';
import type { Player } from '../types';

interface PlayerInfoProps {
  player: Player;
  playerName: string;
  avatarUrl: string;
  piecesLeft: number;
}

const TrianglePieceHolder: React.FC<{ player: Player, piecesLeft: number }> = ({ player, piecesLeft }) => {
  const pieceColor = player === 'P1' ? 'bg-black' : 'bg-white';

  return (
    <div className="relative w-28 h-24 md:w-36 md:h-32">
      <svg viewBox="0 0 100 86.6" className="w-full h-full">
        <polygon 
          points="50 0, 100 86.6, 0 86.6" 
          className="stroke-white" 
          strokeWidth="2"
          style={{ fill: '#8c52ff' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="grid grid-cols-2 gap-2 w-full place-items-center">
            {Array.from({ length: 3 }).map((_, i) => (
                <div 
                    key={i} 
                    className={`w-5 h-5 md:w-6 md:h-6 rounded-full border border-gray-400 ${i === 2 ? 'col-span-2' : ''} ${i < piecesLeft ? pieceColor : 'bg-orange-500'}`}
                ></div>
            ))}
        </div>
      </div>
    </div>
  );
};


const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, playerName, avatarUrl, piecesLeft }) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <img src={avatarUrl} alt={`${playerName} avatar`} className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg" />
      <TrianglePieceHolder player={player} piecesLeft={piecesLeft} />
      <p className="text-lg md:text-xl font-bold uppercase tracking-widest">{playerName}</p>
    </div>
  );
};

export default PlayerInfo;