export const QueryId = async () => {
    const id = await window.contract.methods.queryId().call();
    return id;
  };