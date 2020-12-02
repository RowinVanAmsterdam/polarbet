import React from 'react';
import './assets/css/import.scss';
import { load } from './components/web3';

declare global {
  interface Window {
      ethereum:any;
      web3:any;
      contract:any;
  }
}

export const PolarBet = () => {
  load();

  return (
    <div className="App">
      <header className="app-header">
        <h1>PolarBet</h1>
      </header>
      <main>
        <div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

