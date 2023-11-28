import getCurrentUser from '@/app/actions/getCurrentUser'
import UpdateDisplay from './components/UpdateDisplay';


const page =async () => {
  const user = await getCurrentUser();
  return <div><UpdateDisplay user={user} /></div>
}

export default page