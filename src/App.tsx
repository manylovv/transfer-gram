import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from '@tonconnect/ui-react';
import { getTransfer } from 'gram20-sdk/v2';
import { FormEvent, useState } from 'react';

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [tick, setTick] = useState('');

  const sendTx = async (e: FormEvent) => {
    e.preventDefault();

    const { payload, address: tokenAddress } = await getTransfer({
      address: address,
      to: recipient,
      amount: amount,
      tick: tick,
    });

    await tonConnectUI.sendTransaction({
      messages: [
        {
          address: tokenAddress,
          amount: '8000000',
          payload: payload,
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60,
    });

    setRecipient('');
    setAmount('');
    setTick('');
  };

  return (
    <div>
      <div className="flex justify-end p-10">
        <TonConnectButton />
      </div>
      <div className="flex justify-center p-10">
        <div className="flex gap-2">
          <form
            className="flex flex-col gap-2 w-[400px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              placeholder="Recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="border px-4 p-2 rounded-full "
            />
            <input
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border px-4 p-2 rounded-full"
            />
            <input
              placeholder="Tick"
              value={tick}
              onChange={(e) => setTick(e.target.value)}
              className="border px-4 p-2 rounded-full"
            />

            <button
              type="submit"
              onClick={sendTx}
              className="border px-4 p-2 rounded-full bg-sky-500 text-white"
            >
              Send Tx
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
