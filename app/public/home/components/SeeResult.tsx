'use client';

import Image from 'next/image';
import phoneExample from '@/app/public/assets/images/phone_example.svg';
import { useState } from 'react';
import cn from 'classnames';
import Typography from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';

const SeeResult = () => {
  const router = useRouter();
  const [activePanel, setActivePanel] = useState<number>(1);
  const handleClick = (panel: number) => {
    setActivePanel(panel);
  };

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

  return (
    <div
      id={'result'}
      className="hidden lg:block pb-[100px] pt-[120px] container"
    >
      <Typography type={'h2'} className={'text-black text-center'}>
        <Typography type={'h2-script'} component={'span'}>
          How
        </Typography>{' '}
        It Works
      </Typography>
      <Typography type={'t2'} className={'text-center text-black mt-[20px]'}>
        Our system is designed for simplicity, featuring an easy 3-step process.
      </Typography>
      <div className="relative flex items-center mx-auto max-w-[960px] xl:max-w-full lg:flex-wrap xl:flex-nowrap pt-6 mt-[40px] lg:mt-[80px]">
        <div>
          {listPanel.map((panel) => (
            <div
              className={cn(
                'h-[100px] w-[500px] rounded-[47px] p-[20px] flex items-center justify-start gap-8 hover:cursor-pointer duration-300',
                { active: activePanel === panel.index }
              )}
              onClick={() => handleClick(panel.index)}
              key={panel.index}
            >
              <Typography
                type={'h3'}
                className={cn(
                  'flex items-center justify-center rounded-[50%] w-[60px] h-[60px] text-[26px]',
                  {
                    'bg-bg-on-light': activePanel === panel.index,
                    'bg-bg-disabled': activePanel !== panel.index
                  }
                )}
              >
                {`0${panel.index}`}
              </Typography>
              <Typography type={'h3'} className={'text-black'}>
                {panel.label}
              </Typography>
            </div>
          ))}
        </div>
        <div
          className={
            'text-black bg-white h-[300px] pt-[50px] ml-[-70px] flex flex-col flex-1 items-start justify-start pl-[50px] pr-[120px] lg:pr-[50px] active-box'
          }
        >
          <Typography type={'h3'} className={'mb-4'}>
            {listPanel.find((panel) => panel.index === activePanel).label}
          </Typography>
          <Typography type={'t3'} className={'opacity-80'}>
            {listPanel.find((panel) => panel.index === activePanel).content}
          </Typography>
          {/*<div*/}
          {/*  className={*/}
          {/*    'w-[370px] h-[100px] rounded-[50px] bg-white active mt-[50px] mx-auto px-[20px] pt-[20px]'*/}
          {/*  }*/}
          {/*>*/}
          {/*  <Slider*/}
          {/*    tooltip={{ open: false }}*/}
          {/*    trackStyle={{*/}
          {/*      background: '#64e394',*/}
          {/*      borderRadius: '4px',*/}
          {/*      height: 8*/}
          {/*    }}*/}
          {/*    railStyle={{*/}
          {/*      background: '#dedede',*/}
          {/*      borderRadius: '4px',*/}
          {/*      height: 8*/}
          {/*    }}*/}
          {/*    min={1}*/}
          {/*    max={10}*/}
          {/*    value={5}*/}
          {/*  />*/}
          {/*  <div*/}
          {/*    className={*/}
          {/*      'text-[16px] text-black font-[400] flex items-center justify-between'*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <div>Safe</div>*/}
          {/*    <div>Aggressive</div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className="xl:flex-1 lg:w-full xl:w-auto lg:pt-10 xl:pt-0">
          <Image alt={''} src={phoneExample} className="h-[610px] w-full" />
        </div>
      </div>
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

export default SeeResult;
