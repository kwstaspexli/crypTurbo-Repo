import React,{useState} from "react"
import { useSelector } from "react-redux"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import CircularProgress from '@mui/material/CircularProgress';

// https://www.chartjs.org/docs/latest/charts/line.html
// https://www.chartjs.org/docs/latest/
// line Styling


function LineChart({ chartData,flag }) {

  const currency = useSelector((state) => state.currency.currency);
  const days = useSelector((state) => state.days.days);

  return (<div>
    {!chartData || flag===false ? (
    <CircularProgress size="80px"/>
  ) : (
  <Line
  data={{
          labels: chartData.map((coin) => {
              let date = new Date(coin[0]);
              let time =  date.getHours() > 12
          ? `${date.getHours() - 12} PM`
          : `${date.getHours()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
      // 1 day -> show hours
      // more than one day -> show days
    }),

  datasets: [
      {
        data: chartData.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days ) in ${currency.name}`,
        borderWidth: 4,
        borderColor: "#4d4dff",
        pointBorderWidth: 0,
        pointHoverBorderWidth:5,
        pointHoverBackgroundColor:"#8080ff",

      },
    ],
  }}
  options={{
      plugins: {
          // title: {
          //     display: true,
          //     text: 'Custom Chart Title'
          // },
          legend: false
    }
  }}
/>
)}
</div>);
}

export default LineChart;