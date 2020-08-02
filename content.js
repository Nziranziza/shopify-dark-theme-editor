chrome.runtime.onMessage.addListener(function (request) {
 toggleTheme(request.themeColor);
});

const toggleTheme = function (color) {
  const toggleButton = document.querySelector(
    `[data-template-editor-toggle="${color}"]`
  );
  const zoomButton = document.querySelector(
    ".template-editor-tab-bar__action-icon-button"
  );
  if (zoomButton && toggleButton) {
    zoomButton.addEventListener("click", () => toggleButton.click());
  }
  if(toggleButton) {
    toggleButton.click();
  }
};

window.onload = function () {
  chrome.storage.sync.get(["shopify-theme-color"], (result) => {
    if (result["shopify-theme-color"] === "dark") {
      toggleTheme("dark");
    } else {
      toggleTheme("light");
    }
  });
};
