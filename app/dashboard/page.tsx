"use client"

import { signOut } from 'next-auth/react'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <div onClick={()=>signOut()}>Dashboard</div>
}

export default page