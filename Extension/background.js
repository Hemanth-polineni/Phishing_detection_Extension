chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: tab.url })
        })
        .then(response => response.json())
        .then(data => {
            chrome.tabs.sendMessage(tabId, {
                action: "phishingPrediction",
                result: data.prediction,
                score: data.safety_score,
                url: tab.url
            });
        })
        .catch(err => console.error("Fetch error:", err));
    }
});
