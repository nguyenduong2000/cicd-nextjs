import React, { ReactNode } from 'react';
import './style.css';

interface TypographyProps {
  type?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h1-script'
    | 'h2-script'
    | 'h3-script'
    | 't1'
    | 't2'
    | 't3'
    | 't4'
    | 't5';
  children: ReactNode;
  component?: 'span' | 'p';
  className?: string;
  id?: string;
}

const Typography = ({
  type,
  component,
  className,
  id,
  children
}: TypographyProps) => {
  const getClassName = () => {
    switch (type) {
      case 'h1':
        return 'text-h1';
      case 'h2':
        return 'text-h2';
      case 'h3':
        return 'text-h3';
      case 'h1-script':
        return 'text-h1-script';
      case 'h2-script':
        return 'text-h2-script';
      case 'h3-script':
        return 'text-h3-script';
      case 't1':
        return 'text-t1';
      case 't2':
        return 'text-t2';
      case 't3':
        return 'text-t3';
      case 't4':
        return 'text-t4';
      case 't5':
        return 'text-t5';
      default:
        return '';
    }
  };

  const renderComponent = () => {
    switch (component) {
      case 'span':
        return (
          <span id={id} className={`${getClassName()} ${className ?? ''}`}>
            {children}
          </span>
        );
      case 'p':
        return (
          <p id={id} className={`${getClassName()} ${className ?? ''}`}>
            {children}
          </p>
        );
      default:
        return (
          <div id={id} className={`${getClassName()} ${className ?? ''}`}>
            {children}
          </div>
        );
    }
  };

  return renderComponent();
};

export default Typography;
