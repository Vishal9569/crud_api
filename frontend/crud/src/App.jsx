import "./App.css"
import { BrowserRouter , Routes , Route  } from "react-router-dom"
import AllUser from "./pages/AllUser";
import  AddUser from "./pages/AddUser"
function App() {

  return (
    <>
       <BrowserRouter>
       <Routes>
     <Route path="/all-users" element={<AllUser />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<AddUser />} /> 
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
