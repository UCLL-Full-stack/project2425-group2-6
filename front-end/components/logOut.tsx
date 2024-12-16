import { useRouter } from 'next/router';

const LogOut: React.FC = () => {
  const router = useRouter();

  const handleLogOut = () => {
    sessionStorage.removeItem('loggedInUser');
    router.push('/');
  };

  return (
    <button onClick={handleLogOut}>
      Log Out
    </button>
  );
};

export default LogOut;