import React from 'react';
import Table from './feature/Table/Table';

type Props = {};

function Strategy({}: Props) {
  return (
    <div className="mb-32 bg-black pt-10 strategy">
      <div className="w-full max-w-6xl mx-auto min-h-[100vh] p-2 md:p-0">
        <h2 className="text-center text-4xl strategy_heading">Strategy</h2>
        <Table />
      </div>
    </div>
  );
}

export default Strategy;
