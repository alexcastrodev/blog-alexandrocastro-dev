import { AppProps } from 'next/app'
import '../styles/index.css'
import { ClarityScript } from '../components/Clarity'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ClarityScript />
    </>
  )
}
