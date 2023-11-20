import Image from 'next/image';
import WWA_04 from '@/app/public/assets/images/WWA_04.webp';
import WWA_05 from '@/app/public/assets/images/WWA_05.webp';
import WWD_02 from '@/app/public/assets/images/WWD_02.webp';
import WWD_01 from '@/app/public/assets/images/WWD_01.webp';
import WWA_03 from '@/app/public/assets/images/WWA_03.webp';
import WWA_01 from '@/app/public/assets/images/WWA_01.webp';
import Typography from '@/components/ui/Typography';

const WhatWeDo = () => {
  // const listBox = [
  //   {
  //     imgSrc: WWA_06,
  //     firstLine: 'Mission-Driven',
  //     secondLine:
  //       'We are committed to "Making automated stock trading accessible to all."',
  //     key: 'wwa_01',
  //     className: 'border-b md:border-r'
  //   },
  //   {
  //     imgSrc: WWD_04,
  //     firstLine: 'Multidisciplinary Expertise',
  //     secondLine:
  //       'Our professional team brings expertise from diverse industries under one roof.',
  //     key: 'wwa_02',
  //     className: 'border-b'
  //   },
  //   {
  //     imgSrc: WWA_02,
  //     firstLine: 'Unified in Purpose',
  //     secondLine:
  //       'We are dedicated to leveraging technology to empower everyday individuals to engage in day trading effortlessly.',
  //     key: 'wwa_03',
  //     className: 'border-b md:border-b-0 border-r-0 md:border-r'
  //   },
  //   {
  //     imgSrc: WWD_03,
  //     firstLine: 'Meet the Team',
  //     secondLine: 'Click here to get acquainted with each member of our team.',
  //     key: 'wwa_04',
  //     className: ''
  //   }
  // ];

  const listBox = [
    {
      key: 'wwd_01',
      imgSrc: WWA_04,
      firstLine: 'Simplified Trading Experience',
      secondLine:
        'We handle 80% of the day trading complexities for you, leveraging automation to achieve speeds and precision unattainable by manual traders.',
      className: 'border-b md:border-r'
    },
    {
      key: 'wwd_02',
      imgSrc: WWA_05,
      firstLine: 'SAAS on Secure Infrastructure',
      secondLine:
        "Hosted on the industry's most secured Amazon AWS servers, our platform ensures unmatched security and reliability. Enjoy easy access anytime, anywhere, on any device without the need for intricate setups or installations.",
      className: 'border-b xl:border-r'
    },
    {
      key: 'wwd_03',
      imgSrc: WWD_02,
      firstLine: 'Risk-free Trial',
      secondLine:
        'Start with a safe paper trade mode. Once satisfied, transition to real trading with just a click.',
      className: 'border-b md:border-r xl:border-r-0'
    },
    {
      key: 'wwd_04',
      imgSrc: WWD_01,
      firstLine: 'Automated Strategy Selection',
      secondLine:
        'We pick the best trading strategies for you based on your risk appetite. Our strategies undergo meticulous testing using both historical and live data for optimal results.',
      className: 'border-b xl:border-r xl:border-b-0'
    },
    {
      key: 'wwd_05',
      imgSrc: WWA_03,
      firstLine: 'Secure Trade Execution',
      secondLine:
        'Trade through your existing brokerage account with OAuth 2.0 security protocols. We seek trade execution rights without ever needing your password, mirroring trusted authentication services like Google, Facebook, and more.',
      className: 'border-b md:border-b-0 md:border-r'
    },
    {
      key: 'wwd_06',
      imgSrc: WWA_01,
      firstLine: 'Commission-based Model',
      secondLine:
        'Pay only when you win. We stand unique in offering this trust-driven model, a testament to our confidence in our solution.'
    }
  ];

  return (
    <div id="what" className="pb-[160px] pt-[48px] lg:pt-[80px]">
      <div className={'container px-[16px]'}>
        <Typography type={'h2'} className={'text-center'}>
          <Typography type={'h2-script'} component={'span'}>
            What
          </Typography>{' '}
          We Do
        </Typography>
        <Typography type={'t2'} className={'text-center mt-[20px]'}>
          We automate day trading on AWS, starting risk-free and charging
          commissions only for wins.
        </Typography>
        <div className="box-wwd grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-[80px] lg:mt-[100px] mx-auto text-center max-w-[480px] lg:max-w-[900px] xl:max-w-full w-auto">
          {listBox.map((box) => (
            <div
              key={box.key}
              className="outer-box p-3 md:p-8 h-auto sm:hover:scale-105 transition duration-500"
            >
              <div className="flex h-full w-full bg-[#f4f4f4] pt-1 relative text-left px-5 md:px-6 pb-5 md:pb-10 flex-col justify-between gap-8 lg:gap-2">
                <div className="flex-1 py-[40px]">
                  <Image
                    alt={''}
                    src={box.imgSrc}
                    className="mx-auto max-h-[150px] w-auto h-auto"
                  />
                  <Typography type={'h3'} className="text-black mb-6 mt-[50px]">
                    {box.firstLine}
                  </Typography>
                  <Typography type={'t3'} className="text-black opacity-80">
                    {box.secondLine}
                  </Typography>
                </div>
                {/*<button className="btn btn-primary text-[16px] w-[140px] h-[40px]">*/}
                {/*  Read More*/}
                {/*</button>*/}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
