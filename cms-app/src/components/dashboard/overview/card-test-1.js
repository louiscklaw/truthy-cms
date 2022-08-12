import { Avatar, Box, Card, CardActions, Divider, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ChevronUp as ChevronUpIcon } from '../../../icons/chevron-up';
import { Chart } from '../../chart';

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

export const CardTest1 = () => (
  <Card>
    <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', px: 3, py: 2 }}>
      <div>
        <Typography color="textSecondary" variant="body2">
          Spent
        </Typography>
        <Typography sx={{ mt: 1 }} variant="h5">
          $41.2K
        </Typography>
      </div>
      <LineChart />
    </Box>
    <Divider />
    <CardActions sx={{ alignItems: 'center', display: 'flex' }}>
      <Avatar
        sx={{
          backgroundColor: theme => alpha(theme.palette.success.main, 0.08),
          color: 'success.main',
          height: 36,
          width: 36,
        }}
      >
        <ChevronUpIcon fontSize="small" />
      </Avatar>
      <Typography color="textSecondary" sx={{ ml: 1 }} variant="caption">
        12% more then last month
      </Typography>
    </CardActions>
  </Card>
);
