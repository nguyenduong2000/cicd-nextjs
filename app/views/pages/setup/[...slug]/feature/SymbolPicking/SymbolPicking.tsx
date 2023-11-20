'use client';

import {
  backtestTimeframes,
  excludeSymbols,
  includeSymbols,
  typeSymbols
} from '../../utils';
import ControllerNumber from '@/components/ui/FormController/ControllerNumber';
import ControllerRadioGroup from '@/components/ui/FormController/ControllerRadioGroup';
import ControllerSelect from '@/components/ui/FormController/ControllerSelect';

const SymbolPicking = ({ form }: any) => {
  return (
    <>
      <div className="my-4">
        <h2 className="border-b-2 border-[#2a2a2a] text-lg font-medium text-black">
          Symbol picking
        </h2>
      </div>
      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className=" text-black">Backtest timeframes</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerSelect
              mode="multiple"
              options={backtestTimeframes}
              control={form.control}
              placeholder="Select backtest timeframes"
              name="backtest_timeframes"
              data-testid="backtest_timeframes"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className=" text-black">Min daily profit</h4>
            <p className=" text-sm text-[#5c5c5c] lg:mt-2 mb-2">
              Only pick symbols with average daily profits equal or larger than
              this value.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerNumber control={form.control} name="min_daily" />
          </div>
        </div>
        <p className=" text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          Only pick symbols with average daily profits equal or larger than this
          value.
        </p>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className=" text-black">Use win rate</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center">
              <ControllerRadioGroup
                control={form.control}
                options={typeSymbols}
                name="type"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className="text-black">Min win rate</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerNumber control={form.control} name="min_win_rate" />
          </div>
        </div>
        <p className="text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          If use win rate, only pick symbols with win rate equal or larger than
          this value.
        </p>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className=" text-black">Exclude symbols</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerSelect
              mode="multiple"
              options={excludeSymbols}
              control={form.control}
              placeholder="Select exclude symbols"
              name="exclude_symbols"
              data-testid="exclude_symbols"
            />
          </div>
        </div>
        <p className=" text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          Don’t trade these symbols.
        </p>
      </div>

      <div className="mt-3 lg:pl-3">
        <div className="grid grid-cols-12 items-center justify-between mt-2">
          <div className="col-span-12 lg:col-span-7">
            <h4 className=" text-black">Include symbols</h4>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <ControllerSelect
              mode="multiple"
              options={includeSymbols}
              control={form.control}
              placeholder="Select include symbols"
              name="include_symbols"
              data-testid="include_symbols"
            />
          </div>
        </div>
        <p className=" text-sm text-[#5c5c5c] lg:mt-2 mb-2">
          Include these symbols in symbol pool. Still backtesting them.
        </p>
      </div>
    </>
  );
};

export default SymbolPicking;
