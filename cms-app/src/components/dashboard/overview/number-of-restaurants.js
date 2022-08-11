import { Box, Button, Card, CardActions, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../api/restaurant-api';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { Chart } from '../../chart';
import Loading from './Loading';

const LineChart = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
    colors: ['#2F3EB1'],
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    grid: { show: false },
    stroke: { width: 3 },
    theme: { mode: theme.palette.mode },
    tooltip: { enabled: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
  };

  const chartSeries = [{ data: [0, 60, 30, 60, 0, 30, 10, 30, 0] }];

  return <Chart options={chartOptions} series={chartSeries} type="line" width={120} />;
};

export const NumberOfRestaurants = () => {
  const { t } = useTranslation();
  const [is_loading, setIsLoading] = useState(true);
  const [num_of_restaurant, setNumOfRestaurant] = useState(0);

  useEffect(() => {
    restaurantApi.getRestaurantsCount().then(({ data }) => {
      setNumOfRestaurant(data);
      setIsLoading(false);
    });
  }, []);

  if (is_loading) return <Loading />;

  return (
    <Card>
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', px: 3, py: 2 }}>
        <div>
          <Typography color="textSecondary" variant="body2">
            {t('NUMBER_OF_RESTAURANTS')}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="h5">
            {num_of_restaurant}
          </Typography>
        </div>
        <LineChart />
      </Box>
      <Divider />
      <CardActions>
        <Button endIcon={<ArrowRightIcon fontSize="small" />}>{t('SEE_ALL_VISITS')}</Button>
      </CardActions>
    </Card>
  );
};