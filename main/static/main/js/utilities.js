function xhrRequest(method= 'POST', url, data, csrfToken,
                    successFunction, errorFunction) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-CSRFToken', csrfToken);

    xhr.onload = function() {
        if (xhr.status === 200) {
            if (successFunction !== null) {
                successFunction(xhr);
            }
        } else {
            if (errorFunction !== null) {
                errorFunction(xhr);
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

function removeEmptyElements(array) {
    while (array.length > 0 && array[array.length - 1] === '') {
        array.pop();
    }

    let index = 0;
    while (index < array.length && array[index].trim() === '') {
        index++;
    }
    array = array.slice(index)
    return array;
}

function setCursorToEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(element);
    range.selectNodeContents(element);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
}