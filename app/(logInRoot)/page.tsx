import AuthForm from "./components/AuthForm";
import Image from "next/image"

const Auth = () => {
  return (
    <div
      className='
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-transparent
      '
    >
      <Image src="/rulers.jpg" alt="background"fill className="absolute -z-10 fill opacity-5"></Image>
      <AuthForm variant="LOGIN"/>
    </div>
  );
};

export default Auth;
