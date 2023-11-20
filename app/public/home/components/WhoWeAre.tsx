import Image from 'next/image';
import WWA_06 from '@/app/public/assets/images/WWA_06.webp';
import WWD_04 from '@/app/public/assets/images/WWD_04.webp';
import WWA_02 from '@/app/public/assets/images/WWA_02.webp';
import WWD_03 from '@/app/public/assets/images/WWD_03.webp';
import Typography from '@/components/ui/Typography';

const WhoWeAre = () => {
  // const listBox = [
  //   {
  //     key: 'wwd_01',
  //     imgSrc: WWA_04,
  //     firstLine: 'Simplified Trading Experience',
  //     secondLine:
  //       'We handle 80% of the day trading complexities for you, leveraging automation to achieve speeds and precision unattainable by manual traders.',
  //     className: 'border-b md:border-r'
  //   },
  //   {
  //     key: 'wwd_02',
  //     imgSrc: WWA_05,
  //     firstLine: 'SAAS on Secure Infrastructure',
  //     secondLine:
  //       "Hosted on the industry's most secured Amazon AWS servers, our platform ensures unmatched security and reliability. Enjoy easy access anytime, anywhere, on any device without the need for intricate setups or installations.",
  //     className: 'border-b xl:border-r'
  //   },
  //   {
  //     key: 'wwd_03',
  //     imgSrc: WWD_02,
  //     firstLine: 'Risk-free Trial',
  //     secondLine:
  //       'Start with a safe paper trade mode. Once satisfied, transition to real trading with just a click.',
  //     className: 'border-b md:border-r xl:border-r-0'
  //   },
  //   {
  //     key: 'wwd_04',
  //     imgSrc: WWD_01,
  //     firstLine: 'Automated Strategy Selection',
  //     secondLine:
  //       'We pick the best trading strategies for you based on your risk appetite. Our strategies undergo meticulous testing using both historical and live data for optimal results.',
  //     className: 'border-b xl:border-r xl:border-b-0'
  //   },
  //   {
  //     key: 'wwd_05',
  //     imgSrc: WWA_03,
  //     firstLine: 'Secure Trade Execution',
  //     secondLine:
  //       'Trade through your existing brokerage account with OAuth 2.0 security protocols. We seek trade execution rights without ever needing your password, mirroring trusted authentication services like Google, Facebook, and more.',
  //     className: 'border-b md:border-b-0 md:border-r'
  //   },
  //   {
  //     key: 'wwd_06',
  //     imgSrc: WWA_01,
  //     firstLine: 'Commission-based Model',
  //     secondLine:
  //       'Pay only when you win. We stand unique in offering this trust-driven model, a testament to our confidence in our solution.'
  //   }
  // ];

  const listBox = [
    {
      imgSrc: WWA_06,
      firstLine: 'Mission-Driven',
      secondLine:
        'We are committed to "Making automated stock trading accessible to all."',
      key: 'wwa_01',
      className: 'border-b md:border-r'
    },
    {
      imgSrc: WWD_04,
      firstLine: 'Multidisciplinary Expertise',
      secondLine:
        'Our professional team brings expertise from diverse industries under one roof.',
      key: 'wwa_02',
      className: 'border-b'
    },
    {
      imgSrc: WWA_02,
      firstLine: 'Unified in Purpose',
      secondLine:
        'We are dedicated to leveraging technology to empower everyday individuals to engage in day trading effortlessly.',
      key: 'wwa_03',
      className: 'border-b md:border-b-0 border-r-0 md:border-r'
    },
    {
      imgSrc: WWD_03,
      firstLine: 'Meet the Team',
      secondLine:
        'We are headquartered in Irvine, California. If you are in the area, we would love to talk about stock trading over a cup of coffee.',
      key: 'wwa_04',
      className: ''
    }
  ];

  return (
    <div
      id="who"
      className="container pb-[40px] lg:pb-[120px] pt-[40px] lg:pt-[80px]"
    >
      <Typography type={'h2'} className={'text-center text-black'}>
        <Typography type={'h2-script'} component={'span'}>
          Who
        </Typography>{' '}
        We Are
      </Typography>
      <div
        className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 gap-0 text-center max-w-[480px] md:max-w-[900px] xl:max-w-[900px] mx-auto mt-[80px] lg:mt-[100px]"
        id="what-we-are-box"
      >
        {listBox.map((box) => (
          <div
            key={box.key}
            className={`h-auto box-wwa ${box.className ?? ''}`}
          >
            <Image
              alt={''}
              src={box.imgSrc}
              className="h-auto w-[80%] sm:h-[130px] sm:w-auto"
            />
            <Typography type={'h3'}>{box.firstLine}</Typography>
            <Typography
              type={'t3'}
              className="text-[16px] opacity-80 mt-[-30px] leading-[24px]"
            >
              {box.secondLine}
            </Typography>
          </div>
        ))}
      </div>
      {/*<div className="mt-[40px] md:mt-[60px] text-[16px] md:text-[20px] leading-[36px] text-center text-black">*/}
      {/*  See the result for yourself, try our real life Trade Simulator*/}
      {/*</div>*/}
      {/*<div className="text-center mt-[30px]">*/}
      {/*  <button className="btn btn-primary h-[56px] w-[160px] md:h-[64px] md:w-[200px] text-[18px] font-bold">*/}
      {/*    Try it*/}
      {/*  </button>*/}
      {/*</div>*/}
    </div>
  );
};

export default WhoWeAre;
