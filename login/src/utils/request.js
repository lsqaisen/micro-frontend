import fetch from 'dva/fetch';

function ab2str(buf) {
    return new Promise((resolve, reject) => {
        let b = new Blob([buf], {
            type: 'text/plain'
        });
        //将Blob 对象转换成字符串
        var reader = new FileReader();
        reader.readAsText(b, 'utf-8');
        reader.onload = function (e) {
            try {
                resolve(JSON.parse(reader.result))
            } catch (error) {
                resolve(reader.result)
            }
        }
    })
}

async function parseJSON(response) {
    const X_Total_Count = response.headers.get('X-Total-Count');
    let buf = await response.arrayBuffer();
    if (X_Total_Count !== null && X_Total_Count !== undefined) {
        return {
            list: await ab2str(buf),
            total: X_Total_Count,
        };
    }
    return ab2str(buf);
}

function errorParse(response) {
    return new Promise(async (resolve, reject) => {
        let buf = await response.arrayBuffer();
        let data = await ab2str(buf);
        resolve(typeof data === 'object' ? data.error || JSON.stringify(data) : data)
    })
}

async function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    let error = await errorParse(response);
    if (!error) {
        error = response.statusText;
    }
    throw error;
}

export default function request(url, options, upload = false) {
    const defaultOptions = {
        credentials: 'include',
        mode: 'cors',
    };
    const newOptions = { ...defaultOptions, ...options };
    if ((newOptions.method || '').toLocaleUpperCase() === 'POST' ||
        (newOptions.method || '').toLocaleUpperCase() === 'PUT' ||
        (newOptions.method || '').toLocaleUpperCase() === 'DELETE'
    ) {
        if (!!upload) {
            newOptions.headers = {
                ...newOptions.headers,
            };
        } else {
            newOptions.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8;',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        }
    }

    return fetch(`${url}`, newOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({ data }))
        .catch((err) => {
            return { err };
        })
}
