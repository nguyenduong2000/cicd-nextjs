import Image from 'next/image';
import Interactive from '@/app/public/assets/images/head_interactive.webp';
import Ameritrade from '@/app/public/assets/images/head_ameri.webp';
import Typography from '@/components/ui/Typography';

const ConnectedBrokerageDesktop = () => {
  return (
    <div className="flex flex-col xl:hidden items-center justify-center text-black text-[12px] sm:text-[14px] md:text-[21px] gap-1 relative z-10 mx-auto mt-[80px] sm:mt-[120px] md:mt-[180px] lg:mt-[220px]">
      <Typography type={'t3'} className={'text-center'}>
        Connected Brokerage
      </Typography>
      <div className="flex gap-8 justify-center items-center">
        <div className="w-[75px] sm:w-[115px] md:w-[193px] h-[35px] sm:h-[70px] md:h-[80px] flex justify-center items-center">
          <Image
            alt={''}
            src={Interactive}
            className="w-[60px] sm:w-[90px] md:w-[110px] h-auto"
          />
        </div>
        <div className="w-[75px] sm:w-[115px] md:w-[193px] h-[35px] sm:h-[70px] md:h-[80px] flex justify-center items-center">
          <Image
            alt={''}
            src={Ameritrade}
            className="w-[60px] sm:w-[90px] md:w-[110px] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectedBrokerageDesktop;
