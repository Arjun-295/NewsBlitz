import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteBox from "../components/NoteBox";
import api from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Notes() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const paginationPost = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await api.get(
        `notes/pagination?page=${page}&limit=6`
      );
      setPosts(response.data.posts || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching paginated notes:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    paginationPost();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`notes/deleteNote/${id}`);
      paginationPost();
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white relative overflow-hidden pb-32">
      {/* 🔮 Aesthetic Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/2 translate-y-1/2 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto pt-6 px-6 relative z-20">
        <Navbar />
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 mt-14 mb-8 relative z-10 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">
            My <span className="text-cyan-400 font-extrabold">Notes</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Jot down technical insights, architectures, or bookmarks.
          </p>
        </div>

        <button
          onClick={() => navigate("/user/create-note/")}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-400/25 transition duration-300 active:scale-95"
        >
          <Plus className="h-4 w-4" /> <span>Create New</span>
        </button>
      </div>

      {/* Grid container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {loading && (
          <div className="py-24 text-center">
            <Loading />
          </div>
        )}
        {error && (
          <div className="py-24 text-center">
            <Error />
          </div>
        )}

        {!loading && !error && posts.length === 0 ? (
          <div className="text-center py-20 bg-[#16181d]/90 backdrop-blur-md border border-white/5 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <p className="text-xl font-bold text-gray-300 mb-4">No architectural notes yet.</p>
            <button
              onClick={() => navigate("/user/create-note/")}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-lg hover:shadow-cyan-400/20"
            >
              Add your first note
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {!loading &&
              !error &&
              posts.map((post) => (
                <NoteBox
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  description={post.description}
                  onDelete={handleDelete}
                  onEdit={(id) => navigate(`/user/edit-note/${id}`)}
                />
              ))}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 relative z-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 py-2 bg-[#16181d] border border-white/5 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#16181d] disabled:hover:text-gray-300 transition duration-200 shadow-md active:scale-95"
          >
            Prev
          </button>

          <span className="text-xs font-extrabold bg-[#16181d] px-5 py-2.5 rounded-xl border border-white/5 text-cyan-400 tracking-wider shadow-md">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-5 py-2 bg-[#16181d] border border-white/5 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white/5 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#16181d] disabled:hover:text-gray-300 transition duration-200 shadow-md active:scale-95"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Notes;
