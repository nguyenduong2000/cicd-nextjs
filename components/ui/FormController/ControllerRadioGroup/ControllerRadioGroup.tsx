import { Form, Radio } from 'antd';
import { InputProps } from 'antd';
import { Controller } from 'react-hook-form';
import type {
  Control,
  FieldPath,
  FieldValues
} from 'react-hook-form/dist/types';
import './ControllerRadioGroup.css';

interface Dictionary<T = any> {
  [key: string]: T;
}

interface Props<T extends FieldValues> extends Omit<InputProps, 'name'> {
  name: FieldPath<T>;
  control: Control<T>;
  options: Dictionary[];
  pathValue?: string;
  pathLabel?: string;
}

const ControllerRadioGroup = <T extends FieldValues>(props: Props<T>) => {
  const {
    control,
    name,
    pathValue = 'value',
    pathLabel = 'label',
    options = []
  } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Item className="w-full mb-1" validateStatus={error && 'error'}>
          <Radio.Group {...field}>
            {options.map((option) => (
              <Radio
                className="custom-style"
                value={option[pathValue]}
                key={option[pathValue]}
              >
                {option[pathLabel]}
              </Radio>
            ))}
          </Radio.Group>
          {error && error.message ? (
            <p className="h-[22px] text-[14px] text-[#ff4d4f] leading-6">
              {error && error.message}
            </p>
          ) : null}
        </Form.Item>
      )}
    />
  );
};

export default ControllerRadioGroup;
