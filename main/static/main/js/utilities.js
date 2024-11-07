function xhrRequest(method='POST', url, csrfToken, successFunction, errorFunction, data) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrfToken);

    xhr.onload = function() {
        if (xhr.status === 200) {
            if (successFunction !== null) {
                successFunction(xhr);
            }
        } else {
            if (errorFunction !== null) {
                errorFunction();
            }
        }
    };

    xhr.send(JSON.stringify(data));
}

function getCSRFToken(doc) {
    let csrf = doc.cookie.toString();
    csrf = csrf.slice(csrf.indexOf('csrftoken='), csrf.length).split(';')[0].substring(10);
    return csrf
}

function removeItemsFromLocalStorage(items) {
    items.forEach((item) => {
        localStorage.removeItem(item);
    });
}