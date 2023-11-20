'use client';

import { MailFilled, PhoneFilled } from '@ant-design/icons';
import Link from 'next/link';
import Typography from '@/components/ui/Typography';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const listMenu = [
    {
      headLine: 'Resource',
      className: '',
      children: [
        { title: 'Our Story', href: '/public/why', key: 'story' },
        { title: 'Blog', href: '/public/blog', key: 'blog' }
      ]
    },
    {
      headLine: 'Contact Us',
      className: 'lg:col-start-3 lg:col-span-2',
      children: [
        {
          title: (
            <>
              <PhoneFilled className={'mr-2 text-[#19b10a]'} />
              1.949.216.013
            </>
          ),
          href: '',
          key: 'phone'
        },
        {
          title: (
            <span className={'break-words'}>
              <MailFilled className={'mr-2 text-[#19b10a]'} />
              info@tradersrescue.com
            </span>
          ),
          href: '',
          key: 'mail'
        }
      ]
    },
    {
      headLine: 'Support',
      className: 'lg:col-start-5',
      children: [{ title: 'FAQ', href: '/public/question', key: 'faq' }]
    }
  ];

  return (
    // pt-[415px] if section StayingTrue includes
    <div
      id={'footer'}
      className={'pt-[30px] sm:pt-[115px] pb-[30px] sm:pb-[60px] text-white'}
    >
      <div className={'container-menu'}>
        {/*<div*/}
        {/*  className={*/}
        {/*    'text-[32px] md:text-[40px] text-center leading-[50px] lg:leading-[70px] font-[600]'*/}
        {/*  }*/}
        {/*>*/}
        {/*  Start Your Trading Journey Today*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className={*/}
        {/*    'text-[15px] md:text-[18px] text-center leading-[30px] font-[400] opacity-90'*/}
        {/*  }*/}
        {/*>*/}
        {/*  We’ll be in touch via email to discuss the next step*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className={*/}
        {/*    'flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 mt-[20px]'*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    placeholder={'Enter Name'}*/}
        {/*    className={'max-w-[500px] h-[56px] rounded-[33px]'}*/}
        {/*    suffix={<UserOutlined />}*/}
        {/*  />*/}
        {/*  <Input*/}
        {/*    placeholder={'Enter Email'}*/}
        {/*    className={'max-w-[500px] h-[56px] rounded-[33px]'}*/}
        {/*    suffix={<MailOutlined />}*/}
        {/*  />*/}
        {/*  <button*/}
        {/*    className={*/}
        {/*      'btn h-[56px] min-w-[190px] btn-primary text-[20px] font-[600]'*/}
        {/*    }*/}
        {/*  >*/}
        {/*    Join Us*/}
        {/*  </button>*/}
        {/*</div>*/}
        <div
          className={
            'border-[#acacac] grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-10'
          }
        >
          {listMenu.map((col) => (
            <div key={col.headLine} className={col.className}>
              <Typography type={'h3'} className={'mt-[30px]'}>
                {col.headLine}
              </Typography>
              {col.children.map((child) => (
                <Typography
                  type={'t3'}
                  key={child.key}
                  className={`mt-[10px] sm:mt-[20px] opacity-90 ${
                    child.href ? 'hover:underline cursor-pointer' : ''
                  }`}
                >
                  {child.href ? (
                    <Link href={child.href}>{child.title}</Link>
                  ) : (
                    child.title
                  )}
                </Typography>
              ))}
            </div>
          ))}
          {/*<div className={'col-span-2 sm:col-span-1'}>*/}
          {/*  <div className={'text-[22px] md:text-[26px] font-[600] mt-[30px]'}>*/}
          {/*    Follow Us*/}
          {/*  </div>*/}
          {/*  <div*/}
          {/*    className={*/}
          {/*      'mt-[20px] grid grid-cols-4 gap-x-2 gap-y-4 max-w-[300px]'*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <div className={'social-box'}>*/}
          {/*      <Icon component={discordIcon} className={'special-icon'} />*/}
          {/*    </div>*/}
          {/*    <div className={'social-box'}>*/}
          {/*      <TwitterOutlined />*/}
          {/*    </div>*/}
          {/*    <div className={'social-box'}>*/}
          {/*      <Icon component={facebookIcon} className={'special-icon'} />*/}
          {/*    </div>*/}
          {/*    <div className={'social-box'}>*/}
          {/*      <InstagramOutlined />*/}
          {/*    </div>*/}
          {/*    <div className={'social-box'}>*/}
          {/*      <YoutubeFilled />*/}
          {/*    </div>*/}
          {/*    <div className={'social-box'}>*/}
          {/*      <Icon component={tiktokIcon} className={'special-icon'} />*/}
          {/*    </div>*/}
          {/*    <div className={'social-box'}>*/}
          {/*      <Icon component={redditIcon} className={'special-icon'} />*/}
          {/*    </div>*/}
          {/*    <div className={'social-box'}>*/}
          {/*      <LinkedinFilled />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <Typography
          type={'t4'}
          className={
            'mt-[50px] sm:mt-[150px] py-[35px] border-y-[2px] border-[#acacac] text-center opacity-80'
          }
        >
          Disclaimer: Traders Rescue is not a brokerage firm or a financial
          advisor. Our software is a tool for trading assistance, not investment
          advice. Users acknowledge the risks associated with financial trading.
          The results we present, based on historical data and algorithms, do
          not guarantee future performance. Users should seek advice from a
          financial advisor before making any investment decisions. Traders
          Rescue reserves the right to modify its policies and guidelines
          without notice. Continued use of our software signifies agreement to
          these changes.
        </Typography>
        <Typography type={'t3'} className={'pt-[60px] text-center'}>
          TradersRescue © {currentYear}. All rights reserved
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
