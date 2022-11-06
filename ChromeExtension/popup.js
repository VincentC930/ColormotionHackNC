
var enabled = false;
var checkbox = document.querySelector("input[name=checkbox]");

chrome.storage.local.get('enabled', data => {
    console.log(data.enabled)
    enabled = data.enabled;
    if(enabled){
        checkbox.checked = true;

        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            chrome.scripting.executeScript(
                {
                target: {tabId: tabs[0].id},
                files: ["script.js"]
                },
                () => {
                const error = chrome.runtime.lastError;
                if (error) "Error. Tab ID: " + tabs.id + ": " + JSON.stringify(error);
                }
                );
            });
    }
});

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
       console.log("hi", tabs[0].url);
       if (tabs[0].url.includes("youtube.com/watch")) {
            chrome.storage.local.set({'currentTab': 'youtube'});
        }
}); 


checkbox.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");

    chrome.storage.local.set({enabled: true});
    enabled = true;
    console.log("Check box changed: ", enabled)
    

    chrome.action.setBadgeText({
        text: "on",
    });

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript(
            {
            target: {tabId: tabs[0].id},
            files: ["script.js"]
            },
            () => {
            const error = chrome.runtime.lastError;
            if (error) "Error. Tab ID: " + tabs.id + ": " + JSON.stringify(error);
            }
            );
        });

  } else {
    console.log("Checkbox is not checked..");

    chrome.storage.local.set({enabled: false});
    enabled = false;
    console.log("Check box changed: ", enabled)

    chrome.action.setBadgeText({
        text: "off",
    });

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.scripting.executeScript(
            {
            target: {tabId: tabs[0].id},
            files: ["disablescript.js"]
            },
            () => {
            const error = chrome.runtime.lastError;
            if (error) "Error. Tab ID: " + tabs.id + ": " + JSON.stringify(error);
            }
            );
    });
  }
});