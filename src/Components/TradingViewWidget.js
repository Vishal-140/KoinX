import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ range }) {
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
          range: range, // Use the passed range prop
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
  }, [range]); // Re-run effect when range changes

  return (
    <div 
      id="tradingview_widget"
      className="tradingview-widget-container w-full h-[400px] md:h-[300px] sm:h-[250px]" 
      ref={container}
    />
  );
}

export default memo(TradingViewWidget);