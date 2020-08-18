const toggleTheme= function (themeColor) {
  chrome.storage.sync.set({ 'shopify-theme-color': themeColor });

  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id,{ 'themeColor': themeColor });
    });
  });
}

const slider = {

  sliderElement: document.querySelector('#slider-btn'),

  init: function() {
    this.sliderElement
      .addEventListener("change", onChange, false);

     chrome.storage.sync.get(['shopify-theme-color'], (result) => {
       if(result['shopify-theme-color'] === 'dark') {
         this.sliderElement.checked = true;
       } else {
        this.sliderElement.checked = false;
       }
     });

    function onChange({ target }) {
      if(target.checked) {
         console.log('checked');
        toggleTheme('dark');
      } else {
        console.log('unchecked');
        toggleTheme('light');
      }
    }
  },
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    slider.init();
  },
  false
);
