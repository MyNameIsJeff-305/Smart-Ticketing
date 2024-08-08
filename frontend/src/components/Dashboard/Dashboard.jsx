import { useEffect } from 'react';
import './Dashboard.css';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionUser) {
      navigate('/');
    }
  }, [sessionUser, navigate]);

  return (
      <main>
        <h1>Dashboard</h1>
        <h2>Welcome!</h2>
      </main>
    );
}

export default Dashboard;