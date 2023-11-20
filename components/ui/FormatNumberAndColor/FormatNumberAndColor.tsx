import { cn, formatDecimalNumber } from '@/lib/utils';

interface IProps {
  value: number;
  before?: string;
  after?: string;
  className?: string;
  decimalAmount?: number;
}

const FormatNumberAndColor = ({
  value,
  before = '',
  after = '',
  className,
  decimalAmount = 2,
  ...rest
}: IProps) => {
  const number = formatDecimalNumber(value, decimalAmount);
  return (
    <p
      className={cn(
        {
          'text-[#38761d]': value >= 0,
          'text-[#990001]': value < 0
        },
        className
      )}
      {...rest}
    >
      {value >= 0
        ? `+${before}${number}${after}`
        : `-${before}${number}${after}`}
    </p>
  );
};

export default FormatNumberAndColor;
