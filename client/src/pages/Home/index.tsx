import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import Chart from "../../components/Chart/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface IRecords {
  category?: [];
  data?: string;
  id?: string;
}

const Home: React.FC = () => {
  // const { currentUser } = useSelector((state: RootState) => state);
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState(new Date());
  const [records, setRecords] = useState<IRecords>({});
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const token = currentUser?.token;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (!token) return; // early exit
    try {
      logout(dispatch, token);
    } catch (err) {
      console.log(err);
      alert("서버측에 오류로 잠시 후에 다시 시도해주세요.");
    }
  };

  const handleToggle = () => {
    setToggle((toggle) => !toggle);
  };

  // useEffect(() => {
  //   console.log(records);
  // }, [records]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <DatePicker selected={date} onChange={(d: Date) => setDate(d)} />
        </div>
      </header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <h1>Chart</h1>
          <Chart />
        </div>

        <div>{toggle && <Modal date={date} setRecords={setRecords} />}</div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <footer
        style={{ fontSize: "32px", cursor: "pointer" }}
        onClick={handleToggle}
      >
        +
      </footer>
    </div>
  );
};

export default Home;
