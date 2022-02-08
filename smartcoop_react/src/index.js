import ReactDOM from 'react-dom';
import React from 'react';

import { DAppProvider, Config, Kovan } from '@usedapp/core'
import './App.css';
import App from './App'

const config = {
  readOnlyChainId: Kovan.chainId,
  readOnlyUrls: {
    [Kovan.chainId]: 'https://kovan.infura.io/v3/d95759f532d54ae58967e92d9ccccf95',
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

