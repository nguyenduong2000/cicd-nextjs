import { Input } from 'antd';
import Image from 'next/image';
import blog_head from '@/app/public/assets/images/blog_head.webp';
import Typography from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HeadBlog = () => {
  const [filterInput, setFilterInput] = useState<string>('');
  const router = useRouter();

  return (
    <div
      className={'container-head-content xl:h-full relative xl:flex xl:gap-8'}
    >
      <div
        className={
          'text-white text-center xl:text-left pt-[80px] lg:pt-[120px]'
        }
      >
        <div className={'mx-auto xl:mx-0 lg:max-w-[800px] xl:max-w-[690px]'}>
          <Typography type={'h1'} className={'mt-[32px]'}>
            Welcome to the Traders Rescue{' '}
            <Typography
              type={'h1-script'}
              component={'span'}
              className={'text-dark-active'}
            >
              Blog
            </Typography>
          </Typography>
          <Typography type={'t2'} className={'mt-[20px]'}>
            Explore a world where trading is not just for the experts but for
            everyone. Discover insights, stories, and strategies that are
            shaping an innovative era of stock trading.
          </Typography>
          <Input
            value={filterInput}
            onChange={(value) => setFilterInput(value.target.value)}
            placeholder={'Enter Keywords'}
            className={
              'inline-flex h-[60px] pl-[20px] mt-[60px] input-blog input-tr'
            }
            suffix={
              <button
                onClick={() =>
                  router.push(`/public/blog?filter=${filterInput}`)
                }
                className={
                  'btn btn-dark w-auto px-2 xs:w-[120px] h-[40px] !rounded-[50px]'
                }
              >
                Search
              </button>
            }
          />
        </div>
      </div>
      <div className={'relative h-full w-full xl:w-[350px] xl:max-w-[80%]'}>
        <Image
          src={blog_head}
          alt={''}
          className={
            'mx-auto mt-[40px] xl:absolute xl:right-[10px] xl:bottom-[30px] h-auto sm:h-[400px] w-auto'
          }
        />
      </div>
    </div>
  );
};

export default HeadBlog;
