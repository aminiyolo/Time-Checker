import Chart from "react-apexcharts";

const Pie = () => {
  return (
    <div>
      <Chart
        type="pie"
        series={[23, 20, 40, 20, 50]}
        height={400}
        width={600}
        options={{ labels: ["수면", "코딩", "운동", "영어공부", "독서"] }}
      />
    </div>
  );
};

export default Pie;
