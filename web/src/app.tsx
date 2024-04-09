import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import GetTicket from "./pages/get-ticket/get-ticket";
import Register from "./pages/register/register";
import SignIn from "./pages/sign-in/sign-in";
import Ticket from "./pages/ticket/ticket";

export function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SignIn />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="ticket" element={<Ticket />} />
        <Route path="get-ticket" element={<GetTicket />} />
      </Route>
    </Routes>
  );
}
