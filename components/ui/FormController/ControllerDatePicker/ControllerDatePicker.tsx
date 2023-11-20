'use client';

import { cn } from '@/lib/utils';
import { Form, DatePicker, DatePickerProps } from 'antd';
import { Controller } from 'react-hook-form';
import type {
  Control,
  FieldPath,
  FieldValues
} from 'react-hook-form/dist/types';
import './ControllerDatePicker.css';

interface Props<T extends FieldValues> extends Omit<DatePickerProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  classInput?: string;
  showTime?: boolean;
  showToday?: boolean;
}

const ControllerDatePicker = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    classInput,
    bordered = false,
    size = 'large',
    placeholder,
    showTime,
    showToday = true
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item className="w-full mb-1" validateStatus={error && 'error'}>
          <DatePicker
            size={size}
            bordered={bordered}
            className={cn('text-base font-semibold pl-0', classInput)}
            showTime={showTime}
            showToday={showToday}
            placeholder={placeholder}
            popupClassName={'date-picker-custom'}
            {...field}
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

export default ControllerDatePicker;
