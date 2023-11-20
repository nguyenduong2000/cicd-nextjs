'use client';

import Sidebar from '@/app/public/home/components/Sidebar';
import { menu } from '@/app/public/home/utils';
import { usePathname } from 'next/navigation';
import { convertUrlToUrlId } from '@/utils/split-endpoint';
import Link from 'next/link';

const Menu = () => {
  const pathname = usePathname();
  const url = convertUrlToUrlId(pathname);

  return (
    <div className="flex items-center lg:justify-between text-white container-menu">
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
      <Sidebar />
    </div>
  );
};

export default Menu;
