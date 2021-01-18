import React, { useEffect, useState } from "react";
import { AddBet } from "../components/AddBet";
import { DealerBalance } from "../components/DealerBalance";
import { DealerDiceResult } from "../components/DealerDiceResult";
import { PayOut } from "../components/PayOut";
import { PlayerDiceResult } from "../components/PlayerDiceResult";
import { PlayerWins } from "../components/PlayerWins";
import { QueryId } from "../components/QueryId";
import { RollDice } from "../components/RollDice";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
    contract: any;
    IpfsHttpClient: any;
  }
}

export const Home = () => {
  const [balance, setBalance] = useState<number>(0);
  const [bet, setBet] = useState<number>(0);
  const [dealerResult, setDealerResult] = useState<number>(0);
  const [playerResult, setPlayerResult] = useState<number>(0);
  const [queryId, setQueryId] = useState<string>();
  const [playerWinsLog, setPlayerWinsLog] = useState<string>();


  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    const newBalance = await DealerBalance();
    setBalance(newBalance);
  };

  const getDealerDiceResult = async () => {
    const diceResult = await DealerDiceResult();
    setDealerResult(diceResult);
  };

  const getPlayerDiceResult = async () => {
    const diceResult = await PlayerDiceResult();
    setPlayerResult(diceResult);
  };

  const getQueryId = async () => {
    const id = await QueryId();
    setQueryId(id);
  };

  const getPlayerWins = async () => {
    const eventLog = await PlayerWins();
    setPlayerWinsLog(eventLog);
  };

  return (
    <main className="App">
      <div>
        <p>Log:</p>
        <p>{playerWinsLog}</p>
        <button onClick={() => getPlayerWins()}>update log</button>

      </div>

      <h2>Dealer balance = {balance}</h2>
      <button onClick={() => getBalance()}>
          update balance
        </button>

      <div>
        <h2>Set your bet:</h2>
        <input
          type="number"
          onChange={(e) => setBet(parseInt(e.target.value))}
        />
        <button onClick={() => AddBet(bet)}>add bet</button>
      </div>

      <div>
        <button onClick={() => RollDice()}>roll dice</button>
        <p>Dealer dice result = {dealerResult}</p>
        <button onClick={() => getDealerDiceResult()}>
          get the dealer dice result
        </button>
        <p>Your dice result = {playerResult}</p>
        <button onClick={() => getPlayerDiceResult()}>
          get your dice result
        </button>
        <p>Query ID = {queryId}</p>
        <button onClick={() => getQueryId()}>show query id</button>
      </div>

      <button onClick={() => PayOut()}>pay out</button>

    </main>
  );
};
