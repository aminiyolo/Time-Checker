import React, { SetStateAction, useState, VFC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { uploadRecord } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { ModalWrapper, Error, Buttonwrapper, InputWrapper } from "./style";

interface IProps {
  date: Date;
  handleToggle: () => void;
}

const Modal: VFC<IProps> = ({ date, handleToggle }) => {
  const [startHour, setStartHour] = useState("");
  const [startMin, setStartMin] = useState("");
  const [finishHour, setFinishHour] = useState("");
  const [finishMin, setFinishMin] = useState("");
  const [category, setCategory] = useState<string | undefined>("");
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();
  const getHour = Number(finishHour) - Number(startHour);
  const getMin = Number(finishMin) - Number(startMin);
  const total = 60 * getHour + getMin;
  const Date =
    String(date.getFullYear()) +
    String(date.getMonth() + 1) +
    String(date.getDate());

  const sTime = `${startHour} : ${startMin}`;
  const fTime = `${finishHour} : ${finishMin}`;

  const handleCategory = (e: React.SyntheticEvent<HTMLElement>) => {
    if (!(e.target as HTMLElement).dataset.id) return;
    setCategory((e.target as HTMLElement).dataset.id);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!startHour || !startMin || !finishHour || !finishMin)
      return setError("시간을 작성해주세요.");
    if (total <= 0) return setError("시간을 맞게 작성해주세요.");
    if (!category) return setError("카테고리를 선택해주세요.");
    if (
      Number(startHour) > 24 ||
      Number(startMin) > 60 ||
      Number(finishHour) > 24 ||
      Number(finishMin) > 60
    )
      return setError("시간을 맞게 작성해주세요.");

    setError("");
    const id = currentUser!._id;
    const data = {
      id,
      date: Date,
      category,
      total,
      time: {
        sTime,
        fTime,
        category,
      },
    };

    handleToggle();
    uploadRecord(dispatch, data);
  };

  return (
    <ModalWrapper>
      <div>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <div>
              <label>시작 시간</label>{" "}
              <input
                maxLength={2}
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
              />{" "}
              :{" "}
              <input
                maxLength={2}
                onChange={(e) => setStartMin(e.target.value)}
              />{" "}
            </div>

            <div>
              <label>끝난 시간</label>{" "}
              <input
                maxLength={2}
                onChange={(e) => setFinishHour(e.target.value)}
              />{" "}
              :{" "}
              <input
                maxLength={2}
                onChange={(e) => setFinishMin(e.target.value)}
              />{" "}
            </div>
            <div>
              <button onClick={handleSubmit}>기록 작성</button>
            </div>
          </InputWrapper>
        </form>
        {error && <Error>{error}</Error>}
      </div>

      <Buttonwrapper>
        <div className="button" onClick={handleCategory}>
          {" "}
          {/* 이벤트 위임 */}
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
      </Buttonwrapper>
    </ModalWrapper>
  );
};

export default Modal;
