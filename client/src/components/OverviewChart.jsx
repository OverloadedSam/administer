import { useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import useTheme from '@mui/material/styles/useTheme';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import { useGetSalesQuery } from '../state/apiSlice';

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetSalesQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data.data;
    const totalSalesLine = {
      id: 'totalSales',
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: 'totalUnits',
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const currSales = acc.sales + totalSales;
        const currUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: currSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: currUnits },
        ];

        return { sales: currSales, units: currUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader mt={5} />
      ) : isError ? (
        <Alert
          mt={4}
          variant='outlined'
          message={'An error ocurred. Please try again later!'}
        />
      ) : data ? (
        <ResponsiveLine
          data={view === 'sales' ? totalSalesLine : totalUnitsLine}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          yFormat=' >-.2f'
          curve='catmullRom'
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => (isDashboard ? v.slice(0, 3) : v),
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? '' : 'Month',
            legendOffset: 36,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard
              ? ''
              : `Total ${view === 'sales' ? 'Revenue' : 'Units'}`,
            legendOffset: -60,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={true}
          useMesh={true}
          legends={
            !isDashboard
              ? [
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 30,
                    translateY: -40,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]
              : undefined
          }
        />
      ) : null}
    </>
  );
};

export default OverviewChart;
