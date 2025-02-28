'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Charteg from './Charteg';
import Insight from './Insight';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'insight',
    title: 'AI Insights',
    icon: <BarChartIcon />,
  }
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ router }) {
  // Get the current pathname to determine which content to show
  const currentPathname = router.pathname;
  
  return (
    <Box 
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      {/* Render different content based on the current path */}
      {currentPathname.includes('insight') ? (
        <Box>
          <Typography variant="h4" gutterBottom>AI Insights</Typography>
          <Insight/>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>Dashboard</Typography>
          <Charteg />&nbsp;&nbsp;<Charteg />
        </Box>
      )}
    </Box>
  );
}

DemoPageContent.propTypes = {
  router: PropTypes.object.isRequired,
};

function Dashboard(props) {
  const [isClient, setIsClient] = React.useState(false);
  const { window } = props;

  // Initialize the router with the correct initial path
  const router = useDemoRouter('/dashboard');

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return null until the component mounts (client-side)
  }

  // Remove this const when copying and pasting into your project.
  const demoWindow = window || undefined;

  // Custom handleNavigationClick function to add to AppProvider
  const handleNavigationClick = (segment) => {
    router.push(`/${segment}`);
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      onNavigationClick={handleNavigationClick}
      branding={{
        logo: <img src="/analytics.svg" alt="logo" />,
        title: 'API Analytics',
        homeUrl: 'https://www.github.com/macbrouse'
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout disableCollapsibleSidebar>
        <DemoPageContent router={router} />
      </DashboardLayout>
    </AppProvider>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;