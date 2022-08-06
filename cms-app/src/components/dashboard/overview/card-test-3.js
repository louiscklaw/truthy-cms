import { Avatar, Box, Card, CardActions, Divider, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { Chart } from '../../chart';

const LineChart = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ['#2F3EB1'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      show: false,
    },
    stroke: {
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const chartSeries = [{ data: [0, 60, 30, 60, 0, 30, 10, 30, 0] }];

  return <Chart options={chartOptions} series={chartSeries} type="line" width={120} />;
};

export const CardTest3 = () => {
  const { t } = useTranslation();
  const [is_loading, setIsLoading] = useState(true);
  const [num_of_customers, setNumOfCustomers] = useState(0);

  useEffect(() => {
    axios.get('/api/users', { withCredentials: true }).then(({ data }) => {
      setNumOfCustomers(data?.length);
      setIsLoading(false);
    });
  }, []);

  if (is_loading) return <>is loading</>;

  return (
    <Card>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
        }}
      >
        <div>
          <Typography color="textSecondary" variant="body2">
            {t('ENGAGEMENTS')}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="h5">
            {num_of_customers}
          </Typography>
        </div>
        <LineChart />
      </Box>
      <Divider />
      <CardActions
        sx={{
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <Avatar
          sx={{
            backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
            color: 'error.main',
            height: 36,
            width: 36,
          }}
        >
          <ChevronDownIcon fontSize="small" />
        </Avatar>
        <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
          30% less then last month
        </Typography>
      </CardActions>
    </Card>
  );
};
