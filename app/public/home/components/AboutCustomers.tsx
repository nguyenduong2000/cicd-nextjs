'use client';
import People from '@/app/public/assets/images/About_01.png';
import Quotation from '@/app/public/assets/images/About_quotation.webp';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Slider as SliderRange } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const AboutCustomers = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const refSlide = useRef<Slider | null>(null);
  const people = [
    {
      image: People,
      name: 'Jonathan Doe',
      slogan:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum lorem nec egestas sagittis. Nunc sollicitudin ultrices ultricies. Integer et tortor ut elit fringilla iaculis vitae et dui.'
    },
    {
      image: People,
      name: 'Jonathan Doe',
      slogan:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum lorem nec egestas sagittis. Nunc sollicitudin ultrices ultricies. Integer et tortor ut elit fringilla iaculis vitae et dui.'
    },
    {
      image: People,
      name: 'Jonathan Doe',
      slogan:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum lorem nec egestas sagittis. Nunc sollicitudin ultrices ultricies. Integer et tortor ut elit fringilla iaculis vitae et dui.'
    },
    {
      image: People,
      name: 'Jonathan Doe',
      slogan:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum lorem nec egestas sagittis. Nunc sollicitudin ultrices ultricies. Integer et tortor ut elit fringilla iaculis vitae et dui.'
    }
  ];
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: '280px',
    focusOnSelect: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (number) => setUpdateCount(number),
    beforeChange: (_, next) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          centerPadding: '180px'
        }
      },
      {
        breakpoint: 1280,
        settings: {
          centerMode: false,
          centerPadding: '0px'
        }
      }
    ]
  };
  return (
    <div className="w-full relative mt-[80px] p-4 md:p-0">
      <div className="relative mx-auto wrap-slider-blog">
        <div className="text-black text-center text-[32px] md:text-[40px] leading-[40px] md:leading-[50px] font-[600]">
          {"Don't take our words for it,"}
          <br />
          {'listen to our customers'}
        </div>
        <div className="overflow-hidden relative about-us-slider">
          <Slider ref={refSlide} {...settings}>
            {people.map((p, index) => (
              <div key={index} className="focus:ring-0 relative">
                <div className="flex flex-wrap-reverse md:flex-nowrap md:gap-6 items-center">
                  <div className="max-w-full mx-auto lg:mr-[100px] lg:ml-0">
                    <Image
                      src={p.image}
                      alt="about-us"
                      className="aspect-[3/4] max-w-[300px]"
                    />
                  </div>
                  <div className="mt-7 md:mt-0 md:max-w-[50%] lg:max-w-[40%]">
                    <Image
                      src={Quotation}
                      alt="Quotation"
                      className="mb-6 mx-auto md:mx-0 w-[60px]"
                    />
                    <p className=" text-[18px] md:text-[16px] font-light leading-[30px] text-black italic text-center md:text-left">
                      {p.slogan}
                    </p>
                    <p className="font-semibold text-[#19b10a] leading-[40px] text-[16px] mt-6 text-center md:text-left">
                      {p.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="flex gap-6 min-w-[460px] xl:w-[1280px] relative mx-auto px-4">
            <p className="text-gray-900">
              {updateCount + 1}/{people.length}
            </p>
            <div className="flex-1">
              <SliderRange
                onChange={(number: number) => {
                  refSlide.current && refSlide.current.slickGoTo(number);
                }}
                value={slideIndex + 1}
                min={0}
                max={people.length}
                trackStyle={{
                  background: '#64e394',
                  borderRadius: '4px',
                  height: 8
                }}
                railStyle={{
                  background: '#dedede',
                  borderRadius: '4px',
                  height: 8
                }}
                tooltip={{ open: false }}
                handleStyle={{
                  display: 'none'
                }}
              />
            </div>
            <ArrowRightOutlined
              className="text-[#19b10a] text-2xl"
              onClick={() => refSlide.current.slickNext()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCustomers;
