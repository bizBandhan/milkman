import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import './index.css'
import "./App.css";
import {Routes} from "./Routes"
import { Providers } from "./context"
createRoot(document.getElementById('root'))
  .render(
    <StrictMode>
      <Providers>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Providers>
    </StrictMode>,
  )
