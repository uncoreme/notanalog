document.addEventListener('DOMContentLoaded', () => {
    const contents = document.querySelectorAll('.field');
    const converter = new showdown.Converter();

    xhrRequest('GET', `/api/pages/${pageID[1]}/`, getCSRFToken(document),
        success, function () {},
        {})
    function success(xhr) {
        const fields = JSON.parse(xhr.response)['content']['fields']
        loadPage(fields)
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const lastField = document.querySelector('.editor').lastElementChild
            if (lastField.innerHTML.trim() === '') {
                document.querySelector('.editor').removeChild(lastField)
            }

            event.target.innerHTML = converter.makeHtml(event.target.innerHTML);
            event.preventDefault();

            const newDiv = document.createElement('div');
            newDiv.classList.add('field');
            newDiv.contentEditable = 'true';

            if (contents.length > 0) {
                contents[0].parentElement.appendChild(newDiv);
            }

            newDiv.focus();
        }
        if (event.key === 'Backspace') {
            if (event.target.innerHTML.trim() === '' && document.querySelector('.editor').children.length > 1) {
                const previousElement = event.target.previousElementSibling;
                document.querySelector('.editor').removeChild(event.target);
                event.preventDefault();
                previousElement.focus();
                setCursorToEnd(previousElement);
            }
        }
    });

    function setCursorToEnd(element) {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(element); // Выбираем содержимое элемента
        range.collapse(false); // Сжимаем диапазон, устанавливая курсор в конец

        selection.removeAllRanges(); // Удаляем все выделения
        selection.addRange(range); // Добавляем новый диапазон с курсором
    }

    document.addEventListener('focusin', (event) => {
        const isInsideField = event.target.closest('.field');
        const isInnerHTMLEmpty = event.target.innerHTML.trim() === '';
        const isLink = event.target.querySelector('a');
        if ((isInsideField && !isInnerHTMLEmpty) && !isLink) {
            event.target.innerHTML = converter.makeMd(isInsideField.innerHTML);
        } else if (isLink) {
            event.target.innerHTML = `[${isLink.innerHTML}](${isLink.href})`;
        }
    })
    document.addEventListener('focusout', (event) => {
        const isInsideField = event.target.closest('.field');
        const isInnerHTMLEmpty = event.target.innerHTML.trim() === '';
        if (isInsideField && !isInnerHTMLEmpty) {
            isInsideField.innerHTML = converter.makeHtml(isInsideField.innerHTML);
        }
    })
});