import { cats } from '../../../lib/cats';

// POST /api/swipe  { id: 3, direction: 'left' | 'right' | 'super' }
export async function POST(request) {
  const { id, direction } = await request.json();
  const cat = cats.find((c) => c.id === id);

  if (!cat) {
    return Response.json({ error: 'No cat with that id' }, { status: 404 });
  }

  // Only the server knows who likes you back. A super like always lands.
  const match = direction === 'super' || (direction === 'right' && cat.likesYou);

  return Response.json({ match });
}
