'use client';

import './Table.module.css';
import { Table, TableProps } from 'antd';
import { FC } from 'react';

interface TablePropsExtend extends TableProps<any> {}

const TableModule: FC<TablePropsExtend> = (props) => {
  return <Table {...props} />;
};

export default TableModule;
