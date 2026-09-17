# Cat Tinder

Swipe on cats. A Next.js app with two API routes and no database. The "database" is a list of cats in `lib/cats.js`.

```
npm install
npm run dev
```

Then open http://localhost:3000

| Route             | Does                                                      |
| ----------------- | --------------------------------------------------------- |
| `GET /api/cats`   | Returns the cats, without the `likesYou` secret            |
| `POST /api/swipe` | Takes `{ id, direction }` and says whether it's a match    |

Where things live:

- `app/page.js` is the screen. It fetches the cats and handles swiping.
- `app/api/*/route.js` are the API routes. On Vercel each one becomes a serverless function.
- `components/` holds the card, the match screen and the matches list.
