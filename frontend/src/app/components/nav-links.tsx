'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movie' },
  { name: 'Promotions', href: '/2' },
  { name: 'Privacy & Policy', href: '/3' },
  { name: 'About us', href: '/1' },
];

type NavLinkProps = { value: boolean , setClose: (bools:boolean) => void}


export default function NavLinks({ value, setClose }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <>
      {value ? links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex transition-all hover:text-quaternary grow flex-col items-center justify-center gap-2',
              {
                'text-quaternary': pathname === link.href,
              },
            )}
          >
            <p className='laptop:mb-[-6px]'>{link.name}</p>
            <span className={clsx('h-1 w-[60%] transition-all', {
              'opacity-100 bg-quaternary': pathname === link.href,
            })}></span>
          </Link>
        );
      }) : links.map((link) => {
        return (
          <Link
            onClick={() => setClose(false)}
            key={link.name}
            href={link.href}
            className={clsx(
              'flex transition-all hover:text-yellow grow flex-col gap-1 mb-5',
              {
                'text-yellow': pathname === link.href,
              },
            )}
          >
            <p className='laptop:mb-[-6px]'>{link.name}</p>
            <span className={clsx('h-1 w-[60%] transition-all', {
              'opacity-100 bg-yellow': pathname === link.href,
            })}></span>
          </Link>
        );
      })}
    </>
  );
}