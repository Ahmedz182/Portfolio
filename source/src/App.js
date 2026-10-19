import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./pages/home/Index";
import Contact from "./pages/contact/Contact";
import Loading from "./components/Loading";
import About from "./pages/about/About";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, setPortfolioData, showLoading, ReloadFalse } from "./redux/rootSlice";
import AdminIndex from './adminPanel/AdminIndex';
import AdminLogin from './adminPanel/AdminLogin';
import Error from "./components/Error";
import { API_BASE } from "./config";

function App() {
  const dispatch = useDispatch();
  const { reload, loading, portfolioData, theme } = useSelector((state) => state.root);
  const [fetchFailed, setFetchFailed] = useState(false);

  const getPortfolio = async () => {
    try {
      setFetchFailed(false);
      // Only cover the screen on first load; a refresh keeps the old data visible.
      if (!portfolioData) dispatch(showLoading());
      const response = await axios.get(`${API_BASE}/portfolio/get-Portfolio`);
      dispatch(setPortfolioData(response.data));
    } catch (error) {
      console.error(error);
      if (!portfolioData) setFetchFailed(true);
    } finally {
      dispatch(hideLoading());
      dispatch(ReloadFalse());
    }
  };

  useEffect(() => {
    if (!portfolioData || reload) {
      getPortfolio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Storage blocked: the theme still applies for this visit.
    }
  }, [theme]);

  if (fetchFailed) {
    return (
      <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-primary dark:bg-bg-dark text-white px-6 text-center">
        <p className="text-lg font-semibold">Couldn't load the portfolio.</p>
        <p className="text-white/70 text-sm">The server may be waking up. Try again in a few seconds.</p>
        <button
          onClick={getPortfolio}
          className="mt-2 px-5 py-2 rounded border border-tertiary hover:bg-tertiary hover:text-primary transition-colors duration-200">
          Retry
        </button>
      </div>
    );
  }

  return (
    <Router>
      {loading ? <Loading /> : null}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminIndex />} />
        <Route path="/admin/:section" element={<AdminIndex />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
