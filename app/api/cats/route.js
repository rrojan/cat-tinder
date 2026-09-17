import { cats } from '../../../lib/cats';

// GET /api/cats
export function GET() {
  // Strip the secret before it reaches the browser.
  return Response.json(cats.map(({ likesYou, ...cat }) => cat));
}
