const axios = require('axios');
const querystring = require('querystring');

const AMAZON_CLIENT_ID = process.env.AMAZON_CLIENT_ID;
const AMAZON_CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET;
const AMAZON_REDIRECT_URI = process.env.AMAZON_REDIRECT_URI;

const AUTH_URL = 'https://sellercentral.amazon.com/apps/authorize/consent';
const TOKEN_URL = 'https://api.amazon.com/auth/o2/token';

function getAmazonAuthUrl(state) {
  const params = querystring.stringify({
    client_id: AMAZON_CLIENT_ID,
    scope: 'sellingpartnerapi::notifications sellingpartnerapi::orders sellingpartnerapi::listings',
    response_type: 'code',
    redirect_uri: AMAZON_REDIRECT_URI,
    state,
  });
  return `${AUTH_URL}?${params}`;
}

async function exchangeCodeForToken(code) {
  const data = {
    grant_type: 'authorization_code',
    code,
    client_id: AMAZON_CLIENT_ID,
    client_secret: AMAZON_CLIENT_SECRET,
    redirect_uri: AMAZON_REDIRECT_URI,
  };
  const res = await axios.post(TOKEN_URL, querystring.stringify(data), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return res.data;
}

module.exports = { getAmazonAuthUrl, exchangeCodeForToken }; 