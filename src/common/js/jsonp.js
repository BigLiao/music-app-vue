import originJSONP from 'jsonp'

export function jsonp (url, data, option) {
  return new Promise((resolve, reject) => {
    url = url + formatQuery(data);
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function formatQuery (data) {
  var query = '';
  for (var i in data) {
    query += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
  }
  return query ? '?' + query.slice(1) : '';
}
