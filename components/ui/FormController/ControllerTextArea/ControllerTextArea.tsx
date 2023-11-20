'use client';

import { cn } from '@/lib/utils';
import { Form, Input, InputProps } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { Controller } from 'react-hook-form';
import type {
  Control,
  FieldPath,
  FieldValues
} from 'react-hook-form/dist/types';
const { TextArea } = Input;

interface Props<T extends FieldValues> extends Omit<TextAreaProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  classInput?: string;
}

const ControllerTextArea = <T extends FieldValues>(props: Props<T>) => {
  const { control, name, classInput, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item className="w-full mb-1" validateStatus={error && 'error'}>
          <TextArea
            className={cn('text-base font-semibold pl-0', classInput)}
            status={error?.message && 'error'}
            {...field}
            {...rest}
          />
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

export default ControllerTextArea;
