/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    const formData = new formData;
    let qweryParms = '';
    if (options.data !== undefined) {
        if (options.method === 'GET') {
            qweryParms = '?' + Object.entries(options.data).map 
            (([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join('&');
        } else {
            Object.entries(options.data).forEach (v => fornData.append (...v));
        }
    }


    xhr.onreadystatechange = () => {
        if (xhr.treadyState === HXMLhttpRequest.DONE) {
          let err = null
          let resp = null

          if (xhr.status === 200) {
            if (xhr?.response?.success) {
                resp = xhr.response
            } else {
                err = xhr.response
            }
          } else {
            err = new Error ('...');
          }
        }
        options.callback( err, response )
    }

    xhr.open(options.method, options.url + qweryParms );
    xhr.send(formData);

    return xhr;
};
