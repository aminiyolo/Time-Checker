import React, { useCallback, useState, VFC } from "react";
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
  const [startHour, setStartHour] = useState<string>("");
  const [startMin, setStartMin] = useState<string>("");
  const [finishHour, setFinishHour] = useState<string>("");
  const [finishMin, setFinishMin] = useState<string>("");
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

  const handleCategory = useCallback((e: any) => {
    if (!e.target.dataset.id) return;
    setCategory(e.target.dataset.id);

    // 이벤트 위임을 통한 선택된 카테고리 관리
    e.target.parentNode.childNodes.forEach((el: any) =>
      el.classList.remove("clicked"),
    );

    e.target.classList.add("clicked");
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!category) return setError("카테고리를 선택해주세요.");

    if (
      total <= 0 ||
      isNaN(total) ||
      !startHour.trim() ||
      !startMin.trim() ||
      !finishHour.trim() ||
      !finishMin.trim() ||
      Number(startHour) > 24 ||
      Number(startHour) < 0 ||
      Number(startMin) >= 60 ||
      Number(startMin) < 0 ||
      Number(finishHour) > 24 ||
      Number(finishHour) < 0 ||
      Number(finishMin) >= 60 ||
      Number(finishMin) < 0
    )
      return setError("시간을 맞게 작성해주세요.");

    const id = currentUser!._id;
    const sTime = `${startHour} : ${startMin}`;
    const fTime = `${finishHour} : ${finishMin}`;

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
                onChange={(e) => setStartHour(e.target.value)}
                // type="number"
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
              <button className="submit" onClick={handleSubmit}>
                기록 작성
              </button>
            </div>
          </InputWrapper>
        </form>
        {error && <Error>{error}</Error>}
      </div>

      <Buttonwrapper>
        <div className="button" onClick={handleCategory}>
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
