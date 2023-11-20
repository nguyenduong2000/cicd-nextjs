'use client';

import { RightOutlined } from '@ant-design/icons';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@/components/ui/Typography';

type Props = {
  id: string;
  imageSrc: string;
  title: string;
  content: string;
};

const BlogItem = ({ content, imageSrc, title, id }: Props) => {
  const router = useRouter();

  return (
    <div className={'px-[15px] pb-[45px] pt-[15px] shadow-lg'}>
      <img
        src={imageSrc}
        alt={''}
        className={'h-[180px] md:h-[250px] lg:h-[360px] w-auto mx-auto'}
      />
      <Typography type={'h3'} className={'text-center mt-[30px]'}>
        {title}
      </Typography>
      <Typography type={'t3'} className={'opacity-80 text-center mt-[30px]'}>
        {content}
      </Typography>
      <div className={'flex justify-center items-center gap-[20px] mt-[45px]'}>
        <Typography type={'t2'}>Read more</Typography>
        <div
          className={`cirle-more`}
          onClick={() => router.push(`/public/blog/${id}`)}
        >
          <RightOutlined className={'text-[12px]'} />
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
