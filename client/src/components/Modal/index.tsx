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

  const handleCategory = useCallback((e: any) => {
    if (!e.target.dataset.id) return;
    setCategory(e.target.dataset.id);

    e.target.parentNode.childNodes.forEach(
      (el: any) => el.classList.remove("clicked"), // 기존에 선택되어져 있던 카테고리에 클래스 제거
    );
    e.target.classList.add("clicked"); // 새롭게 선택된 카테고리에 클래스 부여
  }, []);

  const getTime = useCallback(() => {
    return {
      Hour: Number(finishHour) - Number(startHour),
      Min: Number(finishMin) - Number(startMin),
    };
  }, [startHour, startMin, finishHour, finishMin]);

  const getDate = useCallback((date: Date): string => {
    return (
      String(date.getFullYear()) +
      String(date.getMonth() + 1) +
      String(date.getDate())
    );
  }, []);

  const timeCheck = useCallback((time: string, type: string = "") => {
    if (
      type === "hour"
        ? Number(time) < 0 || Number(time) > 24
        : Number(time) < 0 || Number(time) >= 60
    )
      return true;
  }, []);

  const blankCheck = useCallback(() => {
    if (
      !startHour.trim() ||
      !startMin.trim() ||
      !finishHour.trim() ||
      !finishMin.trim()
    )
      return true;
  }, [startHour, startMin, finishHour, finishMin]);

  const totalCheck = useCallback((total: number) => {
    if (total <= 0 || Number.isNaN(total)) return true;
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!category) return setError("카테고리를 선택해주세요.");
    const total = 60 * getTime().Hour + getTime().Min;

    if (
      totalCheck(total) ||
      blankCheck() ||
      timeCheck(startHour, "hour") ||
      timeCheck(startMin) ||
      timeCheck(finishHour, "hour") ||
      timeCheck(finishMin)
    )
      return setError("시간을 맞게 작성해주세요.");

    const data = {
      id: currentUser!._id,
      date: getDate(date),
      category,
      total,
      time: {
        sTime: `${startHour} : ${startMin}`,
        fTime: `${finishHour} : ${finishMin}`,
        category,
      },
    };

    handleToggle(); // 모달 닫기
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
              <button type="submit" className="submit" onClick={handleSubmit}>
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
