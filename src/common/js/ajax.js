import {formatQuery} from './jsonp';

export default function ajax (url, method, data) {
  return new Promise((resolve, reject) => {
    url = url + formatQuery(data);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (((xhr.status >= 200) && (xhr.status < 300)) || (xhr.status === 304)) {
          let response = {
            code: 0,
            data: xhr.responseText
          }
          resolve(xhr.responseText)
        } else {
          reject(new Error('get data failed, code: ' + xhr.status));
        }
      }
    };
    xhr.open(method, url, true);
    xhr.send();
  })
}
