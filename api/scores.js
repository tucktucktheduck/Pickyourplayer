export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  const gameId = req.query.game;
  const url = gameId
    ? `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/${gameId}/boxscore`
    : `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`;
  try {
    const r = await fetch(url, { cache: 'no-store' });
    const d = await r.json();
    res.json(d);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
