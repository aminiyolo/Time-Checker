import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../../redux/store";
import { logout, getRecord } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import Modal from "../../components/Modal";
import Chart from "../../components/Chart/index";
import DatePicker from "react-datepicker";
import Memo from "../../components/Memo";
import {
  Header,
  Footer,
  DatePickerWrapper,
  DataWrapper,
  ModalWrapper,
  TimeWrapper,
} from "./style";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

interface ITime {
  sTime: string;
  fTime: string;
  category: string;
}

const Home: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState(new Date());
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { times } = useSelector((state: RootState) => state.record);
  const dispatch = useDispatch();
  const token = currentUser?.token;
  const id = currentUser?._id;

  const _date =
    String(date.getFullYear()) +
    String(date.getMonth() + 1) +
    String(date.getDate());

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

  useEffect(() => {
    if (!id) return;
    getRecord(dispatch, { date: _date, id });
  }, [date, id, _date, dispatch]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header>
        <div className="title">기억보다는 기록을...</div>
        <div className="buttonContainer">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </Header>

      <DatePickerWrapper>
        <div>
          <DatePicker
            className="picker"
            selected={date}
            onChange={(date: Date) => setDate(date)}
          />
        </div>
      </DatePickerWrapper>
      <hr />
      <DataWrapper>
        <div className="record">
          <h1>
            오늘의 기록
            <span className="min"> (분 단위)</span>
          </h1>
          <Chart />
        </div>
        <div>
          <h2>오늘의 메모</h2>
          <Memo date={_date} />
        </div>
      </DataWrapper>
      <ModalWrapper>
        {toggle && <Modal date={date} handleToggle={handleToggle} />}
        <TimeWrapper>
          {!toggle &&
            times[0] &&
            times.flat().map((time: ITime, index: number) => {
              return (
                <div className="container">
                  <div key={index}>
                    <span>{time.sTime}</span>
                    <span> ~ </span>
                    <span>{time.fTime}</span>
                    <span className="category">
                      / 시간 기록: {time.category}
                    </span>
                  </div>
                </div>
              );
            })}
        </TimeWrapper>
      </ModalWrapper>
      <Footer onClick={handleToggle}>
        <button>+</button>
      </Footer>
    </>
  );
};

export default Home;
