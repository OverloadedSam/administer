import { useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { themeSettings } from './theme';

const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
