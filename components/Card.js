'use client';

import { useRef, useState } from 'react';
import { Pin } from './icons';

const stampFor = { left: 'nope', right: 'like', super: 'super' };

export default function Card({ cat, index, leaving, onSwipe }) {
  const start = useRef(null);
  const [drag, setDrag] = useState(null);

  const isTop = index === 0;

  function onPointerDown(event) {
    if (!isTop || leaving) return;
    start.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ dx: 0, dy: 0 });
  }

  function onPointerMove(event) {
    if (!start.current) return;
    setDrag({ dx: event.clientX - start.current.x, dy: event.clientY - start.current.y });
  }

  function onPointerUp() {
    if (!start.current) return;
    const { dx } = drag;
    start.current = null;
    setDrag(null);
    if (Math.abs(dx) > 100) onSwipe(dx > 0 ? 'right' : 'left');
  }

  const style = { '--i': index };
  const stamps = { like: 0, nope: 0, super: 0 };

  if (drag) {
    style.transform = `translate(${drag.dx}px, ${drag.dy}px) rotate(${drag.dx * 0.06}deg)`;
    stamps.like = Math.min(drag.dx / 90, 1);
    stamps.nope = Math.min(-drag.dx / 90, 1);
  }

  if (leaving) {
    const x = leaving === 'left' ? -1 : leaving === 'right' ? 1 : 0;
    const y = leaving === 'super' ? -1.5 : 0;
    style.transform = `translate(${x * 150}%, ${y * 100}%) rotate(${x * 30}deg)`;
    stamps[stampFor[leaving]] = 1;
  }

  return (
    <article
      className={`card${drag ? ' dragging' : ''}${leaving ? ' flying' : ''}`}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img src={cat.photo} alt={cat.name} draggable={false} />
      <span className="stamp like" style={{ opacity: stamps.like }}>LIKE</span>
      <span className="stamp nope" style={{ opacity: stamps.nope }}>NOPE</span>
      <span className="stamp super" style={{ opacity: stamps.super }}>SUPER LIKE</span>
      <div className="info">
        <h2>
          {cat.name} <span>{cat.age}</span>
        </h2>
        <p className="distance">
          <Pin /> {cat.distance} km away
        </p>
        <p className="bio">{cat.bio}</p>
      </div>
    </article>
  );
}
