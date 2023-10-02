import getCurrentUser from '@/app/actions/getCurrentUser'
import { FC } from 'react'
import UpdateDisplay from './components/UpdateDisplay';

interface pageProps {
  
}

const page: FC<pageProps> =async ({}) => {
  const user = await getCurrentUser();
  return <div><UpdateDisplay user={user} /></div>
}

export default page