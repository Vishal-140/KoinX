import React, { useEffect, useRef, memo, useState } from 'react';

function TradingViewWidget() {
  const container = useRef(null);
  const [scriptAdded, setScriptAdded] = useState(false); // State to track script injection

  useEffect(() => {
    if (!container.current || scriptAdded) return; // Don't re-inject script if already added

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    const scriptContent = JSON.stringify({
      "autosize": true,
      "symbol": "CRYPTO:BTCUSD",
      "timezone": "Etc/UTC",
      "theme": "light",
      "style": "2",
      "locale": "en",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": true,
      "range": "5D",
      "save_image": false,
      "calendar": false,
      "hide_volume": true,
      "support_host": "https://www.tradingview.com"
    });

    script.innerHTML = scriptContent;
    container.current.appendChild(script);
    setScriptAdded(true); // Mark the script as added

    return () => {
      if (container.current && script.parentNode) {
        container.current.removeChild(script);
      }
    };
  }, [scriptAdded]); // Trigger only once when scriptAdded changes

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}></div>
  );
}

export default memo(TradingViewWidget);
