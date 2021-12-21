import { useCallback, useEffect, useRef, useState } from "react";
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
  SpinnerWrapper,
  Block,
} from "./style";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../../components/Spinner";

interface ITime {
  sTime: string;
  fTime: string;
  category: string;
}

const Home: React.FC = () => {
  const [toggle, setToggle] = useState<Boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { times, isFetching } = useSelector((state: RootState) => state.record);
  const modalFocus = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const _date =
    String(date.getFullYear()) +
    String(date.getMonth() + 1) +
    String(date.getDate());

  const handleLogout = async () => {
    const token = currentUser?.token;

    if (!token) return; // early exit
    try {
      logout(dispatch, token);
    } catch (err) {
      alert("서버측에 오류로 잠시 후에 다시 시도해주세요.");
    }
  };

  const handleToggle = useCallback(() => {
    setToggle((toggle) => !toggle);
  }, []);

  useEffect(() => {
    const id = currentUser?._id;
    if (!id) return;
    getRecord(dispatch, { date: _date, id });
  }, [date, _date, dispatch, currentUser?._id]);

  useEffect(() => {
    toggle &&
      modalFocus.current?.scrollIntoView({
        behavior: "smooth",
      });
  }, [toggle]);

  if (isFetching) {
    return (
      <SpinnerWrapper>
        <h1>Loading...</h1>
        <div>
          <Spinner />
        </div>
      </SpinnerWrapper>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header>
        <div className="title">기억보다는 기록을 남기자</div>
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
      <Block />
      <DataWrapper>
        <div className="record">
          <h1>
            오늘의 기록
            <span className="min"> (분 단위)</span>
          </h1>
          <div className="chart">
            <Chart />
          </div>
        </div>
        <div className="memo">
          <h2>오늘의 메모</h2>
          <Memo date={_date} />
        </div>
      </DataWrapper>
      <ModalWrapper>
        {toggle && <Modal date={date} handleToggle={handleToggle} />}
      </ModalWrapper>

      <TimeWrapper>
        {!toggle &&
          times[0] &&
          times.flat().map((time: ITime, index: number) => {
            return (
              <div className="container" key={index}>
                <span>{time.sTime}</span>
                <span> ~ </span>
                <span>{time.fTime}</span>
                <span className="category"> / 카테고리: {time.category}</span>
              </div>
            );
          })}
      </TimeWrapper>
      <Footer onClick={handleToggle}>
        <button>+</button>
      </Footer>
      <div ref={modalFocus}></div>
    </>
  );
};

export default Home;
