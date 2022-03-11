// Notification body.
const notification = document.createElement("div");
notification.className = 'acho-notification';

// Notification icon.
const icon = document.createElement('img');
icon.src = chrome.runtime.getURL("images/icon32.png");
notification.appendChild(icon);

// Notification text.
const notificationText = document.createElement('p');
notification.appendChild(notificationText);

// Add to current page.
document.body.appendChild(notification);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log(sender);
    console.log(request);

    const notification = document.getElementsByClassName('acho-notification')[0];
    const notificationText = notification.getElementsByTagName('p')[0];

    notificationText.innerHTML = "You are at: " + request.tabTitle;

    notification.style.display = 'flex';
    
    console.log('test');

    let oldBackground;

    // print element cursor is over; add event listener to window
    window.addEventListener('mouseover', (e) => {
        let element = e.target;
        oldBackground = element.style.backgroundColor;
        element.style.backgroundColor = 'blue';
    });

    // remove border when not hovering over element
    window.addEventListener('mouseout', (e) => {
        let element = e.target;
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
        let element = e.target;
        let text = getVisibleText(element);
        text = reformatText(text);
        console.log(text);
        // copy text to clipboard
        navigator.clipboard.writeText(text).then(() => {
            alert("Text copied!");
        });
    });
    
    return true;
});