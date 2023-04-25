import React from 'react'
import App from './App'
import './index.css'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './theme/themes'
import GlobalStyle from './theme/GlobalStyle'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as Element)

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
