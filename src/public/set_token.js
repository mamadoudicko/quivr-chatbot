// Send a message to the background script to get the token
chrome.runtime.sendMessage({ action: "getToken" });

// Receive the token from the background script and update the input field
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "sendToken" && message.token) {
    document.getElementById("removeTokenBtn").disabled = false;
  } else {
    // If no token is stored, disable the delete button
    document.getElementById("removeTokenBtn").disabled = true;
  }
});

document
  .getElementById("tokenForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit prevented");
    const token = document.getElementById("token").value;
    // Save the token to the local storage
    try {
      chrome.storage.local.set({ aized_token: token }, function () {
        console.log("Token saved successfully!");
        window.close();
      });
    } catch (e) {
      console.error({ e });
    }
  });

// Event listener for the removeTokenBtn
document
  .getElementById("removeTokenBtn")
  .addEventListener("click", function () {
    // Remove the token from the local storage
    chrome.storage.local.remove("aized_token", function () {
      alert("Token removed successfully!");
      document.getElementById("removeTokenBtn").disabled = true;
    });
  });
