export class HttpService {

    _errorHandler(res) {
        if(!res.ok) throw new Error(res.statusText);
        return res;
    }

    get(url) {
        
        // Using Fetch API from ES2016
        // @see: https://braziljs.org/blog/fetch-api-e-o-javascript/
        return fetch(url)
            // Raw response to JSON
            .then(res => this._errorHandler(res))
            .then(res => res.json());

        // Using Ajax object XMLHttpRequest
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open('GET', url);
        //     xhr.onreadystatechange = () => {
        //         if(xhr.readyState == 4) {
        //             if(xhr.status == 200) {
        //                 resolve(JSON.parse(xhr.responseText));
        //             } else {
        //                 console.log(xhr.responseText);
        //                 reject(xhr.responseText);
        //             }
        //         }
        //     }
        //     xhr.send();
        // });
    }

    post(url, data) {

        // Using Fetch API from ES2016
        return fetch(url, {
            headers: {'Content-type': 'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        })
        // Raw response to JSON
        .then(res => this._errorHandler(res));

        // Using Ajax object XMLHttpRequest
        // return new Promise((resolve, reject) => {
        //     let xhr = new XMLHttpRequest();
        //     xhr.open("POST", url, true);
        //     xhr.setRequestHeader("Content-type", "application/json");
        //     xhr.onreadystatechange = () => {
        //         if (xhr.readyState == 4) {
        //             if (xhr.status == 200) {
        //                 resolve(JSON.parse(xhr.responseText));
        //             } else {
        //                 reject(xhr.responseText);
        //             }
        //         }
        //     };
        //     // JSON.stringifly to convert an object in a JSON-format string
        //     xhr.send(JSON.stringify(data));
        // });
    }

}