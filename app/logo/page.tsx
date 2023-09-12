import { FC } from "react";
import { MdCastForEducation } from "react-icons/md";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex flex-1 w-full h-full justify-center items-center"><div className='p-10 bg-black rounded-lg'>
      <MdCastForEducation className='w-20 h-20 text-yellow-300'></MdCastForEducation>
    </div></div>
    
  );
};

export default page;
