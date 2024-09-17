import * as Highcharts from "highcharts";
// import * as Exporting from "highcharts/modules/exporting";
import HC_exporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { Category } from "@mui/icons-material";

HC_exporting(Highcharts);

// const chartOptions = {
//   title: {
//     text: "My Chart",
//   },
//   series: [
//     {
//       data: [1, 2, 3, 4, 5], // Example data
//     },
//   ],
//   // Include more options as needed
// };

const chartOptions = {
  title: {
    text: "Chart Title",
    align: "center",
  },

  subtitle: {
    text: "subtitle",
    align: "center",
  },

  yAxis: {
    title: {
      text: "Pressure",
    },
  },

  xAxis: {
    accessibility: {
      rangeDescription: "Range: 2010 to 2022",
    },
    categories: [
      0.00727, 0.38921, 0.77115, 1.153, 1.535, 1.917, 2.299, 2.681, 3.063,
      3.445, 3.827, 4.209, 4.591, 4.973, 5.354, 5.736, 6.118, 6.5, 6.882, 7.264,
    ],
  },

  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      // pointStart: 2010,
    },
  },

  series: [
    {
      name: "VLP-1",
      data: [
        7513.42, 3062.34, 2816.22, 2723.45, 2682.49, 2667.35, 2667.63, 2678.24,
        2696.32, 2720.12, 2748.48, 2780.58, 2815.85, 2853.83, 2894.18, 2936.61,
        2980.89, 3026.83, 3074.27, 3123.07,
      ],
    },
    {
      name: "IPR",
      data: [
        6999.82, 6946.24, 6856.3, 6742.58, 6608.82, 6456.61, 6286.58, 6098.69,
        5892.39, 5666.62, 5419.78, 5149.56, 4852.74, 4524.7, 4158.67, 3744.13,
        3263.31, 2681.61, 1910.43, 222.89,
      ],
    },
    {
      name: "VLP-2",
      data: [
        7582.65, 6602.65, 4403.03, 3271.63, 3133.65, 3035.5, 2960.83, 2901.65,
        2853.39, 2813.2, 2779.17, 2749.99, 2724.69, 2702.58, 2683.12, 2665.88,
        2650.53, 2636.82, 2624.53, 2613.48,
      ],
    },
    // {
    //   name: "Operations & Maintenance",
    //   data: [
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     11164,
    //     11218,
    //     10077,
    //     12530,
    //     16585,
    //   ],
    // },
    // {
    //   name: "Other",
    //   data: [
    //     21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
    //     10073, 11471, 11648,
    //   ],
    // },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
};

const ModelUpload = () => {
  return (
    <div style={{ width: "99vw" }}>
      <h1>Model Upload</h1>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ className: "chartContainer" }}
      />
    </div>
  );
};

export default ModelUpload;
