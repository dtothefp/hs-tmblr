export default function(gulp, plugins, config, {data}) {
  // add fetch to Karma
  data.files.unshift('https://unpkg.com/whatwg-fetch@1.0.0/fetch.js');

  return {data};
}
