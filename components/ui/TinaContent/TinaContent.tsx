import { FC } from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Typography from '@/components/ui/Typography';
import Image from 'next/image';

interface TinaContentProps {
  title?: any;
  body: any;
  hideTitle?: boolean;
}

const TinaContent: FC<TinaContentProps> = ({ title, body, hideTitle }) => {
  const components = {
    h1: (props: any) => (
      <Typography id={props.children?.props?.content?.[0]?.text} type={'h1'}>
        {props.children}
      </Typography>
    ),
    h2: (props: any) => (
      <Typography id={props.children?.props?.content?.[0]?.text} type={'h2'}>
        {props.children}
      </Typography>
    ),
    h3: (props: any) => (
      <Typography id={props.children?.props?.content?.[0]?.text} type={'h3'}>
        {props.children}
      </Typography>
    ),
    a: (props: any) => (
      <a href={props.url} target={'_blank'}>
        {props.children}
      </a>
    ),
    p: (props: any) => (
      <Typography type={'t3'} component={'p'}>
        {props.children}
      </Typography>
    )
  };

  return (
    <div className="tina-container">
      {!hideTitle ? (
        <Typography type={'h1'} className={'mb-10'}>
          {title}
        </Typography>
      ) : null}
      {body ? <TinaMarkdown content={body} components={components} /> : null}
    </div>
  );
};

export default TinaContent;
