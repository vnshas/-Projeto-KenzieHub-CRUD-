import { RoutesMain } from "./routes";
import "./styles/index.scss"

import { ToastContainer, toast } from 'react-toastify';

function App() {
  

  return (
    <>
      <ToastContainer autoClose={1500} limit={1} />
      <RoutesMain />
    </>
  )
}


export default App
