import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IRecord {
  sleep: number;
  coding: number;
  exercise: number;
  english: number;
  reading: number;
}

const Pie = () => {
  const {
    sleep = 0,
    coding = 0,
    exercise = 0,
    english = 0,
    reading = 0,
    times,
  } = useSelector((state: RootState) => state.record);

  const sum =
    Number(sleep) +
    Number(coding) +
    Number(exercise) +
    Number(english) +
    Number(reading);

  const series: number[] = [];
  const labels: string[] = [];

  const checkRecord = (props: IRecord) => {
    const entries = Object.entries(props);

    entries.map(
      (entry) => entry[1] > 0 && labels.push(entry[0]) && series.push(entry[1]),
    );
  };

  checkRecord({ sleep, coding, exercise, english, reading });

  // const showList = _list.map((list) => {
  //   return (
  //     <div>
  //       <span>33</span>
  //       <span>{list[0]}</span>
  //       <span>{list[1]}</span>
  //     </div>
  //   );
  // });

  return (
    <>
      <div>
        <Chart
          type="donut"
          series={sum ? [...series] : [1]}
          height={250}
          width={350}
          options={{
            labels: sum ? [...labels] : ["기록 없음"],
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      showAlways: true,
                      show: true,
                    },
                  },
                },
              },
            },
          }}
        />
      </div>
      {/* <div>{showList}</div> */}
    </>
  );
};

export default Pie;
