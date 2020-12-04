import React, { useState } from "react";

export const DealerBalance = async () => {

    const getBalance = await window.contract.methods.showBalance().call();
    console.log(getBalance);
    return getBalance;
};