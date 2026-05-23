import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import api from "./api/api";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import LoginPage from "./pages/Login";
import Protected from "./components/Protected";
import NewsFeed from "./pages/NewsFeed";
import NewsBot from "./pages/NewsBot";
import GuestRoutes from "./components/Guest";
import AllNews from "./pages/AllNews";
import BottomNav from "./components/BottomNav";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import EditNote from "./pages/EditNote";
import ComingSoon from "./pages/ComingSoon";
import Bookmarks from './pages/Bookmarks'

function App() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const syncClerkUser = async () => {
      if (isLoaded && isSignedIn && user) {
        const localToken = localStorage.getItem("token");
        if (!localToken) {
          try {
            const email = user.primaryEmailAddress?.emailAddress;
            const fullName = user.fullName || user.username || "Clerk User";
            const clerkId = user.id;

            const res = await api.post("auth/clerk-sync", {
              email,
              fullName,
              clerkId,
            });

            if (res.data.success && res.data.token) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("auth_provider", "clerk");
              // Refresh or redirect to feed so protected routes and api headers pick it up
              window.location.href = "/user/news-feed";
            }
          } catch (error) {
            console.error("Failed to sync Clerk user with backend:", error);
          }
        } else {
          if (!localStorage.getItem("auth_provider")) {
            localStorage.setItem("auth_provider", "clerk");
          }
        }
      }
    };

    syncClerkUser();
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    if (isLoaded && !isSignedIn && localStorage.getItem("auth_provider") === "clerk") {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_provider");
      window.location.href = "/user/login";
    }
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />

        {/* Guest Routes */}
        <Route element={<GuestRoutes />}>
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<Protected />}>
          <Route path="/user/news-feed" element={<NewsFeed />} />
          <Route path="/user/news-bot" element={<NewsBot />} />
          <Route path="/user/all-news" element={<AllNews />} />
          <Route path="/user/notes" element={<Notes />} />
          <Route path="/user/create-note/" element={<CreateNote />} />
          <Route path="/user/edit-note/:id" element={<EditNote />} />
          <Route path="/user/bookmarks" element={<Bookmarks />} />
        </Route>
        
        {/* Fallback Coming Soon / 404 Route */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>

      {/* BottomNav is NOW inside Router context */}
      <BottomNav />
    </>
  );
}

export default App;

