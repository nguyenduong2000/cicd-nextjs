'use client';
import Image from 'next/image';
import React from 'react';
import defaultAvatar from '@/app/public/assets/images/defaultAvatar.webp';
import reply from '@/app/public/assets/images/replyIcon.webp';
import { Divider } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Typography from '@/components/ui/Typography';

type Props = {
  name: string;
  time: number;
  content: string;
  avatar?: string;
};

const CommentItem = ({ avatar, content, name, time }: Props) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 md:gap-6 sm:items-center">
        <Image
          src={avatar ? avatar : defaultAvatar}
          alt={name}
          className="h-12 w-12 md:h-20 md:w-20 rounded-full"
        />
        <div className={'mx-4'}>
          <Typography type={'t2'} className="text-[#333333]">
            {name}
          </Typography>
          <Typography
            type={'t4'}
            className="text-[#888888] tracking-[1px] mt-1"
          >
            <ClockCircleOutlined />{' '}
            {dayjs(time).format('MMMM DD, YYYY [at] hh:mm a')}
          </Typography>
          <Typography type={'t3'} className="text-black mt-2">
            {content}
          </Typography>
        </div>
        <div className="sm:w-[140px] flex gap-2 cursor-pointer flex-1 justify-center sm:justify-end">
          <Image src={reply} alt="reply" className="" />
          <Typography type={'t3'} className="text-light-active">
            Reply
          </Typography>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default CommentItem;
