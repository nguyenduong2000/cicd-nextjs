'use client';

import Blog1 from '@/app/public/assets/images/Blog_01.webp';
import Blog2 from '@/app/public/assets/images/Blog_02.webp';
import Blog3 from '@/app/public/assets/images/Blog_03.webp';
import Image from 'next/image';
import { ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RightOutlined } from '@ant-design/icons';
const RecentBlog = () => {
  const appendDots = (dots: ReactNode) => (
    <div
      style={{
        height: '4rem'
      }}
    >
      <ul> {dots} </ul>
    </div>
  );
  const customPaging = () => <div className="dot"></div>;
  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    appendDots,
    customPaging,
    dotsClass: 'slick-dots slick-thumb',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  const blogs = [
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error id iure sed natus iusto nihil incidunt nesciunt qui ut fug',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      image: Blog1
    },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error id iure sed natus iusto nihil incidunt nesciunt qui ut fug',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      image: Blog2
    },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error id iure sed natus iusto nihil incidunt nesciunt qui ut fug',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      image: Blog3
    },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error id iure sed natus iusto nihil incidunt nesciunt qui ut fug',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      image: Blog1
    },
    {
      title:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error id iure sed natus iusto nihil incidunt nesciunt qui ut fug',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      image: Blog2
    }
  ];

  return (
    <div
      id="blog"
      className="w-full relative mt-[80px] mb-[20px] overflow-hidden"
    >
      <div className="container relative min-h-[850px] wrap-slider-blog">
        <div className="text-black text-center text-[32px] md:text-[40px] leading-[40px] md:leading-[60px] font-[600]">
          Recent Blog Posts
        </div>
        <Slider {...settings}>
          {blogs.map((blog, index) => (
            <div key={index} className="focus:ring-0 p-4">
              <div className="flex flex-col justify-between min-h-[628px] shadow-[0px_20px_20px_rgba(0,0,0,0.1)] px-[18px] pb-8">
                <div>
                  <Image
                    src={blog.image}
                    alt={''}
                    className="h-[328px] object-cover"
                  />
                  <h2 className="text-gray-900 font-[600] line-clamp-2 my-4 text-[20px] leading-[30px]">
                    {blog.title}
                  </h2>
                  <p className="text-[rgba(0,0,0,0.7)] text-[16px] leading-[24px]">
                    {blog.description}
                  </p>
                </div>
                <div className="flex items-center gap-5 cursor-pointer">
                  <p className="font-semibold text-[#211e1e] text-[16px] leading-[26px] ">
                    Read more
                  </p>
                  <p className="flex justify-center items-center h-[24px] w-[24px] text-gray-600 rounded-full border-[#19b10a] border border-solid">
                    <RightOutlined className={'text-[12px]'} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecentBlog;
