import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-brand">
          Study Planner
        </Link>

        <div className="navbar-menu">

          <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`}>
            Dashboard
          </Link>

          <Link to="/subjects" className={`navbar-link ${isActive('/subjects') ? 'active' : ''}`}>
            Subjects
          </Link>

          {/* 🔥 LEARNING BUTTON */}
          <button
            onClick={() => navigate("/learning")}
            className="navbar-link"
            style={{ background: "none"}}
          >
            Learning
          </button>

          <Link to="/tasks" className={`navbar-link ${isActive('/tasks') ? 'active' : ''}`}>
            Tasks
          </Link>

          <Link to="/schedule" className={`navbar-link ${isActive('/schedule') ? 'active' : ''}`}>
            Schedule
          </Link>

          <Link to="/notes" className={`navbar-link ${isActive('/notes') ? 'active' : ''}`}>
            Notes
          </Link>

          {/* ✅ NEW FEATURE ADDED HERE */}
          <Link to="/custom-schedule" className={`navbar-link ${isActive('/custom-schedule') ? 'active' : ''}`}>
             Custom Schedule
          </Link>

          <Link to="/settings" className={`navbar-link ${isActive('/settings') ? 'active' : ''}`}>
            Settings
          </Link>

        </div>

        <div className="navbar-user">
          <span className="navbar-user-name">{user?.name}</span>

          <button onClick={logout} className="btn btn-sm btn-outline">
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;