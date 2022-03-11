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

    let oldBorder;

    // print element cursor is over; add event listener to window
    window.addEventListener('mouseover', (e) => {
        let element = e.target;
        oldBorder = element.style.border;
        element.style.border = '1px solid red';
        // element.classList.add('hover');
        // console.log(element);
    });

    // remove border when not hovering over element
    window.addEventListener('mouseout', (e) => {
        let element = e.target;
        element.style.border = oldBorder;
        // element.classList.remove('hover');
        // console.log(element);
    });

    // log element on click
    window.addEventListener('click', (e) => {
        let element = e.target;
        console.log(element);
    });

    // setTimeout(function () {
    //     notification.style.display = 'none';
    // }, 5000);
    
    return true;
});