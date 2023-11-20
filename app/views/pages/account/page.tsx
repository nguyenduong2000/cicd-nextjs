import { Tabs } from 'antd';
import './style.css';
import TabBilling from './feature/Tab/TabBilling';
import TabProfile from './feature/Tab/TabProfile';
import TabBrokerAccount from './feature/Tab/TabBrokerAccount';

export default async function Account() {
  const [tabBilling, tabProfile, tabAccount] = await Promise.all([
    TabBilling(),
    TabProfile(),
    TabBrokerAccount()
  ]);
  const tabs = [
    {
      key: 'billing',
      label: 'Billing',
      children: tabBilling
    },
    {
      key: 'profile',
      label: 'Profile',
      children: tabProfile
    },
    {
      key: 'broker_account',
      label: 'Broker Accounts',
      children: tabAccount
    }
  ];
  return (
    <div className="mb-32 bg-black pt-10">
      <div className="account-tab w-full max-w-6xl mx-auto min-h-[100vh]">
        <Tabs defaultActiveKey="billing" centered items={tabs} />
      </div>
    </div>
  );
}
