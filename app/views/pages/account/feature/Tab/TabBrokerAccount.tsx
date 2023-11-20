import Table from '../Table/Table';

async function TabBrokerAccount() {
  return (
    <section>
      <div className="p-2 sm:p-4 sm:pt-10">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-xl font-bold text-white sm:text-center sm:text-6xl">
            Broker Accounts
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>

      <Table />
    </section>
  );
}

export default TabBrokerAccount;
