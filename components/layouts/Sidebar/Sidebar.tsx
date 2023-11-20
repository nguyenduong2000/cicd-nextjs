'use client';

import { useState } from 'react';
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { IMenu, menu } from '@/utils/app-config';
import { Drawer } from 'antd';
import Logo from '@/components/icons/Logo';
import { usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import './Sidebar.css';

type Props = {
  isAuthenticated: boolean;
};

type MenuItem = Required<MenuProps>['items'][number];

function Sidebar({ isAuthenticated }: Props) {
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
        className="block h-full focus:ring-0 font-medium"
      >
        {item.name}
      </Link>
    ),
    key: item.path
  });

  const items: MenuItem[] = menu.map((item) => {
    if (isAuthenticated && item.isAuthenticated) {
      return toMenuItem(item);
    } else if (!item.isAuthenticated) {
      return toMenuItem(item);
    }
    return null;
  });

  return (
    <>
      <Drawer
        bodyStyle={{ padding: 8 }}
        contentWrapperStyle={{ width: 300 }}
        title={
          <div className="flex justify-center">
            <Link
              href="/"
              className="cursor-pointer rounded-full transform duration-100 ease-in-out border-solid border-[1px] border-gray-200"
            >
              <Logo />
            </Link>
          </div>
        }
        placement="left"
        onClose={onClose}
        open={open}
      >
        <div className="wrap-sidebar">
          <Menu
            items={items}
            style={{ borderInlineEnd: 'none' }}
            selectedKeys={[pathname]}
          />
        </div>
      </Drawer>
      <div
        onClick={showDrawer}
        className="rounded-full text-white h-10 w-10 cursor-pointer flex items-center justify-center hover:bg-gray-600"
      >
        <MenuOutlined />
      </div>
    </>
  );
}

export default Sidebar;
