'use client';

import { cn } from '@/lib/utils';
import { Form, Input, InputProps } from 'antd';
import { Controller } from 'react-hook-form';
import type {
  Control,
  FieldPath,
  FieldValues
} from 'react-hook-form/dist/types';

interface Props<T extends FieldValues> extends Omit<InputProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  classInput?: string;
}

const ControllerInput = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    classInput,
    bordered = false,
    size = 'large',
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item className="w-full mb-1" validateStatus={error && 'error'}>
          <Input
            size={size}
            bordered={bordered}
            className={cn('text-base font-semibold pl-0', classInput)}
            status={error?.message && 'error'}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            {...field}
            {...rest}
          />
          {!bordered && (
            <p
              className={cn('border border-solid border-[#c8c8c8] p-0', {
                'border-red-400': error
              })}
            />
          )}
          {error && error.message ? (
            <>
              <p className="h-[22px] text-[14px] text-[#ff4d4f] leading-6">
                {error && error.message}
              </p>
            </>
          ) : null}
        </Form.Item>
      )}
    />
  );
};

export default ControllerInput;
