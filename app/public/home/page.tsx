'use client';

import WhatWeDo from 'app/public/home/components/WhatWeDo';
import SeeResult from 'app/public/home/components/SeeResult';
import WhoWeAre from 'app/public/home/components/WhoWeAre';
import SeeResultMobile from '@/app/public/home/components/SeeResultMobile';
import TradingChannel from '@/app/public/home/components/TradingChannel';
import HowWeAre from '@/app/public/home/components/HowWeAre';
import Question from '@/app/public/home/components/Question';
import RecentBlog from './components/RecentBlog';
import AboutCustomers from './components/AboutCustomers';
import ConnectedBrokerageDesktop from '@/app/public/home/components/ConnectedBrokerageDesktop';

const LandingPage = () => {
  return (
    <>
      <ConnectedBrokerageDesktop />
      <SeeResult />
      <SeeResultMobile />
      <WhatWeDo />
      <WhoWeAre />
      <HowWeAre />
      {/*<TradingChannel />*/}
      <Question />
      {/*<AboutCustomers />*/}
      {/*<RecentBlog />*/}
    </>
  );
};

export default LandingPage;
