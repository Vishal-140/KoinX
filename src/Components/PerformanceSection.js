import React, { useState, useEffect } from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

function PerformanceSection() {
  const [coinData, setCoinData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default values
  const defaultData = {
    market_data: {
      current_price: { usd: 94362.00 },
      low_24h: { usd: 92276.00 },
      high_24h: { usd: 95799.00 },
      low_52w: { usd: 16930.22 },
      high_52w: { usd: 49743.83 },
      low_7d: { usd: 16382.07 },
      high_7d: { usd: 16874.12 },
      total_volume: { usd: 28545783454 },
      market_cap: { usd: 324587923454 },
      market_cap_percentage: 38.343,
      ath: { usd: 69044.77 },
      atl: { usd: 67.81 },
      ath_change_percentage: { usd: -75.6 },
      atl_change_percentage: { usd: 24862.3 },
      ath_date: { usd: "2021-11-10T14:24:11.849Z" },
      atl_date: { usd: "2013-07-05T14:24:11.849Z" }
    },
    market_cap_rank: 1
  };

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/bitcoin?x_cg_api_key=CG-a6HRg2p3GnpvsavHSF6pRcQQ'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setCoinData(data);
      } catch (err) {
        setError(err.message);
        setCoinData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  const calculatePosition = (low, high, current) => {
    const range = high - low;
    const position = ((current - low) / range) * 100;
    return Math.min(Math.max(position, 0), 100);
  };

  const data = loading ? defaultData : (coinData || defaultData);

  return (
    <div className="bg-white mt-5 rounded-lg lg:p-6 p-2 h-max">
      <div>
        <div className="text-2xl flex font-semibold text-[#0F1629]">Performance</div>
        <div className="py-4 mt-2">
          <div className="flex justify-between">
            <div className="text-start">
              <div className="text-sm text-[#44475B] font-normal p-1">
                Today's Low
              </div>
              <div className="text-[#44475B] text-lg font-medium p-1">
                ${data.market_data.low_24h.usd.toLocaleString()}
              </div>
            </div>
            <div className="w-[500px] h-2 mx-4 relative">
              <div className="bg-gradient-to-r from-red-500 via-orange-300  to-green-500 h-full rounded-2xl"></div>
              <div className="absolute w-full" style={{ top: '0' }}>
                <div style={{ 
                  position: 'absolute', 
                  left: `${calculatePosition(
                    data.market_data.low_24h.usd,
                    data.market_data.high_24h.usd,
                    data.market_data.current_price.usd
                  )}%`,
                  transform: 'translateX(-50%)',
                  marginTop: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <svg viewBox="0 0 100 100" className="lg:w-3 w-2 fill-current text-black">
                    <polygon points="0,100 50,0 100,100" />
                  </svg>
                <span className="text-[#44475B] text-sm font-normal mt-1">
                  ${data.market_data.current_price.usd.toLocaleString()}
                </span>
              </div>
            </div>
            </div>
            <div className="text-end">
              <div className="text-sm text-[#44475B] font-normal p-1">
                Today's High
              </div>
              <div className="text-[#44475B] text-lg font-medium p-1">
                ${data.market_data.high_24h.usd.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="text-start">
              <div className="text-sm text-[#44475B] font-normal p-1">
                52W Low
              </div>
              <div className="text-[#44475B] text-lg font-medium p-1">
                ${data.market_data.low_52w.usd.toLocaleString()}
              </div>
            </div>
            <div className="w-[500px] h-2 mx-4">
              <div className="bg-gradient-to-r from-red-500 via-orange-300 to-green-500 h-full rounded-2xl mt-7"></div>
            </div>
            <div className="text-end">
              <div className="text-sm text-[#44475B] font-normal p-1">
                52W High
              </div>
              <div className="text-[#44475B] text-lg font-medium p-1">
                ${data.market_data.high_52w.usd.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <div className="text-[#44475B] font-semibold text-xl">
              Fundamentals
            </div>
            <div className="">
              <IoMdInformationCircle className="text-[#ABB9BF] text-lg ml-2" />
            </div>
          </div>
          <div className="lg:flex mb-8">
            <div className="lg:w-1/2 lg:mr-10 mt-3">
              <div className="flex justify-between py-5 border-b-2 border-[#D3E0E6]">
                <div className="text-[#768396] text-sm font-semibold">
                  Bitcoin Price
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4">
                  ${data.market_data.current_price.usd.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between py-5 border-b-2 border-[#D3E0E6]">
                <div className="text-[#768396] text-sm font-semibold">
                  24h Low / 24h High
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4">
                  ${data.market_data.low_24h.usd.toLocaleString()} / ${data.market_data.high_24h.usd.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between py-5 border-b-2 border-[#D3E0E6]">
                <div className="text-[#768396] text-sm font-semibold">
                  7d Low / 7d High
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4">
                  ${data.market_data.low_7d.usd.toLocaleString()} / ${data.market_data.high_7d.usd.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between py-5 border-b-2 border-[#D3E0E6]">
                <div className="text-[#768396] text-sm font-semibold">
                  Trading Volume
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4">
                  ${data.market_data.total_volume.usd.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between py-5 border-b-2 border-[#D3E0E6]">
                <div className="text-[#768396] text-sm font-semibold">
                  Market Cap Rank
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4">
                  #{data.market_cap_rank}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:ml-10 lg:mt-3">
              <div className="flex justify-between py-5 border-b-2 border-[#D3E0E6]">
                <div className="text-[#768396] text-sm font-semibold">
                  Market Cap
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4">
                  ${data.market_data.market_cap.usd.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between py-5 border-b-2 border-[#D3E0E6]">
                <div className="text-[#768396] text-sm font-semibold">
                  Market Cap Dominance
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4">
                  {data.market_data.market_cap_percentage}%
                </div>
              </div>
              <div className="flex justify-between py-5 border-b-2 border-[#D3E0E6]">
                <div className="text-[#768396] text-sm font-semibold">
                  Volume / Market Cap
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4">
                  {(data.market_data.total_volume.usd / data.market_data.market_cap.usd).toFixed(4)}
                </div>
              </div>
              <div className="flex justify-between py-3 border-b-2 border-[#D3E0E6] items-center">
                <div className="text-[#768396] text-sm font-semibold">
                  All-Time High
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4 -p-2">
                  <div className="text-end ">
                    ${data.market_data.ath.usd.toLocaleString()} 
                    <span className="ml-2 text-red-500">
                      {data.market_data.ath_change_percentage.usd.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs font-normal">
                    {new Date(data.market_data.ath_date.usd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="flex justify-between py-3 border-b-2 border-[#D3E0E6] items-center">
                <div className="text-[#768396] text-sm font-semibold">
                  All-Time Low
                </div>
                <div className="text-[#111827] text-sm font-semibold mr-4 -p-2">
                  <div className="text-end">
                    ${data.market_data.atl.usd.toLocaleString()} 
                    <span className="ml-2 text-green-500">
                      {data.market_data.atl_change_percentage.usd.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs font-normal">
                    {new Date(data.market_data.atl_date.usd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  );
}

export default PerformanceSection;