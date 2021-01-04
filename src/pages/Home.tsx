import React, { useEffect, useState } from "react";
import { AddBet } from "../components/AddBet";
import { DealerBalance } from "../components/DealerBalance";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
    contract: any;
  }
}

export const Home = () => {
  const [balance, setBalance] = useState<number>(0);
  const [bet, setBet] = useState<number>(0);

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    const newBalance = await DealerBalance();
    setBalance(newBalance);
  };

  return (
    <div className="App">
      <main>
        <div>
          <div>
            <h2>Dealer balance = {balance}</h2>
          </div>
          <div>
            <h2>Set your bet:</h2>
        
            <input 
            type="number" 
            onChange={e => setBet(parseInt(e.target.value))}
            />
            <button onClick={() => AddBet(bet)}>add bet</button>

          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};
