'use client';

import { menu } from '@/app/public/home/utils';
import { usePathname } from 'next/navigation';
import { convertUrlToUrlId } from '@/utils/split-endpoint';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '@/app/public/home/components/Sidebar';

const StickyMenu = () => {
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const url = convertUrlToUrlId(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      id={'sticky-menu'}
      className={`${
        scrollY >= 300 ? 'translate-y-0' : 'translate-y-[-45px] h-0'
      } sticky top-0 text-white bg-[#09282A] z-[100] transition duration-300`}
    >
      <div className={'container-menu flex items-center lg:justify-between'}>
        <div className="hidden lg:flex items-center justify-between gap-[50px] text-[22px] font-nunito">
          {menu
            .filter((item) => item.side === 'left')
            .map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`cursor-pointer ${
                  item.path && url.includes(item.path)
                    ? 'text-[#19b10a] active-menu'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
        </div>
        <Link className="title-center" href={'/public/home'}>
          <span className={'logo-thin'}>Traders</span>
          <span>
            <span className={'logo-script'}>R</span>
            <span className={'logo-space'}> </span>
            <span className={'logo-bold'}>escue</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center justify-center gap-[50px] text-[22px] font-nunito">
          {menu
            .filter((item) => item.side === 'right')
            .map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`cursor-pointer ${
                  item.path && url.includes(item.path)
                    ? 'text-[#19b10a] active-menu'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
        </div>
        <Sidebar transparent />
      </div>
    </div>
  );
};

export default StickyMenu;
