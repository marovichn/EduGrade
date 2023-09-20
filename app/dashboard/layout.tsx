import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <>
      <Navbar/>
      <div className='fixed top-16 z-15 bg-gray-300 text-black w-full h-16'></div>
      <div className='mt-32'>{children}</div>
    </>
  );
}
