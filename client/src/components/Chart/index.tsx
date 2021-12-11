import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Pie = () => {
  const {
    sleep = 0,
    coding = 0,
    exercise = 0,
    english = 0,
    reading = 0,
  } = useSelector((state: RootState) => state.record);
  // const keys = list.map((l: object) => Object.keys(l));
  // const values = list.map((l: object) => Object.values(l));
  // const options = keys.map((o: [number]) => o[0]);
  // const series = values.map((s: [number]) => s[0]);
  // console.log(list.map((l: object) => l );
  console.log(sleep, coding, exercise, english, reading);
  const sum =
    Number(sleep) +
    Number(coding) +
    Number(exercise) +
    Number(english) +
    Number(reading);
  const series = [sleep, coding, exercise, english, reading];
  console.log(sum);

  // console.log(options);
  // console.log(series);

  return (
    <div>
      <Chart
        type="pie"
        // series={[23, 20, 40, 20, 50]}
        series={sum ? [...series] : [0]}
        height={200}
        width={300}
        options={{ labels: ["수면", "코딩", "운동", "영어공부", "독서"] }}

        // options={
        //   {
        //     labels: options.length ? [...options] : ["기록 없음"],
        //   }
        // }
      />
    </div>
  );
};

export default Pie;
