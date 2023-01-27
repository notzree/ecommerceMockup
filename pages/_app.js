import { StateContext } from '../context/StateContext'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Component {...pageProps} />
    </StateContext>
  
  )
}
