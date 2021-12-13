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
import "react-datepicker/dist/react-datepicker.css";

export interface IRecords {
  category?: [];
  data?: string;
  id?: string;
}

interface IList {
  sTime: string;
  fTime: string;
}

const Home: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState(new Date());
  const [list, setList] = useState<IList[]>([]);
  const [records, setRecords] = useState<IRecords>({});
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const { times } = useSelector((state: RootState) => state.record);
  const dispatch = useDispatch();
  const token = currentUser?.token;
  const id = currentUser?._id;

  const _data =
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
    getRecord(dispatch, { date: _data, id });
  }, [date, id, _data, dispatch]);

  const a = times.map((time: [], index: number) => time[index]);

  // let _list: any[] = [];

  const makeList = () => {
    for (let i = 0; i < a.length; i++) {
      console.log(a[i]);
      if (a[i]) {
        setList([...list, a[i]]);
      }
    }
    return;
  };

  useEffect(() => {
    makeList();
    console.log(list);
  }, []);

  // const showList = list?.map((list) => {
  //   return (
  //     <div>
  //       <span>33</span>
  //       <span>{list.sTime}</span>
  //       <span>{list.fTime}</span>
  //     </div>
  //   );
  // });

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <header
        style={{
          padding: "1.5rem",
          backgroundColor: "gainsboro",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              fontWeight: "650",
            }}
          >
            하루하루를 기록해보자
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <button
              style={{
                padding: "0.4rem",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <div>
          <DatePicker selected={date} onChange={(d: Date) => setDate(d)} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <h1>
            오늘의 기록
            <span style={{ marginLeft: "0.25rem", fontSize: "1rem" }}>
              {" "}
              (분 단위)
            </span>
          </h1>
          <Chart />
        </div>
        <div>
          <h2>오늘의 메모</h2>
          <Memo date={_data} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {toggle && <Modal date={date} setRecords={setRecords} />}
        {list.map((l) => {
          return (
            <div>
              <span>{l.sTime}</span>
              <span> ~ </span>
              <span>{l.fTime}</span>
            </div>
          );
        })}
      </div>
      <footer
        style={{
          fontSize: "32px",
          cursor: "pointer",
          padding: "0.7rem",
          backgroundColor: "gold",
          bottom: "0",
          display: "flex",
          justifyContent: "center",
          margin: "auto",
          width: "100%",
          position: "fixed",
        }}
        onClick={handleToggle}
      >
        <button
          style={{
            cursor: "pointer",
            border: "none",
            fontSize: "2rem",
            padding: "0 0.5rem",
            borderRadius: "0.8rem",
          }}
        >
          +
        </button>
      </footer>
    </>
  );
};

export default Home;
