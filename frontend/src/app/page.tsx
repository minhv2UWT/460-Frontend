import { redirect } from "next/navigation";


function Home({children}: {children: React.ReactNode}) {
  
  redirect('/books/view');


  return (
    <>
    </>
  );
}
export default Home;