import { cn } from '@/lib/utils';
import { Select, SelectProps } from 'antd';
import { Form } from 'antd';
import { Controller } from 'react-hook-form';
import './ControllerSelect.css';
import type {
  Control,
  FieldPath,
  FieldValues
} from 'react-hook-form/dist/types';
import { CaretDownOutlined } from '@ant-design/icons';

interface Dictionary<T = any> {
  [key: string]: T;
}

interface Props<T extends FieldValues>
  extends Omit<SelectProps<any, any>, 'name'> {
  options: Dictionary[];
  pathValue?: string;
  pathLabel?: string;
  classSelect?: string;
  name: FieldPath<T>;
  control: Control<T>;
}

const ControllerSelect = <T extends FieldValues>(props: Props<T>) => {
  const {
    pathValue = 'value',
    pathLabel = 'label',
    bordered = false,
    size = 'large',
    options = [],
    name,
    control,
    classSelect,
    ...rest
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          className="wrap-select mb-1"
          validateStatus={error && 'error'}
        >
          <Select
            size={size}
            bordered={bordered}
            className={cn('custom-select', classSelect)}
            dropdownStyle={{ borderRadius: '0px' }}
            suffixIcon={
              <CaretDownOutlined className="text-gray-400/80 text-lg" />
            }
            {...field}
            {...rest}
          >
            {options.map((option) => (
              <Select.Option key={option[pathValue]} value={option[pathValue]}>
                {option[pathLabel]}
              </Select.Option>
            ))}
          </Select>
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

export default ControllerSelect;
