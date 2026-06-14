export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  // path examples:
  //   /api/nba?path=/scoreboard/todaysScoreboard_00.json
  //   /api/nba?path=/boxscore/boxscore_0042500401.json
  //   /api/nba?path=/playbyplay/playbyplay_0042500401.json
  const path = req.query.path || '/scoreboard/todaysScoreboard_00.json';
  const url = 'https://cdn.nba.com/static/json/liveData' + path;
  try {
    const r = await fetch(url, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://www.nba.com/',
      }
    });
    const text = await r.text();
    try {
      res.json(JSON.parse(text));
    } catch(e) {
      res.status(502).json({ error: 'bad json', body: text.slice(0,200) });
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
