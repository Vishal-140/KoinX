import React, { useState } from 'react';

function ToggleSection() {
  const [activeLink, setActiveLink] = useState('overview');

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div>
      <div className="flex space-x-7 lg:space-x-10 text-sm font-medium text-[#3E424A] py-4 overflow-x-auto">
        <a
          href="#performance"
          className={`${
            activeLink === 'overview' ? 'text-[#0141CF] border-[#0052FE] border-b-4 pb-4' : ''
          }`}
          onClick={() => handleClick('overview')}
        >
          Overview
        </a>
        <a
          href="#performance"
          className={`${activeLink === 'fundamentals' ? 'text-[#0141CF] border-[#0052FE] border-b-4 pb-4' : ''}`}
          onClick={() => handleClick('fundamentals')}
        >
          Fundamentals
        </a>
        <a
          href="#suggestion"
          className={`${activeLink === 'news' ? 'text-[#0141CF] border-[#0052FE] border-b-4 pb-4' : ''}`}
          onClick={() => handleClick('news')}
        >
          News Insights
        </a>
        <a
          href="#sentiments"
          className={`${activeLink === 'sentiments' ? 'text-[#0141CF] border-[#0052FE] border-b-4 pb-4' : ''}`}
          onClick={() => handleClick('sentiments')}
        >
          Sentiments
        </a>
        <a
          href="#team"
          className={`${activeLink === 'team' ? 'text-[#0141CF] border-[#0052FE] border-b-4 pb-4' : ''}`}
          onClick={() => handleClick('team')}
        >
          Team
        </a>
        <a
          href="#about"
          className={`${activeLink === 'technicals' ? 'text-[#0141CF] border-[#0052FE] border-b-4 pb-4' : ''}`}
          onClick={() => handleClick('technicals')}
        >
          Technicals
        </a>
        <a
          href="#tokenomics"
          className={`${activeLink === 'tokenomics' ? 'text-[#0141CF] border-[#0052FE] border-b-4 pb-4' : ''}`}
          onClick={() => handleClick('tokenomics')}
        >
          Tokenomics
        </a>
      </div>
      <hr />
    </div>
  );
}

export default ToggleSection;
