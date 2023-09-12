import AuthForm from "./components/AuthForm";
import Image from "next/image";

const Auth = () => {
  return (
    <>
      <div
        className='
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-auth-banner
        bg-repeat
        -z-10
      '
      >
        <div className='absolute w-full h-full bg-white top-0 left-0 opacity-80'></div>
        <div className='z-10'>
          <AuthForm variant='LOGIN' />
        </div>
      </div>
    </>
  );
};

export default Auth;
