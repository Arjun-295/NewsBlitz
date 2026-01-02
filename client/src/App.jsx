import { Routes, Route } from "react-router-dom";
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

function App() {
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
        </Route>
      </Routes>

      {/* BottomNav is NOW inside Router context */}
      <BottomNav />
    </>
  );
}

export default App;
