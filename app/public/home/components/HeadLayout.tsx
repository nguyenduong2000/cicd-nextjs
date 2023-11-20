'use client';

import Menu from '@/app/public/home/components/Menu';
import HeadHome from '@/app/public/home/components/HeadHome';
import { usePathname } from 'next/navigation';
import HeadWhy from '@/app/public/why/HeadWhy';
import HeadBlog from '@/app/public/blog/components/HeadBlog';
import HeadQuestion from '@/app/public/question/components/HeadQuestion';
import { convertUrlToUrlId } from '@/utils/split-endpoint';
import HeadBlogArticle from '@/app/public/blog/[id]/components/HeadBlogArticle';
import HeadJoin from '@/app/public/join/HeadJoin';

const HeadLayout = () => {
  const pathname = usePathname();
  const url = convertUrlToUrlId(pathname);
  const renderContentHead = () => {
    switch (url) {
      case '/public/home':
        return <HeadHome />;
      case '/public/why':
        return <HeadWhy />;
      case '/public/blog':
        return <HeadBlog />;
      case '/public/blog/id':
      case '/public/blog/visual-preview/id':
        return <HeadBlogArticle />;
      case '/public/question':
        return <HeadQuestion />;
      case '/public/join':
        return <HeadJoin />;
      // Other case in here
      default:
        return <HeadHome />;
    }
  };

  const getClassName = () => {
    switch (url) {
      case '/public/home':
        return 'h-[590px] sm:h-[690px] md:h-[890px] relative';
      case '/public/blog':
      case '/public/question':
        return 'h-fit xl:h-[850px] relative';
      case '/public/why':
        return 'h-fit pb-[20px] lg:pb-0 xl:h-[750px] relative';
      case '/public/join':
        return 'join-page h-fit pb-[80px] sm:pb-[130px]';
      case '/public/blog/id':
      case '/public/blog/tina/id':
        return 'h-[850px] pt-[45px] lg:pt-[80px] relative';
      // Other case in here
      default:
        return 'h-[550px] sm:h-[650px] md:h-[850px] xl:h-[890px] relative';
    }
  };

  return (
    <div
      id={'head-layout'}
      className={`z1 pt-[45px] md:pt-[80px] ${getClassName()}`}
    >
      <Menu />
      {renderContentHead()}
    </div>
  );
};

export default HeadLayout;
