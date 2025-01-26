import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/StudentsPage';
import NotFound from './pages/NotFound';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router basename='/Student-Management'>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/students" /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/students" /> : <LoginPage />}
        />
        <Route
          path="/students"
          element={user ? <StudentsPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
