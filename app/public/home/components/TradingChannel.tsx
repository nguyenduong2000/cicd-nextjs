import { useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const TradingChannel = () => {
  const [indexVideo, setIndexVideo] = useState<number>(0);

  const listYoutube = [
    'https://www.youtube.com/embed/_anQHmxMjsE?si=vsHuomiFf3_2ROk6',
    'https://www.youtube.com/embed/4Q_bluCd5V4?si=nhhHzpLPGYFL-M9U',
    'https://www.youtube.com/embed/02d1R8ZOJ7g?si=O4Vq8LV2cnDidehB'
  ];

  const handleClickBack = () => {
    const totalVideo = listYoutube.length;
    if (indexVideo === 0) {
      setIndexVideo(totalVideo - 1);
    } else {
      setIndexVideo((prev) => prev - 1);
    }
  };

  const handleClickNext = () => {
    const totalVideo = listYoutube.length;
    if (indexVideo === totalVideo - 1) {
      setIndexVideo(0);
    } else {
      setIndexVideo((prev) => prev + 1);
    }
  };

  return (
    <>
      <div id={'channel'} className={'pt-[80px] pb-[40px]'}>
        <div className={'flex flex-col justify-center items-center'}>
          <div
            className={
              'text-black text-center text-[32px] md:text-[40px] leading-[50px] font-[600]'
            }
          >
            The Trading Channel
          </div>
          <div
            className={
              'pt-[20px] md:pt-[30px] text-black text-center text-[20px] leading-[30px] font-[400] w-full sm:w-[442px] lg:w-[815px]'
            }
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis
            <span className={'hidden lg:block'}>
              pulvinar nunc. Mauris at enim luctus arcu pretium eleifend.
              Pellentesque elementum finibus erat non blandit.
            </span>
          </div>
        </div>
      </div>
      <div id={'youtube'} className={'relative'}>
        <iframe
          className={'w-full h-[425px] md:h-[750px]'}
          src={listYoutube[indexVideo]}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div
          className={
            'left-[20px] w-[40px] h-[40px] md:w-[60px] md:h-[60px] btn-arrow'
          }
          onClick={handleClickBack}
        >
          <ArrowLeftOutlined
            className={'text-[#19b10a] text-[20px] md:text-[30px]'}
          />
        </div>
        <div
          className={
            'right-[20px] w-[40px] h-[40px] md:w-[60px] md:h-[60px] btn-arrow'
          }
          onClick={handleClickNext}
        >
          <ArrowRightOutlined
            className={'text-[#19b10a] text-[20px] md:text-[30px]'}
          />
        </div>
      </div>
    </>
  );
};

export default TradingChannel;
