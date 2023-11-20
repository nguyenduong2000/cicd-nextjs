import Image from 'next/image';
import who_head from '@/app/public/assets/images/who_head-svg.webp';
import Typography from '@/components/ui/Typography';

const HeadWhy = () => {
  return (
    <>
      <div
        className={
          'relative h-full text-white text-center xl:text-left pt-[110px] sm:pt-[160px] lg:pt-[160px] xl:pt-[150px] container-head-content'
        }
      >
        <div>
          <Typography type={'h1'} className={'my-[40px]'}>
            A{' '}
            <Typography
              type={'h1-script'}
              component={'span'}
              className={'text-dark-active'}
            >
              Journey
            </Typography>{' '}
            of Automation
          </Typography>
          {/*<div*/}
          {/*  className={'head-title--secondary'}*/}
          {/*>*/}
          {/*  From Stock Trading Dreams to Entrepreneurial Success:*/}
          {/*</div>*/}
          <Typography type={'t1'} className={'xl:max-w-7/10'}>
            {`Here's why you shouldn't manually trade stocks on a discretionary basis until you hear my story`}
          </Typography>
        </div>
        <Image
          src={who_head}
          alt={''}
          className={
            'mx-auto mt-[100px] sm:mt-[120px] lg:mt-[160px] h-auto w-[55%] xl:absolute xl:right-[50px] xl:bottom-[50px] xl:h-[300px] xl:w-auto'
          }
        />
      </div>
      {/*<Image*/}
      {/*  src={green_string}*/}
      {/*  alt={''}*/}
      {/*  className={*/}
      {/*    'hidden xl:block xl:absolute bottom-[-100px] left-[100px] w-auto h-[360px]'*/}
      {/*  }*/}
      {/*/>*/}
    </>
  );
};

export default HeadWhy;
