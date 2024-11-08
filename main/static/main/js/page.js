document.addEventListener('DOMContentLoaded', () => {
    const editor = document.querySelector('.editor')
    const fields = document.querySelectorAll('.field')
    const isPage = window.location.href.match(/\/page\//)
    const pageID = window.location.href.match(/\/page\/(\d+)/)
    const converter = new showdown.Converter()

    function main() {
        if (isPage) {
            loadPage(converter, pageID)
            autoSavePage(converter, pageID, fields)
            addAndDeleteField(converter, fields, editor)
            formattingField(converter)
        }
    }

    function loadPage(converter, pageID) {
        xhrRequest('GET', `/api/pages/${pageID[1]}`, {}, getCSRFToken(document),
            success, function () {})
        function success(xhr) {
            const fields = JSON.parse(xhr.response)['content']['fields']
            if (fields.length > 0 && editor.children[0].innerHTML.trim() === '') {
                editor.removeChild(editor.children[0])
            }
            fields.forEach((field) => {
                const new_field = document.createElement('div')
                new_field.classList.add('field')
                new_field.contentEditable = 'true'
                new_field.innerHTML = converter.makeHtml(field)
                editor.appendChild(new_field)
            })
        }
    }

    function autoSavePage(converter, pageID) {
        if (pageID && pageID[1]) {
            setInterval(() => {
                const data = {
                    title: document.head.querySelector('title').innerHTML,
                    content: {
                        fields: savePage(converter, document.querySelectorAll('.field'))
                    }
                }
                xhrRequest('PUT', `/api/pages/${pageID[1]}/`, data, getCSRFToken(document),
                    function() {}, function () {})
            }, 5000)
        }
    }

    function savePage(converter, fields) {
        let data = []
        fields.forEach((field) => {
            data.push(converter.makeMd(field.innerHTML))
        })
        return removeEmptyElements(data)
    }

    function addAndDeleteField(converter, fields, editor) {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const lastField = editor.lastElementChild
                if (lastField.innerHTML.trim() === '') {
                    editor.removeChild(lastField)
                }

                event.target.innerHTML = converter.makeHtml(event.target.innerHTML);
                event.preventDefault();

                const newDiv = document.createElement('div');
                newDiv.classList.add('field');
                newDiv.contentEditable = 'true';

                if (fields.length > 0) {
                    document.activeElement.insertAdjacentElement('afterend', newDiv);
                }

                newDiv.focus();
            }

            if (event.key === 'Backspace') {
                if (event.target.innerHTML.trim() === '' && editor.children.length > 1) {
                    const previousElement = event.target.previousElementSibling;
                    editor.removeChild(event.target);
                    event.preventDefault();
                    previousElement.focus();
                    setCursorToEnd(previousElement);
                }
            }
        });
    }

    function formattingField(converter) {
        document.addEventListener('focusin', (event) => {
            const isInsideField = event.target.closest('.field');
            const isInnerHTMLEmpty = event.target.innerHTML.trim() === '';
            const isLink = event.target.querySelector('a');
            const isImage = event.target.querySelector('img');
            if (isInsideField && !isInnerHTMLEmpty) {
                if (isLink) {
                    event.target.innerHTML = `[${isLink.innerHTML}](${isLink.href})`
                } else if (isImage) {
                    event.target.innerHTML = `![${isImage.alt}](${isImage.src})`
                } else {
                    event.target.innerHTML = converter.makeMd(isInsideField.innerHTML);
                }
            }
        })
        document.addEventListener('focusout', (event) => {
            const isInsideField = event.target.closest('.field');
            const isInnerHTMLEmpty = event.target.innerHTML.trim() === '';
            if (isInsideField && !isInnerHTMLEmpty) {
                isInsideField.innerHTML = converter.makeHtml(isInsideField.innerHTML);
                const isLink = isInsideField.querySelector('a')
                if (isLink) {
                    isInsideField.contentEditable = 'false'
                }
            }
        })
    }

    main()
})