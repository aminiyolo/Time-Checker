import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config";
import { RootState } from "../../redux/store";

interface IProps {
  date: string;
}

const Memo: React.VFC<IProps> = ({ date }) => {
  const [memo, setMemo] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.user);
  const id = currentUser?._id;

  const handleClick = async (e: React.SyntheticEvent) => {
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
      <textarea
        style={{ width: "17rem", height: "12rem" }}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <div>
        <button onClick={handleClick}>메모 저장</button>
      </div>
    </div>
  );
};

export default Memo;
