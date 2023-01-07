import { useSelector } from 'react-redux';
import { ResponsiveChoropleth } from '@nivo/geo';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import { geoData } from '../../utils/geoData';
import { useGetGeographyQuery } from '../../state/apiSlice';

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetGeographyQuery();
  const { mode } = useSelector((state) => state.global);

  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='GEOGRAPHY' subtitle='Find where your users are located' />

      {data ? (
        <Box
          mt='40px'
          height='75vh'
          border={`2px solid ${theme.palette.secondary[200]}`}
          borderRadius='8px'
        >
          <ResponsiveChoropleth
            data={data.data}
            theme={{
              background:
                mode === 'light' ? theme.palette.secondary[100] : 'transparent',
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
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor='#666666'
            label='properties.name'
            valueFormat='.2s'
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor='#ffffff'
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
          <Box height={40} />
        </Box>
      ) : isLoading ? (
        <Loader mt={5} />
      ) : isError ? (
        <Alert
          mt={4}
          variant='outlined'
          message={'An error ocurred. Please try again later!'}
        />
      ) : null}
    </Box>
  );
};

export default Geography;
