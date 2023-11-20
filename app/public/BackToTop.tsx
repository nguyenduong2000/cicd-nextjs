'use client';

import { cn } from '@/lib/utils';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [hidden, setHidden] = useState<boolean>(true);
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    const handleScroll = function () {
      if (window.scrollY > 300) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      className={cn(
        'back-to-top fixed bottom-[30px] right-[30px] h-[40px] w-[40px] flex justify-center items-center bg-[#19b10a] cursor-pointer rounded-[50%] opacity-60 hover:opacity-100 translate-y-0 ',
        {
          'translate-y-20 opacity-0': hidden
        }
      )}
      onClick={handleBackToTop}
    >
      <ArrowUpOutlined />
    </div>
  );
};

export default BackToTop;
