
export default function getInfoFromFipeTable(urlSend) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        resolve(xhr.response);
      }
    };
    xhr.onerror = () => { reject(xhr.statusText); };
    xhr.open('GET', urlSend, true);
    xhr.send();
  });
}
