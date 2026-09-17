// This is our "database". It only ever runs on the server.
// `likesYou` is the server's secret and never leaves it.

const photo = (id) => `https://cataas.com/cat/${id}?width=720&height=960`;

export const cats = [
  { id: 1, name: 'Mochi', age: 2, distance: 1, bio: 'Professional napper. Will judge your furniture.', photo: photo('1KeQpy7eHqi0SFmc'), likesYou: true },
  { id: 2, name: 'Biscuit', age: 4, distance: 3, bio: 'Big boy energy. Loves grass, hates Mondays.', photo: photo('1DrcyohjhwcNaRIz'), likesYou: false },
  { id: 3, name: 'Luna', age: 1, distance: 2, bio: 'Chaotic good. Runs laps at 3am for no reason.', photo: photo('1Y3dpssxcbHPEkfO'), likesYou: true },
  { id: 4, name: 'Pickles', age: 7, distance: 5, bio: 'Looking for someone to ignore together.', photo: photo('1CF7xZmlX0t8QpgP'), likesYou: false },
  { id: 5, name: 'Gizmo', age: 3, distance: 1, bio: 'Recently survived a bath. Still processing.', photo: photo('1si02A2ZNdeNH3yo'), likesYou: true },
  { id: 6, name: 'Nala', age: 5, distance: 4, bio: 'Sunbeam connoisseur. Swipe right for slow blinks.', photo: photo('22tTAaFI1Q33YBGO'), likesYou: true },
  { id: 7, name: 'Tofu', age: 2, distance: 6, bio: "Forgot to put my tongue back. It's a whole thing.", photo: photo('1N2AH31jiY6N9TYc'), likesYou: false },
  { id: 8, name: 'Salem', age: 6, distance: 2, bio: 'Emotionally unavailable, physically on your keyboard.', photo: photo('2Bb8z8bR1w5EFHhz'), likesYou: true },
  { id: 9, name: 'Waffles', age: 3, distance: 8, bio: 'Yes, the outfit was my idea.', photo: photo('2eXYJhGolHqOAKaM'), likesYou: false },
  { id: 10, name: 'Pepper', age: 8, distance: 3, bio: 'Will bring you a sock every morning. That is the deal.', photo: photo('2lnVocnpd25cUka7'), likesYou: true },
];
