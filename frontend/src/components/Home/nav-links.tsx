'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movie' },
  { name: 'Promotions', href: '/2' },
  { name: 'Review Movies', href: '/review' },
  { name: 'About us', href: '/1' },
];

type NavLinkProps = { value: boolean, setClose: (bools: boolean) => void };

export default function NavLinks({ value, setClose }: NavLinkProps) {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <>
      {value ? links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex transition-all hover:text-quaternary phone:text-[8px] grow flex-col items-center justify-center gap-3',
            {
              'text-quaternary': activeLink === link.href,
            },
          )}
        >
          <p className='laptop:mb-[-6px]'>{link.name}</p>
          <span
            className={clsx(
              'h-1 w-[60%] transition-all transform',
              {
                'opacity-100 bg-quaternary': activeLink === link.href,
                'translate-x-0': activeLink === link.href,
                '-translate-x-full': activeLink !== link.href,
              }
            )}
            style={{
              transition: activeLink === link.href ? 'transform 0.3s ease-in-out' : 'none',
            }}
          ></span>
        </Link>
      )) : links.map((link) => (
        <Link
          onClick={() => setClose(false)}
          key={link.name}
          href={link.href}
          className={clsx(
            'flex transition-all hover:text-yellow grow flex-col gap-1 mb-5',
            {
              'text-yellow': activeLink === link.href,
            },
          )}
        >
          <p className='laptop:mb-[-6px]'>{link.name}</p>
          <span
            className={clsx(
              'h-1 w-[60%] transition-all transform',
              {
                'opacity-100 bg-yellow': activeLink === link.href,
                'translate-x-0': activeLink === link.href,
                '-translate-x-full': activeLink !== link.href,
              }
            )}
            style={{
              transition: activeLink === link.href ? 'transform 0.3s ease-in-out' : 'none',
            }}
          ></span>
        </Link>
      ))}
    </>
  );
}
