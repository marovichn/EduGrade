import React, { FC } from 'react'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({children}) => {
  return (
    <main className='bg-white w-full h-full text-black pt-16 -mt-3 px-10  md:px-10 md:pt-18'>
      {children}
    </main>
  );
}

export default PageWrapper