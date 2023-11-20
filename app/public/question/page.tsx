'use client';
import { Collapse, CollapseProps, Input } from 'antd';
import './style.css';
import {
  ArrowRightOutlined,
  MinusOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { questionDetail, questions } from './utils/mock';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Ava1 from '@/app/public/assets/images/Chanel_02.webp';
import Ava2 from '@/app/public/assets/images/Chanel_01.webp';
import Ava3 from '@/app/public/assets/images/Chanel_03.webp';
import Image from 'next/image';
import Typography from '@/components/ui/Typography';

const Question = () => {
  const itemsRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeCollapse, setActiveCollapse] = useState<string | string[]>([
    'general'
  ]);
  const [mobileOpenQuestion, setMobileOpenQuestion] = useState<string[]>(['1']);
  const scrollToId = (hash: string) => {
    const map = getMap();
    const node = map.get(hash);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
    setActiveItem(hash);
  };

  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const map = getMap();
      map.forEach((itemRef: HTMLDivElement, hash: string) => {
        if (itemRef) {
          const itemTop = itemRef.getBoundingClientRect().top + scrollY;
          const itemBottom = itemRef.getBoundingClientRect().bottom + scrollY;
          if (scrollY >= itemTop && scrollY < itemBottom) {
            setActiveItem(hash);
            const indexOfBlock = Number(hash.slice(-1));
            const keyOfBlock = questions[indexOfBlock].key;
            const isKeyActive = activeCollapse.includes(keyOfBlock);
            if (!isKeyActive) {
              const newActive = Array.from(new Set(activeCollapse));
              newActive.push(keyOfBlock);
              setActiveCollapse(newActive);
            }
          }
        }
      });
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [activeCollapse]);

  const items: CollapseProps['items'] = questions.map((question, index) => {
    return {
      key: question.key,
      label: <div className="toc-heading">{question.topic}</div>,
      children: (
        <>
          {question.question.map((item) => (
            <div
              className={'toc'}
              key={item.id}
              onClick={() => scrollToId(item.hash + index)}
            >
              <div key={item.id} className="p-4 flex gap-3">
                <ArrowRightOutlined />
                <a
                  className={cn(`hover:text-light-active hover:underline`, {
                    'toc-active': activeItem === item.hash + index
                  })}
                >
                  {item.name}
                </a>
              </div>
              <div className="border-topic"></div>
            </div>
          ))}
        </>
      )
    };
  });

  const isMobileOpen = (id: string) => {
    return mobileOpenQuestion.includes(id);
  };

  const handleOpenCloseQuestionMobile = (id: string) => {
    const _mobileOpenQuestion = [...mobileOpenQuestion];
    if (isMobileOpen(id)) {
      const indexOfId = _mobileOpenQuestion.indexOf(id);
      _mobileOpenQuestion.splice(indexOfId, 1);
    } else {
      _mobileOpenQuestion.push(id);
    }
    setMobileOpenQuestion(_mobileOpenQuestion);
  };

  return (
    <div className={'pb-[30px] sm:pb-[130px] xl:mt-[100px] container-content'}>
      <div className="bg-white py-10">
        <div className="md:flex md:gap-10 lg:gap-20 w-full mx-auto">
          <div
            id={'scroll-bar-side'}
            className="hidden md:block scrollbar-sm w-full flex-1 md:sticky md:h-[calc(100vh-50px)] overflow-auto top-4 bg-white question-collapse py-8 md:px-3 mx-auto"
          >
            <div className="scrollbar-content">
              <Collapse
                items={items}
                defaultActiveKey={['general']}
                activeKey={activeCollapse}
                onChange={(activeKey) => setActiveCollapse(activeKey)}
                ghost
                expandIconPosition="end"
                expandIcon={({ isActive }) => {
                  return isActive ? (
                    <MinusOutlined
                      style={{ fontSize: '20px', color: '#fff' }}
                    />
                  ) : (
                    <PlusOutlined style={{ fontSize: '20px' }} />
                  );
                }}
              />
            </div>
          </div>
          <div className="md:w-[50%] lg:w-[60%]">
            {questionDetail.map((item) => (
              <div key={item.topic}>
                <Typography type={'h2'} className="text-black my-10">
                  {item.topic}
                </Typography>
                {item.detail.map((detail) => (
                  <div
                    id={detail.hash}
                    ref={(node) => {
                      const map = getMap();
                      if (node) {
                        map.set(detail.hash, node);
                      } else {
                        map.delete(detail.hash);
                      }
                    }}
                    key={detail.id}
                    className="mb-8 question-detail relative"
                  >
                    <Typography
                      type={'h3'}
                      className="text-black flex items-center gap-2"
                    >
                      <div className={'flex-1'}>{detail.title}</div>
                      <div
                        onClick={() => handleOpenCloseQuestionMobile(detail.id)}
                        className={`${
                          isMobileOpen(detail.id)
                            ? 'bg-white text-light-active border border-bg-on-light'
                            : 'bg-bg-on-light text-white'
                        }  ml-auto rounded-full w-[40px] h-[40px] flex md:hidden items-center justify-center cursor-pointer`}
                      >
                        {isMobileOpen(detail.id) ? (
                          <MinusOutlined />
                        ) : (
                          <PlusOutlined />
                        )}
                      </div>
                    </Typography>
                    <div
                      className={`pl-8 md:pl-10 mt-4 md:pb-8 md:border-b-2 md:border-[#d0d0d0] question-border-left box-answer ${
                        isMobileOpen(detail.id) ? 'scale-y-1' : 'scale-y-0 h-0'
                      } block md:hidden`}
                    >
                      <Typography type={'t3'} className="text-black">
                        {detail.content}
                      </Typography>
                    </div>
                    <div className="pl-8 md:pl-10 mt-4 md:pb-8 md:border-b-2 md:border-[#d0d0d0] question-border-left box-answer hidden md:block">
                      <Typography type={'t3'} className="text-black">
                        {detail.content}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:flex md:gap-10 lg:gap-20 w-full sm:p-4">
          <div className="flex-1" />
          <div className="md:w-[50%] lg:w-[60%]">
            <div className="text-center mt-24">
              <div className="relative flex gap-6 justify-center">
                <Image
                  src={Ava1}
                  alt="avatar"
                  className="w-[73px] h-[73px] rounded-full"
                />
                <div className="absolute top-[-30%]">
                  <Image
                    src={Ava2}
                    alt="avatar"
                    className="w-[73px] h-[73px] rounded-full"
                  />
                </div>
                <Image
                  src={Ava3}
                  alt="avatar"
                  className="w-[73px] h-[73px] rounded-full"
                />
              </div>
              <Typography type={'t2'} className="text-black my-6">
                Still Have Questions?
              </Typography>
              <div className={'mx-auto max-w-[600px]'}>
                <Input
                  placeholder={'Enter Email'}
                  className={'h-[48px] input-tr'}
                />
                <Input.TextArea
                  placeholder={'Enter your questions here…'}
                  className={'mt-[20px] text-[16px] input-tr !resize-none'}
                  rows={5}
                />
              </div>
              <div className="flex items-center justify-center mt-[20px] w-full md:p-0 p-2">
                <div className="text-center">
                  <button className="btn btn-dark w-[160px] h-[55px]">
                    Ask More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
