import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../hooks/AuthProvider';
const Header = ({username}) => {
  const navigate = useNavigate();
  const { Logout, userData } =useAuth();

  const handleLogout = async () => {
    await Logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-semibold">
        Task Manager
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout {userData.display_name}
      </button>
    </div>
  );
};

export default Header;