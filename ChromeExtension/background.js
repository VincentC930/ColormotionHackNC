chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ vPos: 300, fSize: 24, fColor: "#F3333F" });
  
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { hostSuffix: "youtube.com" }
            })
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
        }
      ]);
    });

    chrome.storage.local.set({enabled: false});

    chrome.action.setBadgeText({
        text: "off",
      });
  });