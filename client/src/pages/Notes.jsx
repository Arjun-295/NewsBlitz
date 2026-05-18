import { Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import NoteBox from "../components/NoteBox";
import api from "../api/api";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Notes() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const paginationPost = async () => {
    const response = await api.get(
      `notes/pagination?page=${page}&limit=5`,
    );
    setPosts(response.data.posts);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    paginationPost();
  }, [page]);

  const fetchAllNotes = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await api.get("notes/getAllNotes/");
      setNotes(response.data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllNotes();
  }, []);

  console.log(notes);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#454955] via-[#2e3032] to-[#1f2123] text-white pb-28">
      <div className="max-w-full pt-7">
        <Navbar />
      </div>
      <div className="h-[70vh] overflow-y-auto custom-scroll">
        <div className="max-w-7xl mx-auto px-4 mt-5 mb-4 flex justify-between">
          <h1 className="text-4xl font-bold tracking-wide px-4 py-6">Notes</h1>
          <button className="flex items-center gap-2 text-xl font-bold tracking-wide leading-none bg-[#1f2123] px-6 border-black rounded-lg hover:text-black hover:bg-white hover:duration-500">
            <Plus className="h-6 w-6 align-middle" /> <span>Create New</span>
          </button>
        </div>
        {loading && <Loading />}
        {error && <Error />}
        <div className="max-w-7xl mx-auto mt-8 px-5">
          <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {!loading &&
              !error &&
              posts.map((post) => (
                <NoteBox key={post._id}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </NoteBox>
              ))}
          </div>
        </div>
      </div>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Notes;
