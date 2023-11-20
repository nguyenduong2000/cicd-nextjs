import React from 'react';
import Typography from '@/components/ui/Typography';

const HeadBlogArticle = () => {
  return (
    <div className="text-white text-left pt-6 md:pt-14 container-head-content">
      <Typography type={'h1'} className="mt-[160px] mb-[40px]">
        <Typography
          type={'h1-script'}
          component={'span'}
          className={'text-dark-active'}
        >
          Blog
        </Typography>{' '}
        Article Banner Placeholder
      </Typography>
      <Typography type={'t2'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat
      </Typography>
    </div>
  );
};

export default HeadBlogArticle;
