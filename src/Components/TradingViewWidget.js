import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      if (window.TradingView && container.current) {
        new window.TradingView.widget({
          container_id: container.current.id,
          autosize: true,
          symbol: "CRYPTO:BTCUSD",
          timezone: "Etc/UTC",
          theme: "light",
          style: "2",
          locale: "en",
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_legend: true,
          range: "5D",
          save_image: false,
          calendar: false,
          hide_volume: true,
          support_host: "https://www.tradingview.com"
        });
      }
    };

    container.current.appendChild(script);

    return () => {
      if (container.current && script.parentNode) {
        container.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      id="tradingview_widget"
      className="tradingview-widget-container" 
      ref={container}
      style={{ height: "500px", width: "100%" }}
    />
  );
}

export default memo(TradingViewWidget);