import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthProvider } from './contexts/authContext';
import { BudgetProvider } from './contexts/budgetContext';
import { ChakraProvider } from '@chakra-ui/react'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Router>
    <AuthProvider>
      <BudgetProvider>
      <ChakraProvider>
        <App />
        </ChakraProvider>
      </BudgetProvider> 
    </AuthProvider>
    </Router>
 
);
