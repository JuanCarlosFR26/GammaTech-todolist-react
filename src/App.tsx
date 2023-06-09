import Layout from "./Layout/Layout";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todolist from "./components/Todolist";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Todolist />} />
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
