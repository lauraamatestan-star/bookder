import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { LikesProvider } from './context/LikesContext';
import { I18nProvider } from './context/I18nContext';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <I18nProvider>
          <LikesProvider>
            <App />
          </LikesProvider>
        </I18nProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
