'use client';

import { RightOutlined } from '@ant-design/icons';
import BlogItem from '@/app/public/blog/components/BlogItem';
import { useRouter, useSearchParams } from 'next/navigation';
import Typography from '@/components/ui/Typography';
import { useEffect, useState } from 'react';
import { getListBlogByFilter } from '@/components/ui/TinaContent/utils';

const Blog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') ?? '';
  const [listMostRecent, setListMostRecent] = useState([]);

  useEffect(() => {
    const getListBlog = async () => {
      const listFetch = await getListBlogByFilter({
        filter: {
          title: {
            startsWith: filter
          }
        },
        sort: 'createdAt',
        last: -1
      });
      const listBlog = listFetch.map((blog) => ({
        id: blog.id,
        imageSrc: blog.thumbnail,
        title: blog.title,
        content: blog.body.length ? blog.body[0].text : ''
      }));
      setListMostRecent(listBlog);
    };
    getListBlog();
  }, [filter]);

  const renderCircleMore = (className: string = '', blogId: string) => {
    return (
      <div
        className={`cirle-more ${className}`}
        onClick={() => router.push(`/public/blog/${blogId}`)}
      >
        <RightOutlined className={'text-[12px]'} />
      </div>
    );
  };

  return (
    <div className={'container-content'}>
      <div className={'pb-[50px] md:pb-[100px] mt-[80px]'}>
        <>
          <div
            className={'flex items-center border-[#acacac] border-b pb-[15px]'}
          >
            <Typography type={'h2'} className={'text-black'}>
              Most Recent Post
            </Typography>
            <Typography
              type={'t2'}
              className={
                'ml-auto text-light-active cursor-pointer underline underline-offset-8'
              }
            >
              View All
            </Typography>
          </div>
          <div
            className={
              'pt-[40px] md:pt-[80px] text-black grid grid-cols-1 lg:grid-cols-2 gap-[40px] max-w-[500px] mx-auto lg:max-w-full'
            }
          >
            {listMostRecent.length ? (
              <BlogItem
                id={listMostRecent[0].id}
                title={listMostRecent[0].title}
                content={listMostRecent[0].content}
                imageSrc={listMostRecent[0].imageSrc}
              />
            ) : null}
            <div className={'grid grid-cols-1 gap-[30px]'}>
              {listMostRecent.slice(1, 4).map((blog) => (
                <div
                  key={blog.id}
                  className={
                    'p-[20px] pr-[55px] flex gap-[15px] shadow-lg relative'
                  }
                >
                  <img
                    src={blog.imageSrc}
                    alt={''}
                    className={
                      'min-w-[140px] md:min-w-[180px] max-w-[140px] md:max-w-[180px] h-auto max-h-[130px]'
                    }
                  />
                  <div>
                    <Typography type={'t2'}>{blog.title}</Typography>
                    <Typography type={'t3'} className={'opacity-80 mt-[20px] '}>
                      {blog.content}
                    </Typography>
                  </div>
                  {renderCircleMore(
                    'absolute top-[40px] right-[20px]',
                    blog.id
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Blog;
