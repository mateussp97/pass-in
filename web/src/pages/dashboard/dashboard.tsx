import { AttendeeList } from "../../components/attendee-list";
import { Header } from "../../components/header";
import { ProtectedRoute } from "../../components/protected-route";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
        <Header />
        <AttendeeList />
      </div>
    </ProtectedRoute>
  );
}
