import { RightOutlined } from '@ant-design/icons';
import Link from 'next/link';

function Breadcrumbs() {
  return (
    <div className="flex gap-3 items-center">
      <Link href="/views" className="text-gray-800 text-xl hover:underline">
        Home
      </Link>
      <RightOutlined style={{ color: 'black', fontSize: '14px' }} />
      <p className="text-gray-800 text-xl">Scoreboard</p>
    </div>
  );
}

export default Breadcrumbs;
