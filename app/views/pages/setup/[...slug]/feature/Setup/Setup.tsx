import { times } from '../../utils';
import ControllerInput from '@/components/ui/FormController/ControllerInput';
import ControllerNumber from '@/components/ui/FormController/ControllerNumber';
import ControllerSelect from '@/components/ui/FormController/ControllerSelect';

const Setup = ({ form }: any) => {
  return (
    <>
      <div className="my-4">
        <h2 className="border-b-2 border-[#2a2a2a] text-lg font-medium text-black">
          Setup
        </h2>
      </div>
      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className="text-black ">Timeframe</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerSelect
              options={times}
              control={form.control}
              placeholder="Select timeframe"
              name="timeframe"
              data-testid="timeframe"
            />
          </div>
        </div>
        <p className="text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          Number of minutes since market opens for calculating opening range.
        </p>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className="text-black col-span-12 lg:col-span-7">
              Reward/Risk Ratio
            </h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerNumber
              numericFormat={{ suffix: '' }}
              control={form.control}
              name="risk_ratio"
            />
          </div>
        </div>
        <p className="text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          Multiplication of opening range for setting profit target.
        </p>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className="text-black col-span-12 lg:col-span-7">Max profit</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerNumber control={form.control} name="max_profit" />
          </div>
        </div>
        <p className="text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          For preventing too ambitious profit target when opening range is too
          large.
        </p>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className="text-black col-span-12 lg:col-span-7">Max range</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerNumber control={form.control} name="max_range" />
          </div>
        </div>
        <p className="text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          Don’t trade if opening range is too large because reward-risk ratio
          would be too low if max profit is capped.
        </p>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className="text-black col-span-12 lg:col-span-7">Min range</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerNumber control={form.control} name="min_range" />
          </div>
        </div>
        <p className="text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          Don’t trade if opening range is too small. Stop loss could be hit
          easily.
        </p>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className="text-black col-span-12 lg:col-span-7">
              Closing time (PST)
            </h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerInput
              type="time"
              control={form.control}
              name="close_time"
              classInput="w-[120px] py-1 px-2"
            />
          </div>
        </div>
        <p className="text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          Close all positions at this time everyday if target or stop loss is
          hit.
        </p>
      </div>
    </>
  );
};

export default Setup;
