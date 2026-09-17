import { Cross } from './icons';

export default function MatchesSheet({ open, matches, onClose }) {
  if (!open) return null;

  return (
    <div className="sheet">
      <div className="sheet-head">
        <h2>Matches</h2>
        <button type="button" onClick={onClose} aria-label="Close">
          <Cross />
        </button>
      </div>
      {matches.length === 0 ? (
        <p className="no-matches">No matches yet. Swipe right on someone.</p>
      ) : (
        <ul>
          {matches.map((cat) => (
            <li key={cat.id}>
              <img src={cat.photo} alt="" />
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
