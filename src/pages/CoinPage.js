import React from "react";
import About from "../Components/About";
import CradsPromo from "../Components/CradsPromo";
import Chart from "../Components/Chart";
import PageHolder from "../Components/PageHolder";
import PerformanceSection from "../Components/PerformanceSection";
import SentimentSection from "../Components/SentimentSection";
import ToggleSection from "../Components/ToggleSection";
import Tokenomics from "../Components/Tokenomics";
import TrendingCoins from "../Components/TrendingCoins";
import Team from "../Components/TeamCard";
import SuggestionSection from "../Components/SuggestionSection";

function CoinPage() {
  return (
    <div className="h-full w-screen bg-slate-200/40">
      <PageHolder />

      <div className="w-screen lg:flex">
        <div className="lg:w-8/12 lg:ml-14 mx-4">
          <Chart />
          <ToggleSection />
          <PerformanceSection />
          <SentimentSection />
          <About />
          <Tokenomics />
          <Team />
        </div>
        <div className="lg:w-4/12 lg:mr-14 mx-4">
          <CradsPromo />
          <TrendingCoins />
        </div>
      </div>
      <SuggestionSection />
    </div>
  );
}

export default CoinPage;
