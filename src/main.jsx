import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/output.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import Root from './Root';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme accentColor="orange" grayColor='slate' panelBackground="solid" scaling="100%" radius='medium' appearance="dark" >
      <Root />
    </Theme>
  </React.StrictMode>,
)
