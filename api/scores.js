export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  const gameId = req.query.game;
  const url = gameId
    ? `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/${gameId}/boxscore`
    : `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`;
  const r = await fetch(url);
  const d = await r.json();
  res.json(d);
}
