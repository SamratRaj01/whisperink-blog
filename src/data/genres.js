// Design data for the genre "spines" on the shelf. Pure data, no imports:
// the content plugin (scripts/vite-content-plugin.js) also reads this file to
// validate each story's `genre`.
//
// `spine` holds the two-stop gradient colours, `foil` the embossed title
// colour, `halo` the hover glow, `noun` the singular/plural used in the
// collection header ("7 stories", "1 tale"). Story counts are derived from the
// catalogue — never typed here.
export const genres = [
  { id: 'horror',      name: 'Horror',        noun: ['story', 'stories'], spine: ['#7a2330', '#4e141d'], foil: '#e3c489', halo: 'rgba(180,60,70,.45)',  height: 224 },
  { id: 'verse',       name: 'Verse',         noun: ['poem', 'poems'],    spine: ['#3c4f63', '#222f3d'], foil: '#bcd0e2', halo: 'rgba(110,150,190,.4)', height: 214 },
  { id: 'reflections', name: 'Reflections',   noun: ['essay', 'essays'],  spine: ['#37454c', '#1e2a30'], foil: '#cdd6d2', halo: 'rgba(130,170,180,.4)', height: 206 },
  { id: 'heart',       name: 'Tender Dark',   noun: ['story', 'stories'], spine: ['#5b3340', '#341c25'], foil: '#e2bcc6', halo: 'rgba(190,110,140,.4)', height: 218 },
  { id: 'folklore',    name: 'Folk & Fae',    noun: ['tale', 'tales'],    spine: ['#46512f', '#2a331b'], foil: '#d8dab0', halo: 'rgba(150,170,90,.4)',  height: 200 },
  { id: 'sitcom',      name: 'Sitcom Horror', noun: ['reel', 'reels'],    spine: ['#5a4420', '#2f2310'], foil: '#e6cf94', halo: 'rgba(200,160,80,.5)',  height: 230, soon: true },
];

// Per-genre cover styling: ink colour, cover scrawl, and which motif to draw.
export const genreMeta = {
  horror:      { ink: '#e7b4a6', scrawl: "don't read alone",     motif: 'eye' },
  verse:       { ink: '#bcd6ea', scrawl: 'say it aloud',          motif: 'flower' },
  reflections: { ink: '#cdddd6', scrawl: 'this one is about you', motif: 'mirror' },
  heart:       { ink: '#ecc4d0', scrawl: 'it still aches',        motif: 'heartstitch' },
  folklore:    { ink: '#d8dcab', scrawl: 'older than the church', motif: 'moth' },
  sitcom:      { ink: '#ecc985', scrawl: 'laugh track included',  motif: 'tv' },
};

// Section header copy for each shelf selection (plus the default "all" view).
// Genre collections get their kicker ("collection · 7 stories") from the
// catalogue; only the views without a count spell one out here.
export const sectionMeta = {
  all:         { kicker: 'featured from the archive', title: 'Recently Recovered', desc: 'A handful of volumes pulled from the shelves to begin. Pick a spine above to browse a single collection.' },
  horror:      { title: 'Horror', desc: 'Accounts of fear, grief, obsession, and the things that refuse to stay buried.' },
  verse:       { title: 'Verse', desc: 'Short, sharp lines for the hour when sleep will not come.' },
  reflections: { title: 'Reflections', desc: 'The quiet horror of being a person, examined up close.' },
  heart:       { title: 'Tender Dark', desc: 'Fiction that aches more than it frightens — love, family, and slow goodbyes.' },
  folklore:    { title: 'Folk & Fae', desc: 'Old tales that were never meant to comfort children.' },
  sitcom:      { kicker: 'coming soon', title: 'Sitcom Horror', desc: 'Familiar laugh-tracked living rooms, re-cut into something that should not be funny. The first reel is almost ready.' },
};

export const genreById = Object.fromEntries(genres.map((g) => [g.id, g]));
