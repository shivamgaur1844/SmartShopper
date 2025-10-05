const axios = require('axios');
const querystring = require('querystring');

const MEESHO_CLIENT_ID = process.env.MEESHO_CLIENT_ID;
const MEESHO_CLIENT_SECRET = process.env.MEESHO_CLIENT_SECRET;
const MEESHO_REDIRECT_URI = process.env.MEESHO_REDIRECT_URI;

const AUTH_URL = 'https://api.meesho.com/oauth/authorize';
const TOKEN_URL = 'https://api.meesho.com/oauth/token';

function getMeeshoAuthUrl(state) {
  const params = querystring.stringify({
    client_id: MEESHO_CLIENT_ID,
    response_type: 'code',
    redirect_uri: MEESHO_REDIRECT_URI,
    state,
  });
  return `${AUTH_URL}?${params}`;
}

async function exchangeCodeForToken(code) {
  const data = {
    grant_type: 'authorization_code',
    code,
    client_id: MEESHO_CLIENT_ID,
    client_secret: MEESHO_CLIENT_SECRET,
    redirect_uri: MEESHO_REDIRECT_URI,
  };
  const res = await axios.post(TOKEN_URL, querystring.stringify(data), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return res.data;
}

module.exports = { getMeeshoAuthUrl, exchangeCodeForToken }; 