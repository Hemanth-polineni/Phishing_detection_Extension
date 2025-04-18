document.addEventListener("DOMContentLoaded", () => {
    const radios = document.getElementsByName("toggle");
    const status = document.getElementById("status");
  
    // Load saved toggle state
    chrome.storage.sync.get("phishingToggle", (data) => {
      if (data.phishingToggle === "on") {
        radios[0].checked = true;
        status.textContent = "Extension is Active";
      } else {
        radios[1].checked = true;
        status.textContent = "Extension is Inactive";
      }
    });
  
    // Save toggle state
    radios.forEach(radio => {
      radio.addEventListener("change", () => {
        const state = radio.value;
        chrome.storage.sync.set({ phishingToggle: state });
        status.textContent = `Extension is ${state === "on" ? "Active" : "Inactive"}`;
      });
    });
  });
  