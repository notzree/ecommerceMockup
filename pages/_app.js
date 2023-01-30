import { StateContext } from '../context/StateContext'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/navBar'
export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Navbar/>
      <Component {...pageProps} />
      <Toaster/>
    </StateContext>
  
  )
}
