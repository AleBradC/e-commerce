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
// import { I18nextProvider } from "react-i18next";
// import i18next from "i18next";

// i18next.init({
//   interpolation: { escapeValue: false },  // React already does escaping
// });

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as Element)

root.render(
  <React.StrictMode>
    {/*<I18nextProvider i18n={i18next}>*/}
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
    {/*</I18nextProvider>*/}
  </React.StrictMode>
)
