import React, { SetStateAction, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config";
import { RootState } from "../../redux/store";
import { uploadRecord } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { IRecords } from "../../pages/Home";

interface IProps {
  date: Date;
  setRecords: React.Dispatch<SetStateAction<IRecords>>;
}

const Modal: VFC<IProps> = ({ date, setRecords }) => {
  const [startHour, setStartHour] = useState("");
  const [startMin, setStartMin] = useState("");
  const [finishHour, setFinishHour] = useState("");
  const [finishMin, setFinishMin] = useState("");
  const [category, setCategory] = useState<string | undefined>("");
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  // console.log(currentUser);
  const getHour = Number(finishHour) - Number(startHour);
  const getMin = Number(finishMin) - Number(startMin);
  const total = 60 * getHour + getMin;
  const Date =
    String(date.getFullYear()) +
    String(date.getMonth()) +
    String(date.getDay());
  // console.log(typeof Date);
  const handleCategory = (e: React.SyntheticEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).dataset.id) return;
    setCategory((e.target as HTMLElement).dataset.id);
  };

  const handleSubmit = async () => {
    if (!startHour || !startMin || !finishHour || !finishMin)
      return setError("시간을 작성해주세요.");
    if (total <= 0) return setError("시간을 맞게 작성해주세요.");
    if (!category) return setError("카테고리를 선택해주세요.");

    setError("");
    // console.log(category);
    // console.log(total);
    const id = currentUser!._id;

    const data = {
      id,
      date: Date,
      category,
      total,
    };

    uploadRecord(dispatch, data);
    // try {
    //   const res = await axiosInstance.post("/records/post", {
    //     Date,
    //     category,
    //     total,
    //     id,
    //   });
    //   console.log(res.data);
    //   setRecords((prev: IRecords) );
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <div>
          <label>시작시간</label>
          <input
            maxLength={2}
            onChange={(e) => setStartHour(e.target.value)}
          />{" "}
          시{" "}
          <input maxLength={2} onChange={(e) => setStartMin(e.target.value)} />{" "}
          분
        </div>

        <div>
          <label>끝난시간</label>
          <input
            maxLength={2}
            onChange={(e) => setFinishHour(e.target.value)}
          />{" "}
          시{" "}
          <input maxLength={2} onChange={(e) => setFinishMin(e.target.value)} />{" "}
          분
        </div>
        <div>
          <button onClick={handleSubmit}>기록 작성</button>
        </div>
        {error && <div style={{ color: "red", fontWeight: 700 }}>{error}</div>}
      </div>
      <div>
        <div
          style={{ display: "flex", flexDirection: "row", margin: 0 }}
          onClick={handleCategory}
        >
          <button data-id="sleep" name="수면">
            수면
          </button>
          <button data-id="coding" name="휴식">
            코딩
          </button>
          <button data-id="exercise" name="코딩">
            운동
          </button>
          <button data-id="english" name="외국어 공부">
            영어공부
          </button>
          <button data-id="reading" name="독서">
            독서
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
