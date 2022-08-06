/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    const formData = new FormData();
    let queryParams = '';
    if (options.data) {
        if (options.method === 'GET') {
            queryParams = '?' + Object.entries(options.data).map 
            (([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&');
        } else {
            Object.entries(options.data).forEach (v => formData.append(...v));
        }
    }


    xhr.onreadystatechange = () => {
        let err = null;
        let resp = null;
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            if (xhr?.response?.success) {
                resp = xhr.response;
            } else {
                err = xhr.response;
            }
          } else {
            err = new Error ('...');
          }
        }
        if (options.callback){
            options.callback(err, resp);
        }
        
    }

    xhr.open(options.method, options.url + queryParams);
    xhr.send(formData);
    return xhr;
};