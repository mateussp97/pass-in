import { Route, Routes } from "react-router-dom";
import GetTicket from "./pages/get-ticket/get-ticket";
import Home from "./pages/home/home";
import Register from "./pages/register/register";
import Ticket from "./pages/ticket/ticket";

export function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="ticket" element={<Ticket />} />
        <Route path="get-ticket" element={<GetTicket />} />
      </Route>
    </Routes>
  );
}
