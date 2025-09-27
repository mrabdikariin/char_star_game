import React, { useState } from 'react';
import type { View } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import Menu from './components/Menu';

function App() {
  const [view, setView] = useState<View>('start');
  const [playerOneName, setPlayerOneName] = useState('Player One');
  const [playerTwoName, setPlayerTwoName] = useState('Player Two');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gameKey, setGameKey] = useState(0); // Used to force a reset of the GameScreen

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const startGame = () => setView('game');
  const goHome = () => {
    setView('start');
    closeMenu();
  };

  // Resetting the game is now handled by changing the key of the GameScreen component,
  // which forces it to unmount and remount with a fresh state.
  const resetGame = () => {
    setGameKey(prevKey => prevKey + 1);
    closeMenu();
  };

  return (
    <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 min-h-screen text-white overflow-hidden">
      {view === 'start' ? (
        <StartScreen 
          onStart={startGame}
          onOpenMenu={openMenu}
          playerOneName={playerOneName}
          setPlayerOneName={setPlayerOneName}
          playerTwoName={playerTwoName}
          setPlayerTwoName={setPlayerTwoName}
        />
      ) : (
        <GameScreen 
          key={gameKey} // The key ensures the component re-mounts on reset
          onGoHome={goHome} 
          onOpenMenu={openMenu}
          playerOneName={playerOneName} 
          playerTwoName={playerTwoName} 
        />
      )}
      <Menu 
        isOpen={isMenuOpen} 
        onClose={closeMenu} 
        onReset={resetGame}
        onGoHome={goHome}
      />
    </div>
  );
}

export default App;