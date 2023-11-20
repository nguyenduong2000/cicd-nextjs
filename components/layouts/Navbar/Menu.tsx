'use client';

import Sidebar from '../Sidebar';
import { menu } from '@/utils/app-config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Logo from '@/components/icons/Logo';
import { useSupabase } from '@/app/supabase-provider';
import { usePathname } from 'next/navigation';
import s from './Navbar.module.css';

function Menu() {
  const pathname = usePathname();
  const {
    supabase,
    appState: { isAuthenticated }
  } = useSupabase();

  return (
    <>
      <div className="flex items-center flex-1 gap-3 font-poppins">
        {/* lg down*/}
        <nav className="flex items-center lg:hidden ">
          <Sidebar isAuthenticated={isAuthenticated} />
        </nav>

        <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>
        {/*lg up */}
        <nav className="hidden ml-6 space-x-2 lg:block">
          {menu.map((item) => {
            const classLink = cn(s.link, {
              'text-pink-500 hover:text-pink-500 focus:text-pink-500':
                pathname.startsWith(item.path)
            });

            if (isAuthenticated && item.isAuthenticated) {
              return (
                <Link href={item.path} key={item.path} className={classLink}>
                  {item.name}
                </Link>
              );
            } else if (!item.isAuthenticated) {
              return (
                <Link href={item.path} key={item.path} className={classLink}>
                  {item.name}
                </Link>
              );
            }
            return null;
          })}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {isAuthenticated ? (
          <button
            className={s.link}
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            Sign out
          </button>
        ) : (
          <Link
            href="/views/signin"
            className={cn(s.link, {
              'text-pink-500 hover:text-pink-500 focus:text-pink-500':
                pathname === '/views/signin'
            })}
          >
            Sign in
          </Link>
        )}
      </div>
    </>
  );
}

export default Menu;
