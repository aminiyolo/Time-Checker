import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config";
import { RootState } from "../../redux/store";
import { Textarea, BtnContainer } from "./style";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast("저장 완료");
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
        <button onClick={handleClick}>메모 저장</button>
        <ToastContainer autoClose={2000} />
      </BtnContainer>
    </div>
  );
};

export default Memo;
