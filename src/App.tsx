import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
// import { beginCell } from 'ton-core';
import TonWeb from 'tonweb';

function App() {
  const [tonConnectUI] = useTonConnectUI();

  const sendMessage = async () => {
    const a = new TonWeb.boc.Cell();
    a.bits.writeUint(0, 32);
    a.bits.writeString('TON Connect 2 tutorial!');
    const payload = TonWeb.utils.bytesToBase64(await a.toBoc());

    const myTransaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address: 'EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn',
          amount: '60000000',
          payload: payload,
        },
      ],
    };

    await tonConnectUI.sendTransaction(myTransaction);
  };
  return (
    <div className="flex justify-end p-20">
      <div className="flex gap-2">
        <button onClick={sendMessage} className="bg-gray-300 w-40 rounded-full">
          Send message
        </button>

        <TonConnectButton />
      </div>
    </div>
  );
}

export default App;
