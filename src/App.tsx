import { RoutesMain } from "./routes"
import "./styles/index.scss"

import { ToastContainer,} from 'react-toastify'

function App() {
  

  return (
    <>
      <ToastContainer autoClose={1500} limit={3} />
      <RoutesMain />
    </>
  )
}


export default App
