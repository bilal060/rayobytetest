import { useEffect } from "react";
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-W35D5RC",
};

const FreshChat = () => {
  function initFreshChat() {
    if (window.fcWidget) {
      window.fcWidget.init({
        token: "58aaa246-2329-4367-a4b2-0a4d4622d31b",
        host: "https://sprious-org.freshchat.com",
        widgetUuid: "1dadd584-17e2-4a15-a8d0-6452cbcfe178",
      });
    }
  }
  function loadFreshChatScript() {
    var scriptId = "Freshchat-js-sdk";
    var existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      var script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.src = "https://sprious-org.freshchat.com/js/widget.js";
      script.onload = initFreshChat;
      script.onerror = function () {
        console.error("Error loading Freshchat script");
      };
      document.head.appendChild(script);
    } else {
      initFreshChat();
    }
  }
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);

    // Load Freshchat script
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadFreshChatScript);
    } else {
      loadFreshChatScript();
    }
  }, []);

  return null;
};

export default FreshChat;
