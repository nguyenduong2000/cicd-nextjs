import Image from 'next/image';
import HWA_01 from '@/app/public/assets/images/HWA_01.webp';
import HWA_02 from '@/app/public/assets/images/HWA_02.webp';
import HWA_03 from '@/app/public/assets/images/HWA_03.webp';
import HWA_04 from '@/app/public/assets/images/HWA_04.webp';
import Typography from '@/components/ui/Typography';

const HowWeAre = () => {
  const listOtherCompare = [
    {
      key: 'ninja',
      imgSrc: HWA_02,
      coreCompetency: 'Futures',
      cost: '1,138/year',
      codingRequire: 'Yes',
      builtIn: 'No',
      saas: 'Yes'
    },
    {
      key: 'tradingnet',
      imgSrc: HWA_03,
      coreCompetency: 'Stocks',
      cost: 'Undisclosed',
      codingRequire: 'No',
      builtIn: 'Yes',
      saas: 'Yes'
    },
    {
      key: 'tradeideas',
      imgSrc: HWA_04,
      coreCompetency: 'Stocks',
      cost: '1,199/year',
      codingRequire: 'No',
      builtIn: 'No',
      saas: 'No',
      className: 'hidden md:flex'
    }
  ];

  return (
    <>
      <div id={'how'} className={'h-auto xl:h-[1040px] py-[40px] sm:py-[90px]'}>
        <div
          className={
            'h-full max-w-[400px] xs:max-w-[500px] sm:max-w-[600px] md:max-w-[900px] xl:max-w-[1150px] px-[8px] mx-auto'
          }
        >
          <div>
            <Typography type={'h2'} className={'text-center'}>
              How We Are{' '}
              <Typography type={'h2-script'} component={'span'}>
                Better
              </Typography>
            </Typography>
            {/* Desktop */}
            <div className={'scale-box'}>
              <div
                className={
                  'mt-[80px] sm:mt-[120px] grid grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2 '
                }
              >
                <div
                  className={'col-span-1 xl:col-span-2 xl:h-[700px] text-white'}
                >
                  <div className={'hwa-row-empty sm:mb-4'} />
                  <Typography type={'t3'} className={'hwa-row hwa-row-1'}>
                    Instrument
                  </Typography>
                  <Typography type={'t3'} className={'hwa-row'}>
                    Cost
                  </Typography>
                  <Typography type={'t3'} className={'hwa-row'}>
                    Coding require
                  </Typography>
                  <Typography type={'t3'} className={'hwa-row'}>
                    Built-in Strategy
                  </Typography>
                  <Typography type={'t3'} className={'hwa-row'}>
                    SAAS
                  </Typography>
                </div>
                <div
                  className={
                    'xl:h-[700px] relative bg-white rounded-[110px] flex flex-col items-center py-[20px] text-black text-[10px] sm:text-[16px] font-[400]'
                  }
                >
                  <div
                    className={'hwa-row-0 !bg-transparent mt-[-18px] sm:mt-0'}
                  >
                    <Image
                      alt={''}
                      src={HWA_01}
                      className={
                        'mt-[-31px] xs:mt-[-42px] sm:mt-[-75px] md:mt-[-90px] h-auto'
                      }
                    />
                  </div>
                  <Typography type={'t4'} className={'hwa-row justify-center'}>
                    Stocks
                  </Typography>
                  <Typography
                    type={'t4'}
                    className={'hwa-row justify-center text-center'}
                  >
                    Pay when you win
                  </Typography>
                  <Typography type={'t4'} className={'hwa-row justify-center'}>
                    No
                  </Typography>
                  <Typography type={'t4'} className={'hwa-row justify-center'}>
                    Yes
                  </Typography>
                  <Typography type={'t4'} className={'hwa-row justify-center'}>
                    Yes
                  </Typography>
                </div>
                {listOtherCompare.map((other) => (
                  <div
                    key={other.key}
                    className={`xl:h-[700px] bg-[#ccc] rounded-[110px] flex flex-col items-center py-[5px] sm:py-[20px] text-black text-[10px] sm:text-[16px] font-[400] ${
                      other.className || ''
                    }`}
                  >
                    <div
                      className={'hwa-row-0 flex justify-center items-center'}
                    >
                      <Image
                        alt={''}
                        src={other.imgSrc}
                        className={'h-auto w-[90%]'}
                      />
                    </div>
                    <Typography
                      type={'t4'}
                      className={'hwa-row justify-center'}
                    >
                      {other.coreCompetency}
                    </Typography>
                    <Typography
                      type={'t4'}
                      className={'hwa-row justify-center'}
                    >
                      {other.cost}
                    </Typography>
                    <Typography
                      type={'t4'}
                      className={'hwa-row justify-center'}
                    >
                      {other.codingRequire}
                    </Typography>
                    <Typography
                      type={'t4'}
                      className={'hwa-row justify-center'}
                    >
                      {other.builtIn}
                    </Typography>
                    <Typography
                      type={'t4'}
                      className={'hwa-row justify-center'}
                    >
                      {other.saas}
                    </Typography>
                  </div>
                ))}
              </div>
              <div
                className={
                  'block absolute h-1 w-full line-border top-[130px] xxs:top-[140px] xs:top-[200px] sm:top-[230px] md:top-[270px]'
                }
              />
              <div
                className={
                  'block absolute h-1 w-full line-border top-[190px] xxs:top-[200px] xs:top-[290px] sm:top-[320px] md:top-[370px]'
                }
              />
              <div
                className={
                  'block absolute h-1 w-full line-border top-[250px] xxs:top-[260px] xs:top-[380px] sm:top-[410px] md:top-[470px]'
                }
              />
              <div
                className={
                  'block absolute h-1 w-full line-border top-[310px] xxs:top-[320px] xs:top-[470px] sm:top-[500px] md:top-[570px]'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWeAre;
