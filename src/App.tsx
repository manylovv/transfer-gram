import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';
import { getTransfer } from 'gram20-sdk/v2';
import { ElementRef, FormEvent, useEffect, useRef, useState } from 'react';

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const isConnected = !!useTonWallet();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [tick, setTick] = useState('');

  const sendTx = async (e: FormEvent) => {
    e.preventDefault();

    const {
      payload,
      address: tokenAddress,
      stateInit,
    } = await getTransfer({
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
          stateInit: stateInit,
        },
      ],
      validUntil: Math.floor(Date.now() / 1000) + 60,
    });

    setRecipient('');
    setAmount('');
    setTick('');
  };

  const firstInputRef = useRef<ElementRef<'input'>>(null);

  useEffect(() => {
    if (isConnected) {
      firstInputRef.current?.focus();
    }
  }, [isConnected]);

  return (
    <div>
      <div className="flex justify-end absolute w-full p-10">
        <TonConnectButton />
      </div>
      <div className="flex justify-center items-center pb-20 h-screen p-10">
        <form
          className="flex flex-col gap-2 p-10 w-[400px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={firstInputRef}
            placeholder="Recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="border px-4 p-2 rounded-full disabled:pointer-events-none disabled:opacity-70 focus:outline-sky-500"
            disabled={!isConnected}
          />
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border px-4 focus:outline-sky-500 p-2 rounded-full disabled:pointer-events-none disabled:opacity-70"
            disabled={!isConnected}
          />
          <input
            placeholder="Tick"
            value={tick}
            onChange={(e) => setTick(e.target.value)}
            className="border px-4 p-2 focus:outline-sky-500 rounded-full disabled:pointer-events-none disabled:opacity-70"
            disabled={!isConnected}
          />

          <button
            type="submit"
            onClick={sendTx}
            className="border px-4 p-2 rounded-full disabled:bg-sky-300 bg-sky-500 text-white"
            disabled={!isConnected}
          >
            Send Tx
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
