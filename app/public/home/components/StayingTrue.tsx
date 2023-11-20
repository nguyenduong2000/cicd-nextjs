import Staying from '@/app/public/assets/images/Stay_01.webp';
import Image from 'next/image';

const StayingTrue = () => {
  return (
    <div
      id={'staying'}
      className={'flex justify-center items-center mb-[-250px] container'}
    >
      <div
        className={
          'bg-white min-h-[520px] border-[8px] border-[#19b10a] relative pl-[80px] pr-[330px] py-[50px] hidden lg:flex justify-center'
        }
      >
        <div className={'max-w-[960px]'}>
          <div className={'text-black text-[40px] font-[600] leading-[65px]'}>
            Staying True to Our Mission
          </div>
          <div
            className={
              'text-black text-[20px] leading-[30px] font-[400] mt-[30px]'
            }
          >
            {`To align with our mission, 'Stock trading made accessible to everyone, we would like to support our traders with smaller budgets in building their portfolios. We are offering a "pay as you wish" commission plan for the first 100 opened accounts with $1,000 or less. This is on a first-come, first-served basis and is valid for 12 months.`}
          </div>
          <button className={'btn btn-thin btn-primary mt-[45px] ml-[-10px]'}>
            Trade Today
          </button>
        </div>
        <div></div>
        <Image
          src={Staying}
          alt={''}
          className={'absolute h-[600px] w-auto right-0 bottom-[-15px]'}
        />
      </div>
      {/* Mobile */}
      <div
        className={
          'bg-white block lg:hidden pt-[20px] px-[30px] border-[8px] border-[#19b10a]'
        }
      >
        <div
          className={
            'text-black text-center text-[30px] font-[600] leading-[50px]'
          }
        >
          Staying True to Our Mission
        </div>
        <div
          className={
            'text-black text-[18px] leading-[30px] font-[400] mt-[25px]'
          }
        >
          {`To align with our mission, 'Stock trading made accessible to everyone, we would like to support our traders with smaller budgets in building their portfolios. We are offering a "pay as you wish" commission plan for the first 100 opened accounts with $1,000 or less. This is on a first-come, first-served basis and is valid for 12 months.`}
        </div>
        <button className={'btn btn-thin btn-primary mt-[30px]'}>
          Trade Today
        </button>
        <Image
          src={Staying}
          alt={''}
          className={'h-auto sm:h-[600px] w-auto mt-[20px] mb-[-15px] mx-auto'}
        />
      </div>
    </div>
  );
};

export default StayingTrue;
