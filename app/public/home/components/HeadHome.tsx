'use client';

import Image from 'next/image';
import Easer from '@/app/public/assets/images/easer.webp';
import headSleep from '@/app/public/assets/images/sleep_head_light.webp';
import Interactive from '@/app/public/assets/images/head_interactive_white.webp';
import Ameri from '@/app/public/assets/images/head_ameri_white.webp';
import { useRouter } from 'next/navigation';
import Typography from '@/components/ui/Typography';

const HeadHome = () => {
  const { push } = useRouter();

  return (
    <div className={'container px-0 sm:px-10'}>
      <div
        className={
          'flex justify-center flex-col items-center xl:flex-row xl:items-start pt-[120px] sm:pt-[200px] xl:pt-[160px] gap-[40px]'
        }
      >
        <div className={'flex-1 md:min-w-[580px]'}>
          <div className="text-center text-white">
            <Typography
              type={'h1'}
              className={'!leading-[24px] md:!leading-[40px]'}
            >
              Day trading cannot get
              <br />
              any{' '}
              <Typography
                type={'h1-script'}
                component={'span'}
                className={'text-dark-active relative'}
              >
                easier
                <Image
                  src={Easer}
                  alt=""
                  className="absolute top-[85%] right-0"
                />
              </Typography>
              <span className={'text-[50px]'}> </span>
              than this …
            </Typography>
            <Typography type={'t1'} className={'mt-[30px]'}>
              <Typography component={'span'}>
                Automated stock trading software designed to trade while you
                sleep!
              </Typography>
            </Typography>
          </div>
          <div className="text-center mt-[32px]">
            <button
              className="btn btn-primary text-[16px] sm:text-[20px] font-bold relative z-10 w-[136px] h-[48px] sm:w-[160px] sm:h-[56px]"
              onClick={() => push('join')}
            >
              Join Us
            </button>
          </div>
          <div className="hidden text-white text-[16px] xl:flex items-center justify-center gap-8 z-10 mt-[150px]">
            <Typography type={'t3'} className={'text-center'}>
              Connected Brokerage
            </Typography>
            <div className="flex gap-8 justify-center items-center">
              <div className="w-[100px] flex justify-center items-center">
                <Image alt={''} src={Interactive} />
              </div>
              <div className="w-[100px] flex justify-center items-center">
                <Image alt={''} src={Ameri} />
              </div>
            </div>
          </div>
        </div>
        <Image
          alt={''}
          src={headSleep}
          className="w-[60%] min-w-[300px] md:min-w-[500px] xl:max-w-[500px] md:max-w-[500px] xl:min-w-[500px] mt-[-60px] md:mt-[-50px] xl:mt-[260px]"
        />
      </div>
    </div>
  );
};

export default HeadHome;
