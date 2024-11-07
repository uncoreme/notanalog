const pageID = window.location.href.match(/\/page\/(\d+)/);
if (pageID && pageID[1]) {
    setInterval(() => {
        const data = {
            content: {
                fields: savePage()
            }
        }
        xhrRequest('PUT', `/api/pages/${pageID[1]}/`, getCSRFToken(document),
            function() {}, function () {},
            data)
    }, 5000)
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

function savePage() {
    const converter = new showdown.Converter()
    const fields = document.querySelectorAll('.field')
    let data = []
    fields.forEach((field) => {
        data.push(converter.makeMd(field.innerHTML))
    })
    return removeEmptyElements(data)
}

function loadPage(data) {
    if (data.length > 1) {
        const editor = document.querySelector('.editor')
        editor.removeChild(editor.children[0])
        const converter = new showdown.Converter()
        data.forEach((row) => {
            const new_field = document.createElement('div')
            new_field.classList.add('field')
            new_field.contentEditable = 'true'
            new_field.innerHTML = converter.makeHtml(row)
            editor.appendChild(new_field)
        })
    }
}