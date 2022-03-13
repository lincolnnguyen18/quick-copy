let oldBackground, currentEl;

function getVisibleText(element) {
    window.getSelection().removeAllRanges();
    
    let range = document.createRange();
    range.selectNode(element);
    window.getSelection().addRange(range);
    
    let visibleText = window.getSelection().toString().trim();
    window.getSelection().removeAllRanges();
    
    return visibleText;
}

const reformatText = (text) => {
    // replace all 1 or more newlines with 1 newline
    text = text.replace(/\n{2,}/g, '\n');
    // remove all leading and trailing whitespace from each line
    let newtext = ""
    text.split('\n').forEach((line) => {
        newtext += line.trim() + '\n';
    });
    return newtext
}

const mouseoverEvent = (e) => {
    let element = e.target;
    currentEl = element;
    oldBackground = element.style.backgroundColor;
    element.style.backgroundColor = 'blue';
}

const mouseoutEvent = (e) => {
    let element = e.target;
    element.style.backgroundColor = oldBackground;
    currentEl = null;
}

const clickEvent = (e) => {
    let element = e.target;
    let text = getVisibleText(element);
    text = reformatText(text);
    console.log(text);
    // copy text to clipboard
    navigator.clipboard.writeText(text).then(() => {
        // alert("Text copied!");
        // make background color of element gray for a second
        element.style.backgroundColor = 'gray';
        setTimeout(() => {
            element.style.backgroundColor = oldBackground;
        }, 1000);
    });
}

const preventDefault = (e) => {
    e.preventDefault();
}

function listenerFunction(request, sender, sendResponse) {
    console.log(request);
    if (!request.barkActive) {
        // chrome.runtime.onMessage.removeListener(listenerFunction);
        window.removeEventListener('mouseover', mouseoverEvent);
        window.removeEventListener('mouseout', mouseoutEvent);
        window.removeEventListener('click', clickEvent);
        if (currentEl) {
            currentEl.style.backgroundColor = oldBackground;
        }
        // get all links on page
        let links_a = document.getElementsByTagName('a');
        // get all elements with style cursor = pointer
        let links_b = document.querySelectorAll('[style*="cursor: pointer"]');
        // concatenate both arrays
        let links = [...links_a, ...links_b];
        // reenable all links
        for (let i = 0; i < links.length; i++) {
            links[i].style.pointerEvents = 'auto';
            // links[i].removeEventListener('click', preventDefault);
        }
        return;
    }

    // disable all links
    // get all links on page
    let links_a = document.getElementsByTagName('a');
    // get all elements with style cursor = pointer
    let links_b = document.querySelectorAll('[style*="cursor: pointer"]');
    // concatenate both arrays
    let links = [...links_a, ...links_b];
    for (let i = 0; i < links.length; i++) {
        links[i].style.pointerEvents = 'none';
        // prevent onclick default
        // links[i].addEventListener('click', preventDefault);
    }

    // print element cursor is over; add event listener to window
    window.addEventListener('mouseover', mouseoverEvent);

    // remove border when not hovering over element
    window.addEventListener('mouseout', mouseoutEvent);

    // log element on click
    window.addEventListener('click', clickEvent);
    
    return true;
}
chrome.runtime.onMessage.addListener(listenerFunction);