'use client';
import { cn } from '@/lib/utils';
import { Form, Input, InputProps } from 'antd';
import { Control, FieldPath, FieldValues, Controller } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface ExtendsInputProps extends Omit<InputProps, 'name' | 'className'> {
  classInput?: string;
}

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  inputProps?: ExtendsInputProps;
  numericFormat?: NumericFormatProps;
}

const ControllerNumber = <T extends FieldValues>(props: Props<T>) => {
  const { name, control, inputProps, numericFormat } = props;

  //set default props
  const {
    classInput,
    placeholder,
    bordered,
    ...restInputProps
  }: ExtendsInputProps = {
    classInput: '',
    bordered: false,
    size: 'middle',
    ...inputProps
  };
  const restNumericFormat: any = {
    suffix: '%',
    ...numericFormat
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, ref, ...fields },
        fieldState: { error }
      }) => {
        return (
          <Form.Item
            className="w-full mb-1"
            validateStatus={error?.message && 'error'}
          >
            <NumericFormat
              customInput={Input}
              onValueChange={(values) => {
                const { floatValue } = values;
                onChange(floatValue);
              }}
              className={cn('text-base pl-0', classInput)}
              status={error?.message && 'error'}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              bordered={bordered}
              getInputRef={ref}
              {...restNumericFormat}
              {...restInputProps}
              {...fields}
            />
            {!bordered && (
              <p
                className={cn('border border-solid border-[#c8c8c8] p-0', {
                  'border-red-400': error
                })}
              />
            )}
            {error && error.message ? (
              <p className="h-[22px] text-[14px] text-[#ff4d4f] leading-6">
                {error && error.message}
              </p>
            ) : null}
          </Form.Item>
        );
      }}
    />
  );
};

export default ControllerNumber;
