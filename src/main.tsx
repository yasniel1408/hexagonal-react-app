import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './infrastructure/adapters/primary/ui/App.tsx'
import './index.css'
import {Provider} from "react-redux";
import {setupStore} from "./infrastructure/adapters/secondary/redux/redux.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={setupStore()}>
         <App />
      </Provider>
  </React.StrictMode>,
)
