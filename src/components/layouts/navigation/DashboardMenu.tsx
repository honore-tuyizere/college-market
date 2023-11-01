import { Link } from "react-router-dom";

const DashboardMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link to='/logout'>Log Out</Link>
        </li>
        {/* more links */}
      </ul>
    </nav>
  );
};

export default DashboardMenu;
