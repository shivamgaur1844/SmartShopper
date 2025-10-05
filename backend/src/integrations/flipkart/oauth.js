const axios = require('axios');
const querystring = require('querystring');

const FLIPKART_CLIENT_ID = process.env.FLIPKART_CLIENT_ID;
const FLIPKART_CLIENT_SECRET = process.env.FLIPKART_CLIENT_SECRET;
const FLIPKART_REDIRECT_URI = process.env.FLIPKART_REDIRECT_URI;

const AUTH_URL = 'https://seller.flipkart.com/oauth-service/oauth/authorize';
const TOKEN_URL = 'https://seller.flipkart.com/oauth-service/oauth/token';

function getFlipkartAuthUrl(state) {
  const params = querystring.stringify({
    client_id: FLIPKART_CLIENT_ID,
    response_type: 'code',
    redirect_uri: FLIPKART_REDIRECT_URI,
    state,
  });
  return `${AUTH_URL}?${params}`;
}

async function exchangeCodeForToken(code) {
  const data = {
    grant_type: 'authorization_code',
    code,
    client_id: FLIPKART_CLIENT_ID,
    client_secret: FLIPKART_CLIENT_SECRET,
    redirect_uri: FLIPKART_REDIRECT_URI,
  };
  const res = await axios.post(TOKEN_URL, querystring.stringify(data), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return res.data;
}

module.exports = { getFlipkartAuthUrl, exchangeCodeForToken }; 