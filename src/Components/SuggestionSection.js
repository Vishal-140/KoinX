import { useState, useEffect } from "react";
import axios from "axios";

function SuggestionSection() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/search/trending");
        setCryptoData(response.data.coins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCryptoData();
  }, []);

  const renderCryptoCards = (data) => {
    return data.map((crypto, index) => (
      <CryptoCard key={index} cryptoData={crypto.item} />
    ));
  };

  return (
    <div id="suggestion" className="bg-white h-max mt-10 lg:p-14 p-8">
      <div>
        <SectionTitle title="You May Also Like" />
        <div className="mt-4 flex justify-between overflow-x-scroll overflow-auto">
          {renderCryptoCards(cryptoData.slice(0, 5))}
        </div>

        <SectionTitle title="Trending Coins" />
        <div className="mt-4 flex justify-between overflow-x-auto">
          {renderCryptoCards(cryptoData.slice(1, 6))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="text-[#202020] flex text-2xl font-semibold">
      {title}
    </div>
  );
}

function CryptoCard({ cryptoData }) {
  const { name, large, data, sparkline } = cryptoData;

  const priceChange = data.price_change_percentage_24h.usd;
  const priceClass = priceChange > 0 ? "green" : "red";
  const bgColor = priceChange > 0 ? "#0AB27D" : "#FF0000";

  return (
    <div className="lg:w-[300px] rounded-2xl p-5 border-2 my-2 mr-2">
      <div className="flex items-center space-x-2">
        <img
          src={large}
          alt={name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-[16px] font-normal">{name}</span>
        <span
          className={`text-${priceClass}-500 bg-${priceClass}-500/10 text-xs font-normal pr-10`}
        >
          {priceChange.toFixed(2)}%
        </span>
      </div>
      <div className="text-xl text-[#171717] font-medium mt-2">
        {data.price}
      </div>
      <img
        src={sparkline || "https://www.coingecko.com/coins/33566/sparkline.svg"}
        alt={name || "Crypto Sparkline"}
        className="w-full h-20"
      />
    </div>
  );
}

export default SuggestionSection;
