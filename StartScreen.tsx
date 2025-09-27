import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onOpenMenu: () => void;
  playerOneName: string;
  setPlayerOneName: (name: string) => void;
  playerTwoName: string;
  setPlayerTwoName: (name: string) => void;
}

const PreviewPiece = ({ color, top, left }: { color: string; top: string; left: string; }) => (
    <div 
      className={`absolute w-5 h-5 md:w-6 md:h-6 ${color} rounded-full border-2 border-black/50`} 
      style={{ top, left, transform: 'translate(-50%, -50%)' }}>
    </div>
  );

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onOpenMenu, playerOneName, setPlayerOneName, playerTwoName, setPlayerTwoName }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <button onClick={onOpenMenu} className="absolute top-5 left-5 z-10">
        <div className="w-12 h-12 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/40 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div>
      </button>

      <h1 className="text-7xl md:text-9xl font-bold tracking-wider mb-4" style={{ fontFamily: "'Righteous', cursive" }}>
        <span className="text-indigo-300">CH</span>
        <span className="text-red-400">AR</span>
      </h1>
      <h2 className="text-7xl md:text-9xl font-bold tracking-wider mb-8 text-black" style={{ fontFamily: "'Righteous', cursive" }}>
        STAR
      </h2>

      {/* Board Preview based on user image */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 bg-indigo-600 rounded-lg shadow-2xl mb-8">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            <rect x="0" y="0" width="100" height="100" stroke="black" strokeWidth="2" fill="none" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="2" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="2" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="black" strokeWidth="2" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="black" strokeWidth="2" />
        </svg>

        {/* Top Row: white, black, white */}
        <PreviewPiece color="bg-white" top="0%" left="0%" />
        <PreviewPiece color="bg-black" top="0%" left="50%" />
        <PreviewPiece color="bg-white" top="0%" left="100%" />

        {/* Middle Row: black, black, white */}
        <PreviewPiece color="bg-black" top="50%" left="0%" />
        <PreviewPiece color="bg-black" top="50%" left="50%" />
        <PreviewPiece color="bg-white" top="50%" left="100%" />

        {/* Bottom Row: orange, orange, orange */}
        <PreviewPiece color="bg-orange-400" top="100%" left="0%" />
        <PreviewPiece color="bg-orange-400" top="100%" left="50%" />
        <PreviewPiece color="bg-orange-400" top="100%" left="100%" />
      </div>


      <div className="w-full max-w-sm mb-8 flex flex-col gap-4">
        <div>
          <label htmlFor="player1" className="block text-lg font-bold mb-2 text-left tracking-wider">Player One</label>
          <input
            type="text"
            id="player1"
            value={playerOneName}
            onChange={(e) => setPlayerOneName(e.target.value)}
            className="w-full p-3 bg-white/20 border-2 border-black/50 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-green-400 focus:outline-none transition text-center"
            placeholder="Enter name..."
            maxLength={12}
          />
        </div>
        <div>
          <label htmlFor="player2" className="block text-lg font-bold mb-2 text-left tracking-wider">Player Two</label>
          <input
            type="text"
            id="player2"
            value={playerTwoName}
            onChange={(e) => setPlayerTwoName(e.target.value)}
            className="w-full p-3 bg-white/20 border-2 border-black/50 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-green-400 focus:outline-none transition text-center"
            placeholder="Enter name..."
            maxLength={12}
          />
        </div>
      </div>
      
      <button 
        onClick={onStart} 
        className="font-press-start text-black bg-green-400 px-10 py-3 text-2xl border-2 border-black hover:bg-green-500 transition-colors"
        style={{
            boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))'
        }}
      >
        START
      </button>
    </div>
  );
};

export default StartScreen;