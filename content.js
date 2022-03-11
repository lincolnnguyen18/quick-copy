// Notification body.
// const notification = document.createElement("div");
// notification.className = 'acho-notification';

// Notification text.
// const notificationText = document.createElement('p');
// notification.appendChild(notificationText);

// Add to current page.
// document.body.appendChild(notification);

let active = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    active = true;

    console.log(sender);
    console.log(request);

    // const notification = document.getElementsByClassName('acho-notification')[0];
    // const notificationText = notification.getElementsByTagName('p')[0];

    // notificationText.innerHTML = "You are at: " + request.tabTitle;

    // notification.style.display = 'flex';
    
    console.log('test');

    let oldBackground, currentHover;

    // print element cursor is over; add event listener to window
    window.addEventListener('mouseover', (e) => {
        if (!active) return;
        let element = e.target;
        currentHover = element;
        oldBackground = element.style.backgroundColor;
        element.style.backgroundColor = 'blue';
    });

    // remove border when not hovering over element
    window.addEventListener('mouseout', (e) => {
        if (!active) return;
        let element = e.target;
        currentHover = null;
        element.style.backgroundColor = oldBackground;
    });

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

    // log element on click
    window.addEventListener('click', (e) => {
        if (!active) return;
        let element = e.target;
        let text = getVisibleText(element);
        text = reformatText(text);
        console.log(text);
        // copy text to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert("Text copied!");
            active = false;
        });
    });

    // listen for escape key
    window.addEventListener('keydown', (e) => {
        if (e.key == 'Escape') {
            if (active) {
                active = false;
                if (currentHover)
                    currentHover.style.backgroundColor = oldBackground;
            } else {
                active = true;
            }
        }
    });
    
    return true;
});