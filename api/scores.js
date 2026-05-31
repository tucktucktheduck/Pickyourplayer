export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const r = await fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
  const d = await r.json();
  res.json(d);
}
