import React, { FC } from 'react'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({children}) => {
  return (
    <main className='bg-white w-full h-full text-black pt-10 -mt-3 p-4'>
      {children}
    </main>
  );
}

export default PageWrapper