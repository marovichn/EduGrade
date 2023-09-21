import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

  return (
    <>
      <Navbar/>
      <div className='mt-32'>{children}</div>
    </>
  );
}
