'use client';
import { useSupabase } from '@/app/supabase-provider';
import GenerateTrades from './feature/GenerateTrades/GenerateTrades';
import GenerateBrokers from './feature/GenerateBrokers/GenerateBrokers';
import GeneratePortfolio from './feature/GeneratePortfolio/GeneratePortfolio';

function GenerateData() {
  const {
    session: { user }
  } = useSupabase();

  return (
    <div className="bg-white min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)] p-3 md:p-8">
      <div className="max-w-6xl px-3 md:px-6 mx-auto ">
        <div>
          <GenerateBrokers userId={user.id} />
          <div className="border-b-2 my-4 border-gray-950 "></div>
        </div>
        <div>
          <h2 className="text-gray-800 font-bold">Portfolios</h2>
          <GeneratePortfolio userId={user.id} />
          <div className="border-b-2 my-4 border-gray-950 "></div>
        </div>
        <div>
          <h2 className="text-gray-800 font-bold">Portfolio trades</h2>
          <GenerateTrades userId={user.id} />
          <div className="border-b-2 my-4 border-gray-950 "></div>
        </div>
      </div>
    </div>
  );
}

export default GenerateData;
