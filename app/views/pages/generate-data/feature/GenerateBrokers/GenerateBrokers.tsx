import { useToastMessage } from '@/components/ui/ToastMessage';
import { supabaseAdmin } from '@/utils/supabase-admin';

interface Props {
  userId: string;
}
function GenerateBrokers({ userId }: Props) {
  const { openNotification } = useToastMessage();

  const brokerAccount = [
    {
      type: 'paper',
      user_id: userId
    },
    {
      type: 'money',
      user_id: userId
    },
    {
      type: 'paper',
      user_id: userId
    }
  ];

  const onGenerateBrokerAcc = async () => {
    const { data } = await supabaseAdmin.from('brokers').select('id');
    const newBrokerAccount = data
      ? brokerAccount.map((broker_acc, i) => ({
          ...broker_acc,
          broker_id: data[i].id
        }))
      : [];
    const { error } = await supabaseAdmin
      .from('broker_accounts')
      .upsert(newBrokerAccount);
    if (error) {
      openNotification(error?.message, 'error');
      return;
    }
    openNotification('Generate success', 'success');
  };
  return (
    <div>
      <h2 className="text-gray-800 font-bold">Brockers Account</h2>
      <button onClick={onGenerateBrokerAcc} className=" bg-pink-500 my-2 p-2">
        Generate Brokers Account
      </button>
    </div>
  );
}

export default GenerateBrokers;
