'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import green_string from 'app/public/assets/images/green_string.webp';
import Who_1 from 'app/public/assets/images/main_who_1.webp';
import Who_2 from 'app/public/assets/images/main_who_2.webp';
import Who_3 from 'app/public/assets/images/main_who_3.webp';
import Who_4 from 'app/public/assets/images/main_who_4.webp';
import Who_5 from 'app/public/assets/images/main_who_5.webp';
import './style.css';
import Typography from '@/components/ui/Typography';

const Why = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const listElementTitle = listTitle.map((title) => ({
        title: title,
        element: document.getElementById(title)
      }));
      listElementTitle.forEach((elementObj) => {
        const itemTop = elementObj.element.getBoundingClientRect().top;
        if (itemTop > 100 && itemTop <= 500) {
          setActiveSection(elementObj.title);
        }
      });
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const listTitle = [
    'From Stock Trading Dreams to Entrepreneurial Success',
    'Navigating Challenges and Seeking Alternatives',
    'Transforming $50,000 into $136,000: The Power of Compound Profits',
    'My Evolution from Day Trading to Traders Rescue',
    "Introducing 'Traders Rescue' - Your Path to Effortless Investing",
    "Experience 'Traders Rescue' Where Your Success is Our Commission"
  ];

  const scrollToView = (id: string) => {
    const element = document.getElementById(id);
    setActiveSection(id);
    element.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div className={'pb-[80px] container-content'}>
      <Image
        src={green_string}
        alt={''}
        className={'mx-auto w-auto h-[110px] sm:h-[220px]'}
      />
      <div
        className={
          'block xl:flex xl:gap-40 mt-[-50px] md:mt-[-80px] text-black relative'
        }
      >
        <div className={'flex-1 hidden xl:block sticky top-[40px] h-fit'}>
          <div className={'mt-[20px]'}>
            {listTitle.map((title, index) => (
              <div
                key={title}
                onClick={() => scrollToView(title)}
                className={`mb-[20px] toc ${
                  activeSection === title ? 'toc-active' : ''
                } hover:text-light-active hover:cursor-pointer hover:underline underline-offset-4`}
              >
                {`${index + 1}. ${title}`}
              </div>
            ))}
          </div>
        </div>
        <div className={'xl:w-[60%]'}>
          <>
            <Typography
              type={'h2'}
              id={listTitle[0]}
              className={'mt-[10px] mb-[20px] md:mb-[40px]'}
            >
              From Stock Trading Dreams to Entrepreneurial Success
            </Typography>
            <Typography type={'t3'} className={'grid grid-cols-1 gap-[40px]'}>
              <div>
                {`I'm a devoted dad, working every day to raise my three young children. I'm also a software engineer with
                decades of experience. My love for business and risk-taking pushed me to always try new things. In 2011, I
                built a note-taking app for the iPad, and within a year, it topped the App Store's Productivity Chart.`}
              </div>
              <div>
                {`I was attracted to stock trading during the dot-com era but never got around to trying it. Then, when the
                pandemic hit. It made me realize the value of time & the importance of being around more for my kids. This
                led me to try a new career that let me work from home - stock trading.`}
              </div>
            </Typography>
            <Image
              src={Who_1}
              alt={''}
              className={'my-[30px] w-[100%] sm:w-[70%] h-auto mx-auto'}
            />
            <Typography
              type={'h2'}
              id={listTitle[1]}
              className={'mt-[40px] md:mt-[60px] mb-[20px] md:mb-[40px]'}
            >
              Navigating Challenges and Seeking Alternatives
            </Typography>
            <Typography type={'t3'} className={'grid grid-cols-1 gap-[40px]'}>
              <div>
                {`In March 2022, I decided to dive into the world of day trading stocks. I spent two grueling months
                learning the industry, trying to wrap my head around the vast amount of information it required. I quickly
                came to realize that day trading isn't a fit for just anyone. It's like riding a roller coaster - watching
                your money rise and fall is incredibly nerve-racking. The sheer volume of information to digest just to
                get started was overwhelming. Keeping a constant eye on market shifts, staying updated with financial
                news, understanding intricate charts, and enduring the emotional toll of
                significant losses - it was too much for an average person. According to a May 2019 article by Tradeciety,
                99% of day traders fail or quit within five years. Who was I to think I could belong to the elite 1% of
                successful traders? For someone like me, who has a job, a family, and other responsibilities, day trading
                wasn't my cup of tea. But the drive to spend more time with my kids pushed me to keep looking for a better
                solution.`}
              </div>
              <div>
                {`For the next few months, I began paper trading using virtual money to test what I had learned. Through
                trial and error, I stumbled upon a straightforward yet promising trading process. I discovered a field
                known as algorithmic or quantitative trading, which relies on mathematical and pattern recognition models
                to systematically make trading decisions, thereby reducing human intervention and the associated emotional
                stress. This leads to a significantly higher chance of successful and consistent trading. Given my
                background as a computer engineer, what might seem difficult to an average trader does not pose a
                challenge for me. Filled with excitement, I shifted gears and single-handedly coded an automated trading
                model to test my theory.`}
              </div>
            </Typography>
            <Image
              src={Who_2}
              alt={''}
              className={
                'my-[40px] md:my-[80px] w-[100%] sm:w-[70%] h-auto mx-auto'
              }
            />
            <Typography
              type={'h2'}
              id={listTitle[2]}
              className={'mt-[40px] md:mt-[60px] mb-[20px] md:mb-[40px]'}
            >
              Transforming $50,000 into $136,000: The Power of Compound Profits
            </Typography>
            <Typography type={'t3'} className={'grid grid-cols-1 gap-[40px]'}>
              <div>
                {`After a month of tireless coding, I completed a testing model. I back-tested the software with real
                historical data and it showed promising results. Preliminary results indicated an average daily win of
                0.2% to 0.3%. Hypothetically, with a $50,000 investment, I could potentially gain $100 to $150 a day.
                However, these potential earnings were still not sufficient for me to quit my job and pursue this as a
                full-time career.`}
              </div>
              <div>
                {`Then it struck me - the power of compound profit! By reinvesting my daily earnings back into trading, the
                annual return on investment significantly escalated to a staggering 65% - 110%! With skepticism turned
                into determination, I decided to test my findings in real trading. In June 2022, I deposited $50,000 into
                my TDAmeritrade account, giving me a trading potential of $100,000 in a margin account. Six months later,
                my portfolio stood at a staggering $136,000! That's a
                whopping 232% return on my initial investment.`}
              </div>
            </Typography>
            <Typography
              type={'h3'}
              className={'w-full my-[50px] md:my-[80px] relative'}
            >
              <div className={'sm:absolute left-0 top-0 max-w-[430px]'}>
                I got 232% return on
                <br /> my initial investment.
              </div>
              <Image
                src={Who_3}
                alt={''}
                className={'w-[100%] sm:w-[70%] h-auto mx-auto'}
              />
            </Typography>
            <Typography
              type={'h2'}
              id={listTitle[3]}
              className={'mt-[40px] md:mt-[60px] mb-[20px] md:mb-[40px]'}
            >
              {`My Evolution from Day Trading
              to Traders Rescue`}
            </Typography>
            <Typography type={'t3'} className={'grid grid-cols-1 gap-[40px]'}>
              <div>
                {`At first, I wanted to keep the discovery to myself, with the goal of slowly growing my portfolio. However,
                I didn't have a lot of money to start with, and accumulating more would take quite some time. In January
                2023, filled with excitement, I attempted to sell my stock trading software to hedge fund managers, hoping
                they would recognize its potential and purchase it from me. To my surprise, every single one of them
                declined, not because they didn't believe my plan would work, but because I was a newcomer in their field
                of expertise. They weren't willing to risk their clients' money on someone with only a little experience
                in day trading. I came to a disappointing realization: I was just a software developer, not a stock market
                expert. Driven by determination and self-belief, I pressed on, attempting to create my own hedge fund and
                grow investors' wealth for a commission. I reached out to a few friends experienced in the investing
                world. I shared my plan with them, trying to convince them to join me in starting our own hedge funds.
                While many of them liked the idea, they soon realized they weren't ready for the stringent regulatory
                requirements. Once again, I was faced with another challenge.`}
              </div>
              <div>
                {`By April 2023, I was at a loss about what to do next. Then, a spark of an idea struck me. What if I turned
                my testing model into automated trading software with an incredibly simple user interface that anyone
                could trade? After a thorough technical assessment, I realized that such a project wouldn't be easy; it
                would require significant investment. The complexities of manual stock trading would need to be mirrored
                in advanced computer algorithms designed to execute intricate trading strategies. These strategies would
                then have to be put to the test against extensive historical data using specialized scripts. The resulting
                data would have to be rigorously analyzed to validate consistency with our expectations. To create a
                system that was trustworthy, scalable, and secure, all code would need to run on a secure remote private
                server. If we could get this right, we could potentially negate the need for users to do any coding or
                setup work. This could potentially level the playing field for ordinary individuals who aspire to earn a
                living from trading stocks.`}
              </div>
              <div>
                {`Inspired by my decision, I established “Traders Rescue” on May 10, 2023 with the core mission of, “Making
                automated stock trading accessible to all.”`}
              </div>
            </Typography>
            <Image
              src={Who_4}
              alt={''}
              className={
                'my-[50px] md:my-[80px] w-[100%] sm:w-[70%] h-auto mx-auto'
              }
            />
            <Typography
              type={'h2'}
              id={listTitle[4]}
              className={'mt-[40px] md:mt-[60px] mb-[20px] md:mb-[40px]'}
            >
              {`Introducing 'Traders Rescue' - Your Path to Effortless Investing`}
            </Typography>
            <Typography
              type={'t3'}
              className={'grid grid-cols-1 gap-[40px] mt-[20px] md:mt-[70px]'}
            >
              <div>
                {`On May 15, 2023, I pitched to investors and immediately secured funding. With sufficient capital, I
                recruited a team of professionals and we diligently embarked on the development phase to build 'Traders
                Rescue'. Here's what our solution offers.`}
              </div>
              <div>
                {`Imagine a world where trading stocks is as easy as taking an Uber ride. You decide on your destination,
                and Uber gets you there. Our system is designed with simplicity in mind. Users only need to answer a few
                questions in our setup wizard, such as their financial goals and the initial capital they wish to invest.
                They then set their desired risk level, and the system begins trading automatically. It's stock trading,
                but without the usual stress and complications.`}
              </div>
              <div>
                {`We use advanced technology. With Software as a Service (SAAS) model, our system is always available,
                wherever you are and whatever device you're using. The strategies we use have been thoroughly tested. We
                use advanced data analytics to provide the best outcome possible for your investment. We also place a high
                emphasis on constant research and development to continuously improve the system and stay at the forefront
                of technological advancements.`}
              </div>
            </Typography>
            <Image
              src={Who_5}
              alt={''}
              className={
                'w-[100%] sm:w-[70%] h-auto mx-auto my-[50px] md:my-[80px]'
              }
            />
            {/*<div*/}
            {/*  className={*/}
            {/*    'text-body-title mt-[40px] md:mt-[60px] mb-[20px] md:mb-[40px]'*/}
            {/*  }*/}
            {/*>*/}
            {/*  Join the Future of Trading:*/}
            {/*</div>*/}
            <Typography type={'h2'} id={listTitle[5]} className={'mt-[20px]'}>
              {`Experience 'Traders Rescue' Where Your Success is Our Commission`}
            </Typography>
            <Typography
              type={'t3'}
              className={'grid grid-cols-1 gap-[40px] mt-[20px] md:mt-[70px]'}
            >
              <div>
                {`Lastly, with high confidence, our system is the first automated trading solution that operates on a
                commission-based model where you don't pay a dime unless you win. There are no setup or course fees. This
                highlights our commitment to ensuring a fair and open trading platform.`}
              </div>
              <div>
                {`If you are interested in learning more about us or joining us on this journey, we welcome you to be a part
                of Traders Rescue. Together, we can revolutionize stock trading and provide opportunities for financial
                growth and family time, creating a brighter future for all.`}
              </div>
            </Typography>
          </>
        </div>
      </div>
    </div>
  );
};

export default Why;
