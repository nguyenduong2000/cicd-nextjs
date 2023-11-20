'use client';

import { FC, useState } from 'react';
import { Menu } from 'antd';
import { UnorderedListOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Drawer } from 'antd';
import { usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import { IMenu, menu } from '../utils';

type MenuItem = Required<MenuProps>['items'][number];
interface SidebarProps {
  transparent?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ transparent }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const toMenuItem = (item: IMenu) => ({
    label: (
      <Link
        onClick={onClose}
        href={item.path}
        className="block h-full focus:ring-0 font-medium uppercase"
      >
        {item.name}
      </Link>
    ),
    key: item.path
  });

  const items: MenuItem[] = menu
    .filter((item) => item.name !== 'home')
    .map((item) => toMenuItem(item));
  return (
    <>
      <Drawer
        bodyStyle={{ padding: 8 }}
        contentWrapperStyle={{ width: 200 }}
        title={
          <div className="title-center text-[20px]">
            Traders<span className="font-[700]">Rescue</span>
          </div>
        }
        closeIcon={<CloseOutlined className={'text-[14px]'} />}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className="header-sidebar">
          <Menu
            items={items}
            style={{ borderInlineEnd: 'none' }}
            selectedKeys={[pathname]}
          />
        </div>
      </Drawer>
      <div
        onClick={showDrawer}
        className={`lg:hidden w-[40px] h-[40px] ${
          !transparent ? 'bg-bg-on-dark hover:bg-[#1ac10b]' : ''
        } cursor-pointer ml-auto flex justify-center items-center`}
      >
        <UnorderedListOutlined className={'text-[24px]'} />
      </div>
    </>
  );
};

export default Sidebar;
