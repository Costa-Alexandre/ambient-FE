import { serverBaseUrl } from './config';

const getInternalToken = async (accessToken) => {
  const response = await fetch(`${serverBaseUrl}/api/spotify/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
    }),
  });
  const { internalJWT } = await response.json();
  return internalJWT;
};

module.exports = {
  getInternalToken,
};
