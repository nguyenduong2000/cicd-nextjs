import { redirect } from 'next/navigation';

function Home() {
  return redirect('/public/home');
}

export default Home;
