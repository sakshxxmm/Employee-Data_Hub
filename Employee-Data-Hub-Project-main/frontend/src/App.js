import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <div className="overflow-x-hidden ">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addemployee" element={<CreateEmployeePage />} />
        <Route path="/editemployee/:userId" element={<EditEmployee/>}/>
      </Routes>
    </div>
  );
}

export default App;
