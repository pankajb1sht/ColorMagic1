import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useAuthStore } from './stores/authStore';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ImageExtractor from './pages/ImageExtractor';
import RandomPalette from './pages/RandomPalette';
import BackgroundRemoval from './pages/BackgroundRemoval';
import Profile from './pages/Profile';
import LikedPalettes from './pages/LikedPalettes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import './i18n';

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Toaster position="top-center" />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/image-extractor" element={<ImageExtractor />} />
            <Route path="/random-palette" element={<RandomPalette />} />
            <Route path="/background-removal" element={<BackgroundRemoval />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/liked" element={<LikedPalettes />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;