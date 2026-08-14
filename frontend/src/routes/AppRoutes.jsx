import { Routes, Route } from "react-router-dom";

import MatchDetails from "../pages/MatchDetails";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Matches from "../pages/Matches";
import MyTickets from "../pages/MyTickets";
import Login from "../pages/Login";
import ActiveReservations from "../pages/ActiveReservations";
import History from "../pages/History";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRoute from "../components/AdminRoute";
import AdminPayments from "../pages/AdminPayments";
import AdminReservations from "../pages/AdminReservations";
import AdminReports from "../pages/AdminReports";
import AdminMatches from "../pages/AdminMatches";
import CreateMatch from "../pages/CreateMatch";
import EditMatch from "../pages/EditMatch";
import VerifySignUp from "../pages/VerifySignUp";
import SearchTickets from "../pages/SearchTickets";
import EditProfile from "../pages/EditProfile";
import NotFound from "../pages/NotFound";

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/my-tickets" element={<MyTickets />} />
      <Route path="/matches/:match_id" element={<MatchDetails />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/active-reservations" 
        element={<ActiveReservations />}
      />
      <Route
        path="/history"
        element={<History />}
      />
      <Route
          path="/admin"
          element={
              <AdminRoute>
                  <AdminDashboard />
              </AdminRoute>
          }
      />

      <Route
        path="/admin/payments"
        element={
            <AdminRoute>
                <AdminPayments />
            </AdminRoute>
        }
      />

      <Route
        path="/admin/reservations"
        element={
            <AdminRoute>
                <AdminReservations />
            </AdminRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
            <AdminRoute>
                <AdminReports />
            </AdminRoute>
        }
      />

      <Route
        path="/admin/matches"
        element={
            <AdminRoute>
                <AdminMatches />
            </AdminRoute>
        }
      />

      <Route
        path="/admin/matches/create"
        element={
            <AdminRoute>
                <CreateMatch />
            </AdminRoute>
        }
      />

      <Route
        path="/admin/matches/:match_id/edit"
        element={
            <AdminRoute>
                <EditMatch />
            </AdminRoute>
        }
      />

      <Route
        path="/signup/verify"
        element={<VerifySignUp />}
      />

      <Route
        path="/search-tickets"
        element={<SearchTickets />}
      />

      <Route
        path="/edit-profile"
        element={<EditProfile />}
      />

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

}


export default AppRoutes;