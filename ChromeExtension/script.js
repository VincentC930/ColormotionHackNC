var colors = {
    "neutral": "#abaaa9",
    "joy": "#ffe058",
    "surprise": "#f0a21a",
    "sadness": "#21a0a1",
    "anger": "#ce1a39",
    "fear": "#353b89",
};

changeSubtitlesStyle = () => {
    callback = () => {
        let subtitles = "";
        chrome.storage.local.get('enabled', enable => {
            chrome.storage.local.get('currentTab', data => {
                tab = data.currentTab;
                if (tab == 'youtube') {
                    subtitles = document.querySelector(".captions-text");
                    for (const span of subtitles.childNodes) {
                        async function query(data) {
                            const response = await fetch(
                                "https://api-inference.huggingface.co/models/michellejieli/emotion_text_classifier",
                                {
                                    headers: { Authorization: "Bearer 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" },
                                    method: "POST",
                                    body: JSON.stringify(data),
                                }
                            );
                            const result = await response.json();
                            return result;
                        }

                        query({ "inputs": span.childNodes[0].textContent }).then((response) => {
                            console.log("response ", response)
                            let color_res = colors[response[0][0]['label']];
                            span.childNodes[0].style.background = color_res;
                        });

                    }
                }

                if (subtitles) {
                    const firstChildContainer = subtitles.firstChild;
                }

                if (!enable.enabled) {
                    observer.disconnect();
                }
            });
        });
    };

    const observer = new MutationObserver(callback);
    observer.observe(document.body, {
        subtree: true,
        attributes: false,
        childList: true,
        characterData: true,
        characterDataOldValue: true
    });
};

changeSubtitlesStyle();

