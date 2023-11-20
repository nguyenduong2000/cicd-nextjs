'use client';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Ava1 from '@/app/public/assets/images/Chanel_02.webp';
import Ava2 from '@/app/public/assets/images/Chanel_01.webp';
import Ava3 from '@/app/public/assets/images/Chanel_03.webp';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Typography from '@/components/ui/Typography';

const Question = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);

  const listQuestion = [
    {
      index: 1,
      question: 'Why share this with everyone?',
      answer:
        'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
    },
    {
      index: 2,
      question: 'Who is this for?',
      answer:
        'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
    },
    {
      index: 3,
      question: 'How much does it cost?',
      answer:
        'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
    },
    {
      index: 4,
      question: 'How hard is this to get started?',
      answer:
        'Designed for all traders, our intuitive and user-friendly automated SaaS system requires no coding or technical analysis skills. It is particularly beneficial for those who experience constant losses and feel frustrated by the complexity of day trading.'
    }
  ];

  const handleOpenQuestion = (question: number) => {
    if (question === currentQuestion) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(question);
    }
  };

  return (
    <div
      id={'question'}
      className={'h-fit pb-[80px] sm:pb-[130px] pt-[48px] lg:pt-[80px]'}
    >
      <div className={'container-content px-[16px] sm:px-[2rem]'}>
        <Typography type={'h2'} className={'text-center'}>
          Frequently Asked{' '}
          <Typography type={'h2-script'} component={'span'}>
            Questions
          </Typography>
        </Typography>
        <div className={'flex justify-center items-center mt-[40px]'}>
          <div className={'sm:w-[1400px] sm:px-[40px]'}>
            {listQuestion.map((question) => (
              <div
                key={question.index}
                className={`text-left text-white text-[18px] md:text-[20px] leading-[26px] sm:leading-[39px] font-[400] pt-[30px] pb-[20px] px-0 lg:px-[60px] ${
                  question.index !== 4 ? 'border-b-[2px] border-[#acacac]' : ''
                } relative`}
              >
                <Typography
                  type={'h3'}
                  className={'w-[80%] md:w-[90%] lg:w-auto'}
                >
                  {`0${question.index}. ${question.question}`}
                </Typography>
                <div
                  className={`button-circle absolute top-[30px] right-[10px] text-[20px] md:text-[25px] w-[42px] md:w-[56px] h-[42px] md:h-[56px] ml-auto ${
                    currentQuestion === question.index
                      ? 'bg-white text-light-active'
                      : 'bg-bg-on-dark text-white'
                  }`}
                  onClick={() => handleOpenQuestion(question.index)}
                >
                  {currentQuestion === question.index ? (
                    <MinusOutlined />
                  ) : (
                    <PlusOutlined />
                  )}
                </div>
                <Typography
                  type={'t3'}
                  className={`box-answer relative pl-[40px] origin-top mt-[40px] ${
                    currentQuestion === question.index
                      ? 'scale-y-1'
                      : 'scale-y-0 h-0'
                  }`}
                >
                  {question.answer}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className={'flex justify-center items-center'}>
          <div className={'relative h-[100px] w-[130px]'}>
            <Image
              alt={''}
              src={Ava1}
              className={'w-[60px] h-[60px] absolute left-0 bottom-0'}
            />
            <Image
              alt={''}
              src={Ava2}
              className={
                'w-[60px] h-[60px] absolute left-[40px] z-10 top-[15px]'
              }
            />
            <Image
              alt={''}
              src={Ava3}
              className={'w-[60px] h-[60px] absolute right-0 bottom-0'}
            />
          </div>
        </div>
        <Typography type={'t2'} className={'text-white text-center mt-[40px]'}>
          Still Have Questions?
        </Typography>
        {/*<div*/}
        {/*  className={*/}
        {/*    'text-white text-center text-[16px] md:text-[20px] font-400 mt-[16px] leading-[26px] px-[60px] py-[20px] opacity-60'*/}
        {/*  }*/}
        {/*>*/}
        {/*  Can’t find the answere you’re looking for? Please chat to our friendly*/}
        {/*  team.*/}
        {/*</div>*/}
        <div
          className={
            'flex items-center justify-center mt-[30px] w-full md:p-0 p-2'
          }
        >
          <div className={'flex items-center justify-center gap-3 w-full'}>
            <button
              onClick={() => router.push('question')}
              className={'btn btn-light max-w-[183px] flex-1 h-[60px]'}
            >
              Ask More
            </button>
            {/*<button*/}
            {/*  className={*/}
            {/*    'btn btn-secondary max-w-[183px] flex-1 h-[60px] font-[600]'*/}
            {/*  }*/}
            {/*>*/}
            {/*  Contact Us*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
