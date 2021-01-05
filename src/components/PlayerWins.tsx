export const PlayerWins = async () => {
    const log = await window.contract.events.PlayerWins();
    return log;
  };