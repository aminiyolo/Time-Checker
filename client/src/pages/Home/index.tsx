import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";

const Home: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  let TOKEN: string;

  if (currentUser) {
    const { token } = currentUser;
    TOKEN = token;
  }

  const handleClick = async () => {
    try {
      logout(dispatch, TOKEN);
    } catch (err) {
      console.log(err);
      alert("서버측에 오류로 잠시 후에 다시 시도해주세요.");
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <Modal />
        </div>
        <div>
          <button onClick={handleClick}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
