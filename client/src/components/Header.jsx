import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Header = ({ title, subtitle, ...rest }) => {
  const theme = useTheme();

  return (
    <Box {...rest}>
      <Typography
        variant='h2'
        component='h1'
        color={theme.palette.secondary[100]}
        fontWeight='bold'
        sx={{ mx: '5px' }}
      >
        {title}
      </Typography>
      <Typography
        variant='h5'
        component='h2'
        color={theme.palette.secondary[300]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
