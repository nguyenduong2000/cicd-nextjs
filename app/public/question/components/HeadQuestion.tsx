import Image from 'next/image';
import headFaq from '@/app/public/assets/images/head_faq.webp';
import Typography from '@/components/ui/Typography';

const HeadQuestion = () => {
  return (
    <>
      <div className="text-white text-center xl:text-left pt-16 md:pt-32 container-head-content relative h-full">
        <div className={'xl:w-[725px]'}>
          <Typography type={'h1'} className="my-[40px]">
            Frequently Asked{' '}
            <Typography
              component={'span'}
              type={'h1-script'}
              className={'text-dark-active'}
            >
              Questions
            </Typography>
          </Typography>
          <Typography type={'t1'} className="pb-10">
            Here are the answers to the most frequently asked questions
          </Typography>
        </div>
        <Image
          src={headFaq}
          alt=""
          priority
          className={
            'mx-auto w-auto h-[300px] sm:w-auto sm:h-[400px] mt-[40px] xl:absolute xl:right-0 xl:bottom-[50px] '
          }
        />
      </div>
    </>
  );
};

export default HeadQuestion;
