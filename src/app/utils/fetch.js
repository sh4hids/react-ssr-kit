import isomorphicFetch from 'isomorphic-fetch';

const getJSON = async function(response) {
  if (response.status === 204) return '';
  try {
    const data = await response.json(); // Parse it as text
    return data;
  } catch (err) {
    return err;
  }
};

const parseStatus = function(status, res) {
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      res.then(response => resolve(response));
    } else {
      res.then(response => reject({ status, message: response.message }));
    }
  });
};

const requestHeaders = function(token, type) {
  if (type && type === 'multipart') {
    return {
      Authorization: token ? `${token}` : '',
    };
  }

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token ? `${token}` : '',
  };
};

const fetch = async ({ url, method, body, type, token }) => {
  const options = {
    method,
    headers: requestHeaders(token, type),
    body:
      method !== 'GET'
        ? type !== 'multipart'
          ? JSON.stringify(body)
          : body
        : null,
  };
  const res = await isomorphicFetch(url, options);

  return parseStatus(res.status, getJSON(res));
};

export default fetch;
