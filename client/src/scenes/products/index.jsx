import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import { useGetProductsQuery } from '../../state/apiSlice';

const Product = (props) => {
  const { _id, name, description, price, rating, category, supply, stat } =
    props;
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='primary'
          size='small'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>ID: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const isNonMobile = useMediaQuery('(min-width: 600px)');
  return (
    <Box m='1.5rem 2.5rem'>
      <Header title='PRODUCTS' subtitle='See your list of products' />
      {data ? (
        <Box
          mt='20px'
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          justifyContent='space-between'
          rowGap='20px'
          columnGap='1.33%'
          sx={{
            '& > div': {
              gridColumn: isNonMobile ? undefined : 'span 4',
            },
          }}
        >
          {data.data.map((product) => {
            const stat = {
              yearlySalesTotal: product.yearlySalesTotal,
              yearlyTotalSoldUnits: product.yearlyTotalSoldUnits,
            };
            return (
              <Product key={product._id} stat={stat} {...product.productId} />
            );
          })}
        </Box>
      ) : isLoading ? (
        <Loader mt={5} />
      ) : isError ? (
        <Alert mt={4} message={'An error ocurred. Please try again later.'} />
      ) : null}
    </Box>
  );
};

export default Products;
