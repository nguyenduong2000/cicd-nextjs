'use client';

import { SendOutlined } from '@ant-design/icons';
import './style.css';
import { Divider } from 'antd';
import Image from 'next/image';
import social from '@/app/public/assets/images/articleSocial.webp';
import CommentItem from './components/CommentItem';
import ControllerInput from '@/components/ui/FormController/ControllerInput';
import { useForm } from 'react-hook-form';
import ControllerTextArea from '@/components/ui/FormController/ControllerTextArea';
import BlogItem from '../components/BlogItem';
import { comments, items } from './utils/mock';
import { yupResolver } from '@hookform/resolvers/yup';
import { IComment, yupComment } from './utils/yupComment';
import React, { useEffect, useMemo, useState } from 'react';
import Typography from '@/components/ui/Typography';
import {
  getContentBlogByName,
  getListBlogByFilter
} from '@/components/ui/TinaContent/utils';
import TinaContent from '@/components/ui/TinaContent/TinaContent';

const ArticleBlog = ({ params }: any) => {
  const [activeHead, setActiveHead] = useState<string>('');
  const [contentBlog, setContentBlog] = useState(null);
  const [listBlog, setListBlog] = useState([]);

  useEffect(() => {
    const getDataContent = async () => {
      const dataFetch = await getContentBlogByName(params.id);
      setContentBlog(dataFetch.data.blog);
    };
    getDataContent();
  }, []);

  useEffect(() => {
    if (contentBlog) {
      const getListBlog = async () => {
        const listFetch = await getListBlogByFilter();

        const listBlogFetch = listFetch
          .map((blog) => ({
            id: blog.id,
            imageSrc: blog.thumbnail,
            title: blog.title,
            content: blog.body.length ? blog.body[0].text : ''
          }))
          .filter((blog) => blog.id !== contentBlog._sys.filename)
          .slice(0, 3);

        setListBlog(listBlogFetch);
      };
      getListBlog();
    }
  }, [contentBlog]);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(yupComment)
  });

  const onSubmit = (data: IComment) => {
    console.log(data);
  };

  const listHead =
    useMemo(() => {
      return contentBlog?.body?.children?.length
        ? contentBlog?.body?.children
            .filter(
              (item: any) =>
                item.type === 'h1' || item.type === 'h2' || item.type === 'h3'
            )
            .map((item: any) =>
              item?.children?.length ? item.children[0].text : ''
            )
        : [];
    }, [contentBlog?.id]) ?? [];

  const scrollToView = (id: string) => {
    setActiveHead(id);
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const listElementTitle = listHead.map((title: string) => ({
        title: title,
        element: document.getElementById(title)
      }));
      listElementTitle.forEach((elementObj: any) => {
        const itemTop = elementObj?.element?.getBoundingClientRect().top;
        if (itemTop > 100 && itemTop <= 500) {
          setActiveHead(elementObj.title);
        }
      });
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="container-content text-black">
      <Typography type={'h1'} className={'text-center my-10'}>
        {contentBlog?.title ?? ''}
      </Typography>
      <div className={'lg:flex gap-8'}>
        <div
          className={
            'mb-8 lg:mb-0 lg:sticky lg:top-8 lg:h-fit scroll-auto pt-[24px] flex-1 hidden lg:block'
          }
        >
          {listHead.map((head: string) => (
            <div
              key={head}
              className={`mb-4 toc cursor-pointer hover:text-light-active hover:underline ${
                head === activeHead ? 'toc-active' : ''
              }`}
              onClick={() => scrollToView(head)}
            >
              <SendOutlined className={'mr-4'} />
              {head}
            </div>
          ))}
        </div>
        <div className={'lg:max-w-[60%]'}>
          <TinaContent body={contentBlog?.body} hideTitle />
        </div>
      </div>
      <div className="my-16">
        <Divider style={{ borderColor: 'rgba(0,0,0,0.4)' }}>
          <Image src={social} alt="social" />
        </Divider>
      </div>
      <div className="mb-8">
        <Typography type={'h3'} className="mb-6">
          {comments.length} Comments
        </Typography>
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>
      <form className="mb-8" onSubmit={handleSubmit(onSubmit)}>
        <Typography type={'t2'} className="mb-2">
          Leave a Reply
        </Typography>
        <Typography type={'t3'} className="text-black">
          Your email address will not be published. Required fields are marked
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className={'col-span-2 md:col-span-1'}>
            <ControllerInput
              className="p-4 rounded-[40px] input-tr"
              control={control}
              bordered
              name="name"
              placeholder="Your Name*"
            />
          </div>
          <div className={'col-span-2 md:col-span-1'}>
            <ControllerInput
              className="p-4 rounded-[40px] input-tr"
              control={control}
              bordered
              name="email"
              placeholder="Your Email*"
            />
          </div>
          <div className="col-span-2">
            <ControllerTextArea
              control={control}
              className="p-4 pt-8 rounded-[40px] input-tr !resize-none"
              name="comment"
              rows={8}
              placeholder="Your Comment"
            />
          </div>
        </div>
        <button className="btn btn-dark w-[140px] h-[50px]">Send</button>
      </form>
      <div className="mb-8">
        <div className="flex items-center border-[#bababa] border-b pb-4">
          <Typography type={'h2'} className="heading">
            Recommended Posts
          </Typography>
          <Typography
            type={'t2'}
            className="ml-auto text-light-active cursor-pointer underline underline-offset-8"
          >
            View All
          </Typography>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] pt-[30px] text-black">
          {listBlog.map((blog) => (
            <BlogItem key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleBlog;
