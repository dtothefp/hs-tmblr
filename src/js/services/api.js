import {stringify} from 'query-string';
import jsonp from 'jsonp';
import isUndefined from 'lodash/isUndefined';

export default function({tag, blog}) {
  const urls = {
    blog: `http://api.tumblr.com/v2/blog/${blog}.tumblr.com/posts`,
    tagged: `http://api.tumblr.com/v2/tagged`
  };
  const options = {
    timeout: 3000
  };
  const query = stringify({
    api_key: 'u1pd7v2RaAFZzFGzH4CkSmaTfhAAKzel5jE7UD6b3vcDCnMs2f',
    limit: 12,
    tag
  });

  if (isUndefined(blog) && isUndefined(tag)) {
    return Promise.reject(new Error('You must supply a blog or tag'));
  }

  const url = blog ? urls.blog : urls.tagged;

  return new Promise((res, rej) => {
    jsonp(`${url}?${query}`, options, (err, data) => {
      if (err) return rej(err);

      res(data);
    });
  });
}
