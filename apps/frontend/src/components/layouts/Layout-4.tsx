import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
}

export default function Layout4({ children }: Props) {
  return (
    <>

      {children}

    </>
  );
}
