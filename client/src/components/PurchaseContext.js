import { Component, createContext, useState } from 'react';
import api from "../api";

const PurchaseContext = createContext({
    checkoutItemsCount: [],
    setCheckoutItemsCount: () => []
});

export default PurchaseContext;