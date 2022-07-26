import React from "react"
import { useSelector } from "react-redux"
import { Line } from "react-chartjs-2"
import "chart.js/auto" /* eslint-disable no-unused-vars */
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';

function LineChart({ chartData,flag }) {

  const days = useSelector((state) => state.days.days);
  const matches = useMediaQuery('(max-width:900px)');

  return (<div>
    {!chartData || flag===false ? (
    <CircularProgress size="55px"/>
  ) : (
  <Line
  // height={`${matches ? "350px" : null}`}
  width={`${matches ? "350px" : null}`}
  data={{
          labels: chartData.map((coin) => {
              let date = new Date(coin[0]);
              let time =  date.getHours() > 12
          ? `${date.getHours() - 12} PM`
          : `${date.getHours()} AM`;
      return days === "1" ? time : date.toLocaleDateString();
      // 1 day -> show hours
      // more than one day -> show days
    }),
  datasets: [
      {
        data: chartData.map((coin) => coin[1]),
        label: `Price ( Past ${days} Days )`,
        borderWidth: `${matches ? "2" : "4"}`,
        radius:`${matches ? "0" : "3"}`,
        borderColor: "#4d4dff",
        pointBorderWidth: 0,
        pointHoverBorderWidth:2,
        pointHoverBackgroundColor:"#8080ff",

      },
    ],
  }}
  options={{
    aspectRatio:`${matches ? "2" : "3"}`,
    elements: {
      line: {
        tension:`${matches ? "1" : "0"}`,
      }
    },
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