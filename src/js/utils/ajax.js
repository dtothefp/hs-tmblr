import join from './join';

/**
 * Light wrapper around `fetch` for CRUD
 * @param {String} url
 * @param {String} opts.method
 * @param {Object} opts.headers
 * @param {Object} opts.body data to be passed to POST/UPDATE/DELETE
 */
export default function(url, opts = {}) {
  const req = join(process.env.API, url);
  const {method = 'get', body} = opts;
  const headers = opts.headers || {
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  };
  let prom;

  switch (method) {
    case 'post':
    /* intentional fall through */
    case 'update':
      prom = fetch(req, {
        method,
        headers,
        body: JSON.stringify(body)
      });
      break;
    case 'delete':
    /* intentional fall through */
    case 'get':
    default:
      prom = fetch(req, {method});
      break;
  }

  return prom.then(data => data.json());
}
