
/*
.isense-cc-window.cc-banner { font-family: "Times New Roman", Times, serif; }
*/
(function(w, d, u) {
  console.log('csmSupportTool.js');

  // Retrieve and parse the GDPR cache from localStorage
  const gdprCache = JSON.parse(localStorage.getItem('gdprCache'));

  // Create the Card element with id="csmSupportTool"
  const card = d.createElement('div');
  card.id = 'csmSupportTool';
  card.innerHTML = `
    <h2>Summary Info&nbsp;<button id="expandCardButton">Toggle width</button></h2>
    <p>Shop: ${w.Shopify.shop}</p>
    <p>Theme: ${w.Shopify.theme.name} (${w.Shopify.theme.id})</p>
    <hr>
    <p>GDPR version: ${gdprCache.version}</p>
    <p>Consentmo Bar Loaded: ${w.consentmoBarLoaded}</p>

    <h3>Information</h3>
    <details>
      <summary>GDPR Cache</summary>
      <pre id="gdprCachePre"></pre>
    </details>
    <details>
      <summary>Cookie Consent</summary>
      <pre id="cookieConsentPre"></pre>
    </details>
    <h3>Actions</h3>
    <button id="applyCssButton" title="Change the widget button color and background">Apply CSS</button>
    <button id="showCookieBarButton">Show Cookie Bar</button>
    <button id="showPreferencesPopup">Show Preferences</button>
  `;

  // Apply styles to the card element
  const style = d.createElement('style');
  style.innerHTML = `
    #csmSupportTool {
      font-family: Arial;
      font-size: 14px;
      line-height: 1.4;
      color: #333;
      background: #eff6ff;
      width: 360px;
      padding: 10px;
      border-radius: 8px;
      position: fixed;
      top: 10px;
      right: 10px;
      bottom: 10px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
      z-index: 10000;
      transition: width 0.3s;
    }

    #csmSupportTool *,
    #csmSupportTool *::before,
    #csmSupportTool *::after {
      box-sizing: border-box;
    }
    #csmSupportTool * {
      margin: 0;
    }
    #csmSupportTool * + * {
      margin-top: 8px;
    }

    #csmSupportTool.expanded {
      width: 80vw;
    }
    #csmSupportTool h2, #csmSupportTool h3 { color: #222; margin-bottom: 10px; }
    #csmSupportTool h2 { font-size: 1.7em; }
    #csmSupportTool h3 { font-size: 1.4em; margin-top:20px; }
    #csmSupportTool button {
      background: #fff;
      padding: 2px 10px;
      line-height: 1.4;
      border-radius: 5px;
      border: 1px solid #d8d8d8;
      outline: 0;
    }
    #csmSupportTool button:hover {
      background: #f2f3f4;
      border: 1px solid #bbb;
    }
    #csmSupportTool details {
      background: #fff;
      padding: 5px 0 5px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    #csmSupportTool summary {
      background: #f2f3f4;
      margin: -5px 0 -5px -10px;
      padding: 5px 10px;
    }
    #csmSupportTool pre {
      max-height: 30vh;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: auto;
    }
  `;
  d.head.appendChild(style);

  // Append the card to the body
  d.body.appendChild(card);

  // Function to recursively parse JSON strings
  function parseNestedJSON(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        try {
          const parsed = JSON.parse(obj[key]);
          obj[key] = parseNestedJSON(parsed);
        } catch (e) {
          // If parsing fails, keep the original string
        }
      }
    }
    return obj;
  }
  const parsedGdprCache = parseNestedJSON(gdprCache);

  // Populate GDPR Cache pre element
  d.getElementById('gdprCachePre').textContent = JSON.stringify(parsedGdprCache, null, 2);

  // Populate Cookie Consent pre element
  const cookieConsentPre = d.getElementById('cookieConsentPre');
  const cookiePatterns = [/^cookieconsent/, /^is_shopify_merchant/, /^receive-cookie-deprecation/, /^_shopify/];
  const cookies = document.cookie.split('; ').filter(cookie => cookiePatterns.some(pattern => pattern.test(cookie)));
  cookieConsentPre.textContent = cookies.join('\n');

  // Add event listeners to buttons
  d.getElementById('expandCardButton').addEventListener('click', function() {
    card.classList.toggle('expanded');
  });
  d.getElementById('applyCssButton').addEventListener('click', function() {
    // Apply CSS to the page
    var style = d.createElement('style');
    style.innerHTML = `
      .isense-reopen-widget-text {
        color: #fff;
        background: #d00;
      }
      .isense-cc-window.cc-banner {
        font-family: "Times New Roman", Times, serif;
      }
    `;
    d.head.appendChild(style);
    console.log('CSS applied');
  });

  d.getElementById('showCookieBarButton').addEventListener('click', function() {
    // Example script to listen for the "consentmoSignal" event and log to console
    d.addEventListener('consentmoSignal', function(event) {
      console.log('consentmoSignal event triggered', event);
    });
    console.log('Cookie Bar shown');
  });

  d.getElementById('showPreferencesPopup').addEventListener('click', function() {
    showPreferences();
  });

})(window, document);

/*
// Bookmarklet
javascript:(function(){
  var url = "//localhost:5173/csmSupportTool.js";
  var existingScript = document.querySelector('script[src^="'+url+'"]');
  var loadScript = function() {
    var n = document.createElement('script');
    n.setAttribute('language', 'JavaScript');
    n.setAttribute('src', url + '?rand=' + new Date().getTime());
    document.body.appendChild(n);
  };

  if (existingScript) {
    // Prevent double injection
    if (confirm('csmSupportTool already loaded.\nClick "OK" to reload the page.')) {
      location.reload();
    }
  } else if (document.readyState === 'complete') {
    // Document fully loaded
    loadScript();
  } else {
    // Document NOT fully loaded, wait until all assets and script is loaded
    window.addEventListener('load', loadScript);
  }
})();

//Minified -- ChatGPT
javascript:(function(){var url="//localhost:5173/csmSupportTool.js";var existingScript=document.querySelector('script[src^="'+url+'"]');var loadScript=function(){var n=document.createElement('script');n.setAttribute('language','JavaScript');n.setAttribute('src',url+'?rand='+new Date().getTime());document.body.appendChild(n);};if(existingScript){if(confirm('csmSupportTool already loaded.\nClick "OK" to reload the page.')){location.reload();}}else if(document.readyState==='complete'){loadScript();}else{window.addEventListener('load',loadScript);}})();
*/
