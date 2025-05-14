//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { DataProvider } from './Components/DataProvider/DataProvider.jsx'
import {initialState, reducer} from './Utility/reducer'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
    
</React.StrictMode>

)