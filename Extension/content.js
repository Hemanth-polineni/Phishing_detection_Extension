// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "phishingPrediction") {
//         const result = request.result;
//         const score = request.score;

//         const message = (result === "Phishing") 
//             ? `⚠️ Warning: This site may be a phishing website.\nSafety Score: ${score}%\nDo you still want to proceed?`
//             : `✅ This site appears safe.\nSafety Score: ${score}%\nProceed?`;

//         const userChoice = confirm(message);

//         if (!userChoice && result === "Phishing") {
//             window.location.href = "about:blank"; // or redirect to safe page
//         }
//     }
// });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "phishingPrediction") {
        const { result, score, url } = message;

        // Example action
        alert(`${url}\nPrediction: ${result}\nSafety Score: ${score}`);

        // Optional: you could inject a modal or banner here
    }
});
