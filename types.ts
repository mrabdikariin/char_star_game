
export type Player = 'P1' | 'P2';
export type NodeState = Player | null;
export type BoardState = NodeState[];
export type GamePhase = 'placing' | 'moving' | 'gameOver';
export type View = 'start' | 'game';
