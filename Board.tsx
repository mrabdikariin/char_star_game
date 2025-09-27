import React, { useEffect, useRef, useState } from 'react';
import type { BoardState, Player } from '../types';

interface BoardProps {
  board: BoardState;
  onNodeClick: (index: number) => void;
  selectedNodeIndex: number | null;
  currentPlayer: Player;
}

// Helper hook to track the previous value of a prop or state.
function usePrevious<T>(value: T): T | undefined {
  // FIX: The `useRef` hook was called without arguments, which can cause an error with some TypeScript/React type configurations.
  // Initializing it with `undefined` and adjusting the type makes it more robust.
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Node: React.FC<{
  state: Player | null;
  onClick: () => void;
  isSelected: boolean;
}> = ({ state, onClick, isSelected }) => {
  const baseClasses = "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200";
  const colorClasses = {
    P1: 'bg-black border-4 border-gray-500',
    P2: 'bg-white border-4 border-gray-100',
    null: 'bg-orange-500 hover:bg-orange-400',
  };
  const selectedClasses = isSelected ? 'ring-4 ring-offset-4 ring-offset-indigo-600 ring-green-400' : '';
  
  // State to control the animation class
  const [animationClass, setAnimationClass] = useState('');
  const prevState = usePrevious(state);

  useEffect(() => {
    // Trigger animation if a piece appears on a previously empty node.
    if (prevState === null && state !== null) {
      setAnimationClass('animate-pop-in');
      // Remove the animation class after the animation completes so it can be re-triggered.
      const timer = setTimeout(() => setAnimationClass(''), 300); // Duration must match animation.
      return () => clearTimeout(timer);
    }
  }, [state, prevState]);

  return (
    <div className={`z-10 ${selectedClasses} rounded-full`} onClick={onClick}>
        <div className={`${baseClasses} ${colorClasses[state || 'null']} ${state ? animationClass : ''}`}></div>
    </div>
  );
};

const Board: React.FC<BoardProps> = ({ board, onNodeClick, selectedNodeIndex, currentPlayer }) => {
  // Grid positions for the 9 nodes.
  const nodePositions = [
    { top: '0%', left: '0%' }, { top: '0%', left: '50%' }, { top: '0%', left: '100%' },
    { top: '50%', left: '0%' }, { top: '50%', left: '50%' }, { top: '50%', left: '100%' },
    { top: '100%', left: '0%' }, { top: '100%', left: '50%' }, { top: '100%', left: '100%' },
  ];

  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-indigo-600 p-4 rounded-lg shadow-2xl border-2 border-black">
      <div className="relative w-full h-full">
        {/* SVG for drawing connecting lines */}
        <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Outer Square */}
          <rect x="0" y="0" width="100" height="100" stroke="black" strokeWidth="2" fill="none" />
          {/* Diagonals */}
          <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="2" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="2" />
          {/* Center Cross */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="black" strokeWidth="2" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="black" strokeWidth="2" />
        </svg>
        
        {/* Nodes */}
        {board.map((nodeState, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: nodePositions[i].top,
              left: nodePositions[i].left,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Node
              state={nodeState}
              onClick={() => onNodeClick(i)}
              isSelected={selectedNodeIndex === i}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// FIX: Added default export for the Board component, which was missing.
export default Board;