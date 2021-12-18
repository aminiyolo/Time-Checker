import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config";
import { RootState } from "../../redux/store";
import { Textarea, BtnContainer } from "./style";

interface IProps {
  date: string;
}

const Memo: React.VFC<IProps> = ({ date }) => {
  const [memo, setMemo] = useState<string>("");
  const { currentUser } = useSelector((state: RootState) => state.user);
  const id = currentUser?._id;

  const handleClick = async () => {
    try {
      await axiosInstance.post("/memos/post", { memo, id, date });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get("/memos/get", {
        params: { date, id },
      });

      setMemo(res.data?.memo ? res.data?.memo : "");
    };

    getData();
  }, [date, id]);

  return (
    <div>
      <Textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
      <BtnContainer>
        {memo === "" && <button onClick={handleClick}>메모 저장</button>}
        {memo && <button onClick={handleClick}>메모 수정</button>}
      </BtnContainer>
    </div>
  );
};

export default Memo;
