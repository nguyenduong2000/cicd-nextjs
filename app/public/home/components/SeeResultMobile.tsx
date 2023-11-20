'use client';

import Image from 'next/image';
import phoneExample from '@/app/public/assets/images/phone_example.svg';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import Typography from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';

const SeeResultMobile = () => {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState<number>(1);

  const listPanel = [
    {
      index: 1,
      label: 'Choose a Risk Level',
      content:
        "Trading can be initiated by answering a few questions in our setup wizard, which includes choosing a risk level that aligns with users' financial goals and the initial capital they intend to invest."
    },
    {
      index: 2,
      label: 'Customize Your Strategy',
      content:
        "Based on a user's risk profile, a strategy is recommended and can be fully customized to meet the needs of our advanced traders."
    },
    {
      index: 3,
      label: 'Start Automated Trading',
      content:
        'Our advanced trade algorithm executes trades automatically with speeds and precision beyond what a manual trader can achieve, freeing up your time for valuable life pursuits.'
    }
    // { index: 4, label: 'Start Trading' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const listElementTitle = listPanel.map((panel) => ({
        index: panel.index,
        element: document.getElementById(panel.label)
      }));
      listElementTitle.forEach((elementObj) => {
        const itemTop = elementObj.element.getBoundingClientRect().top;
        if (itemTop > 100 && itemTop <= 200) {
          setActivePanel(elementObj.index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      id={'result'}
      className="flex flex-col items-center justify-center lg:hidden pt-[60px] w-[500px] mx-auto pb-[70px] max-w-full container"
    >
      <Typography type={'h2'} className={'text-black text-center'}>
        <Typography type={'h2-script'} component={'span'}>
          How
        </Typography>{' '}
        It Works
      </Typography>
      <Typography type={'t2'} className={'text-center text-black mt-[30px]'}>
        Our system is designed for simplicity, featuring an easy 3-step process.
      </Typography>
      <div className="relative mt-[30px] pt-[27px] px-[8px] sm:px-[40px] mb-[50px] w-full">
        <>
          {listPanel.map((panel) => (
            <div
              id={panel.label}
              key={panel.index}
              className={`${
                activePanel === panel.index ? 'active' : ''
              } pb-[30px] h-fit p-3 transition-all duration-300`}
            >
              <div
                className={
                  'h-[100px] w-[500px] max-w-full p-[20px] flex items-center justify-start gap-4'
                }
                key={panel.index}
              >
                <Typography
                  type={'h3'}
                  className={cn(
                    'flex items-center justify-center rounded-[50%] w-[53px] min-w-[53px] h-[53px] text-[20px] font-[600] leading-[70px]',
                    {
                      'bg-[#19b10a]': activePanel === panel.index,
                      'bg-[#556c7d]': activePanel !== panel.index
                    }
                  )}
                >
                  {`0${panel.index}`}
                </Typography>
                <Typography type={'h3'} className={'text-black'}>
                  {panel.label}
                </Typography>
              </div>
              {/*{activePanel === panel.index ? (*/}
              <>
                <Typography
                  type={'t3'}
                  className={`text-black opacity-80 p-[20px] transition duration-300 ${
                    activePanel === panel.index ? 'scale-y-1' : 'scale-y-0 h-0'
                  }`}
                >
                  {panel.content}
                </Typography>
              </>
              {/*) : null}*/}
            </div>
          ))}
        </>
      </div>
      <Image alt={''} src={phoneExample} className="h-[610px]" />
      <Typography
        type={'t3'}
        className="mt-[40px] md:mt-[60px] text-center text-black"
      >
        See the result for yourself with our Live Simulator
      </Typography>
      <div className="text-center mt-[30px]">
        <button
          onClick={() => router.push('join')}
          className="btn btn-dark h-[56px] w-[160px] md:h-[64px] md:w-[200px]"
        >
          Trade Today
        </button>
      </div>
    </div>
  );
};

export default SeeResultMobile;
