let barkActive = false;

chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'bark':
            if (!barkActive) {
                barkTitle();
                barkActive = true;
            } else {
                barkTitle();
                barkActive = false;
            }
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

function barkTitle() {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            tabTitle: tabs[0].title,
            barkActive: barkActive
        });
    });
}