import Main_Who_5 from '@/app/public/assets/images/main_who_5.webp';
import Image from 'next/image';
import { Input } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import Typography from '@/components/ui/Typography';

const HeadJoin = () => {
  return (
    <div className={'container-head-content mt-[80px] md:mt-[180px]'}>
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
        <div>
          <Typography type={'h1'} className={'mb-[30px]'}>
            Your{' '}
            <Typography
              type={'h1-script'}
              component={'span'}
              className={'text-dark-active'}
            >
              trading
            </Typography>{' '}
            journey
            <br /> begins here ...
          </Typography>
          <Typography
            type={'t1'}
            className={'flex items-center text-[16px] sm:text-[20px]'}
          >
            Were thrilled to see your interest and share in our excitement. Like
            you, countless others are eager to embark on a stress-free day
            trading journey with us. Stay tuned, as were gearing up to launch by
            the end of this year.
          </Typography>
        </div>
        <Image
          src={Main_Who_5}
          alt={''}
          className={
            'min-w-[300px] w-[70%] h-auto mx-auto md:mx-0 md:ml-auto md:w-full lg:w-[80%] md:h-auto self-center'
          }
        />
      </div>
      <div
        className={
          'flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mt-[60px]'
        }
      >
        <Input
          placeholder={'Enter Name'}
          className={
            'max-w-[500px] md:max-w-[350px] h-[48px] sm:h-[56px] rounded-[33px] input-tr px-6'
          }
          suffix={<UserOutlined />}
        />
        <Input
          placeholder={'Enter Email'}
          className={
            'max-w-[500px] h-[48px] sm:h-[56px] rounded-[33px] input-tr px-6'
          }
          suffix={<MailOutlined />}
        />
        <button
          className={
            'btn btn-light h-[56px] px-2 w-auto min-w-[200px] mt-2 sm:mt-0'
          }
        >
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default HeadJoin;
