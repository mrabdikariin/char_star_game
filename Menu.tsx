import React, { useState, useEffect } from 'react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onGoHome: () => void;
}

type MenuView = 'main' | 'about' | 'contact' | 'privacy';

const Menu: React.FC<MenuProps> = ({ isOpen, onClose, onReset, onGoHome }) => {
  const [menuView, setMenuView] = useState<MenuView>('main');

  // When the menu is closed, reset its internal state to the main view.
  useEffect(() => {
    if (!isOpen) {
      // Delay resetting the view until after the slide-out animation is complete.
      const timer = setTimeout(() => {
        setMenuView('main');
      }, 300); // This duration should match the CSS transition duration.
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const renderMainView = () => (
    <>
      <h2 className="text-3xl font-bold mb-8 text-pink-400">Menu</h2>
      <nav className="flex flex-col space-y-4 text-lg flex-grow">
        <button
          onClick={onReset}
          className="p-3 text-left rounded-lg hover:bg-white/10 transition-colors"
        >
          Reset Game
        </button>
        <button
          onClick={onGoHome}
          className="p-3 text-left rounded-lg hover:bg-white/10 transition-colors"
        >
          Main Menu
        </button>
        <div className="border-t border-white/20 my-4"></div>
        <button
          onClick={() => setMenuView('about')}
          className="p-3 text-left rounded-lg hover:bg-white/10 transition-colors"
        >
          About
        </button>
        <button
          onClick={() => setMenuView('contact')}
          className="p-3 text-left rounded-lg hover:bg-white/10 transition-colors"
        >
          Contact
        </button>
        <button
          onClick={() => setMenuView('privacy')}
          className="p-3 text-left rounded-lg hover:bg-white/10 transition-colors"
        >
          Privacy Policy
        </button>
      </nav>
      <button
        onClick={onClose}
        className="mt-auto p-3 bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors font-bold"
      >
        Return to Game
      </button>
    </>
  );
  
  const renderSubView = (title: string, content: React.ReactNode) => (
    <>
      <h2 className="text-3xl font-bold mb-8 text-pink-400">{title}</h2>
      <div className="flex-grow space-y-4 text-white/90 animate-fade-in">
        {content}
      </div>
      <button
        onClick={() => setMenuView('main')}
        className="mt-auto p-3 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors font-bold"
      >
        Back to Menu
      </button>
    </>
  );

  const aboutContent = (
    <p className="text-sm leading-relaxed">
      <strong>CHAR STAR Game v1.0</strong>
      <br />
      A 1-on-1 offline strategy board game where players aim to align their three pieces in a row. The game involves a placement phase and a movement phase, offering simple yet engaging tactical gameplay.
    </p>
  );
  
  const contactContent = (
    <div className="text-sm space-y-1">
      <p className="font-bold">Developer: Abdikarin Mahad</p>
      <p>Founder & CEO</p>
      <p className="pt-2">
        <a href="mailto:abdikariin270@gmail.com" className="text-cyan-300 hover:underline">
          abdikariin270@gmail.com
        </a>
      </p>
      <p>
        <a href="tel:+252618186465" className="text-cyan-300 hover:underline">
          +252618186465
        </a>
      </p>
      <p>
        <a href="https://www.linkedin.com/in/abdikariinorg/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">
          LinkedIn Profile
        </a>
      </p>
    </div>
  );

  const privacyContent = (
    <p className="text-sm leading-relaxed">
      This is an offline game. No data is collected. All game state and player information (including names) is stored locally on your device for the duration of the session and is not transmitted anywhere.
    </p>
  );

  let viewContent;
  switch (menuView) {
    case 'about':
      viewContent = renderSubView('About', aboutContent);
      break;
    case 'contact':
      viewContent = renderSubView('Contact', contactContent);
      break;
    case 'privacy':
      viewContent = renderSubView('Privacy Policy', privacyContent);
      break;
    default:
      viewContent = renderMainView();
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-indigo-800 to-purple-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full text-white">
          {viewContent}
        </div>
      </div>
    </>
  );
};

export default Menu;