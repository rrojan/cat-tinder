import { Yellowtail } from 'next/font/google';
import { Paw } from './icons';

const yellowtail = Yellowtail({ weight: '400', subsets: ['latin'] });

export default function MatchOverlay({ cat, onClose }) {
  if (!cat) return null;

  return (
    <div className="match">
      <p className={`match-title ${yellowtail.className}`}>It's a Match!</p>
      <p className="match-sub">You and {cat.name} liked each other.</p>
      <div className="avatars">
        <img src={cat.photo} alt="" />
        <span className="you" aria-label="You">
          <Paw />
        </span>
      </div>
      <button type="button" onClick={onClose}>
        Keep swiping
      </button>
    </div>
  );
}
