import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import { MantineProvider } from '@mantine/core';
import './index.scss'
import store from './store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
)
