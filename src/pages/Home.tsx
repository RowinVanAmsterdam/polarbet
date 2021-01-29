import React, { useEffect, useState } from "react";
import { AddBet } from "../components/AddBet";
import { DealerBalance } from "../components/DealerBalance";
import { DealerDiceResult } from "../components/DealerDiceResult";
import { PayOut } from "../components/PayOut";
import {
  SetUserDiceResult,
  UserDiceResult,
} from "../components/PlayerDiceResult";
import { QueryId } from "../components/QueryId";
import { RollDice } from "../components/RollDice";
import { RandomResult } from "../components/RandomResult";

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
  const [userResult, setUserResult] = useState<number>(0);
  const [queryId, setQueryId] = useState<string>();
  const [OracleResult, setOracleResult] = useState<string>("0000");

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

  const getUserDiceResult = async () => {
    const diceResult = await UserDiceResult();
    setUserResult(diceResult);
  };

  const setsUserDiceResult = async () => {
    await SetUserDiceResult();
    console.log("Your dice result is set");
  };

  const getRandomResult = async () => {
    const randomResult = await RandomResult();
    setOracleResult(randomResult);
  };

  const getQueryId = async () => {
    const id = await QueryId();
    console.log(id);
    setQueryId(id);
  };

  return (
    <main className="App">
      <section className="game-section">
        <h2 className="game-section__title">Polarbet the game</h2>

        <div className="game-section__dealer game-column">
          <h3 className="game-column__title game-column__title--dealer">
            Dealer
          </h3>
          <p className="game-column__result">{dealerResult}</p>
          <button
            className="game-column__button game-column__button--lime"
            onClick={() => getDealerDiceResult()}
          >
            show result
          </button>
        </div>

        <div className="game-section__default game-column">
          <div className="game-column__c2a-wrapper">
            <p>Dealer balance</p>
            <p>{balance}</p>
            <button
              className="game-column__button--regular"
              onClick={() => getBalance()}
            >
              update balance
            </button>
          </div>

          <div className="game-column__c2a-wrapper">
            <p>Set your bet:</p>
            <input
              className="game-column__input"
              type="number"
              placeholder="2"
              onChange={(e) => setBet(parseInt(e.target.value))}
            />
            <button
              className="game-column__button--regular"
              onClick={() => AddBet(bet)}
            >
              add bet
            </button>
          </div>

          <div className="game-column__c2a-wrapper">
            <p>Result from oracle</p>
            <p>{OracleResult}</p>
            <button
              className="game-column__button--regular"
              onClick={() => getRandomResult()}
            >
              show result
            </button>
          </div>

          <div className="game-column__c2a-wrapper">
            <p>Query ID</p>
            <p>{queryId}</p>
            <button
              className="game-column__button--regular game-column__button--query-id"
              onClick={() => getQueryId()}
            >
              show query id
            </button>
          </div>

          <div className="game-column__play-button-wrapper">
            <button
              className="game-column__button--regular"
              onClick={() => RollDice()}
            >
              roll dice
            </button>
            <button
              className="game-column__button--regular"
              onClick={() => PayOut()}
            >
              pay out
            </button>
          </div>
        </div>

        <div className="game-section__player game-column">
          <h3 className="game-column__title game-column__title--player">You</h3>
          <p className="game-column__result">{userResult}</p>
          <button
            className="game-column__button game-column__button--teal"
            onClick={() => setsUserDiceResult()}
          >
            get result
          </button>
          <button
            className="game-column__button game-column__button--teal"
            onClick={() => getUserDiceResult()}
          >
            show result
          </button>
        </div>
      </section>

      {/* 
      <h2>Dealer balance = {balance}</h2>
      <button onClick={() => getBalance()}>update balance</button> */}

      {/* <div>
        <h2>Set your bet:</h2>
        <input
          type="number"
          onChange={(e) => setBet(parseInt(e.target.value))}
        />
        <button onClick={() => AddBet(bet)}>add bet</button>
      </div> */}

      {/* <div> */}
      {/* <button onClick={() => RollDice()}>roll dice</button> */}
      {/* <p>Dealer dice result = {dealerResult}</p>
        <button onClick={() => getDealerDiceResult()}>
          show the dealer dice result
        </button> */}
      {/* <p>Your dice result = {userResult}</p>
        <button onClick={() => setsUserDiceResult()}>
          get your dice result
        </button> */}
      {/* <button onClick={() => getUserDiceResult()}>
          show your dice result
        </button> */}

      {/* <p>Random result from oracle = {OracleResult}</p>
        <button onClick={() => getRandomResult()}>show the result</button>

        <p>Query ID = {queryId}</p>
        <button onClick={() => getQueryId()}>show query id</button>
      </div>

      <button onClick={() => PayOut()}>pay out</button> */}
    </main>
  );
};
