import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Box, Button, Chip, Container, Grid, Link, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { RestaurantViewForm } from '../../../../components/dashboard/restaurant/restaurant-view-form';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../../api/restaurant-api';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';

const RestaurantEdit = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [restaurant, setRestaurant] = useState(null);
  const restaurantUuid = '5dfe251b-b458-4142-b731-b7ff7ab61224';

  const [is_loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      // const data = await fakeCustomerApi.getCustomer();
      const { data } = await restaurantApi.getRestaurantByUuid(restaurantUuid);

      if (isMounted()) {
        setIsLoading(false);
        setRestaurant(data);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (error) {
    return (
      <>
        <pre>
          {t('some error occured')} {JSON.stringify(error, null, 2)}
        </pre>
      </>
    );
  }

  if (is_loading) return <>is loading</>;

  if (!restaurant) {
    return (
      <>
        <Box>
          <Typography>sorry restaurant not found</Typography>
        </Box>
        <Button onClick={e => router.replace('/dashboard/restaurants')}>Back</Button>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | louislabs</title>
      </Head>

      <Box component="main" sx={{ backgroundColor: 'background.default', flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink href="/dashboard/restaurants" passHref>
              <Link color="textPrimary" component="a" sx={{ alignItems: 'center', display: 'flex' }}>
                <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="subtitle2">{t('RESTAURANTS')}</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
            <Grid item xs={12} lg={6} sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
              <Avatar src={restaurant.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
                {getInitials(restaurant.name)}
              </Avatar>
              <Stack direction="column" spacing={0.5}>
                <Typography noWrap variant="h4">
                  {restaurant.name}
                </Typography>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography variant="subtitle2">restaurant_id:</Typography>
                  <Chip label={restaurant.uuid} size="small" sx={{ ml: 1 }} />
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography variant="subtitle2">slug:</Typography>
                  <Chip label={'very-new-restaurant'} size="small" sx={{ ml: 1 }} />
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <Box>
                <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                  Orders
                </Typography>
                <Typography variant="h1">{restaurant.orders}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={3} container sx={{ justifyContent: 'center', alignItems: 'flex-end' }}>
              <Box>
                <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold' }}>
                  Spent
                </Typography>
                <Typography variant="h1">{restaurant.spent}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden', display: 'none' }}>
            <Avatar src={restaurant.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
              {getInitials(restaurant.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {restaurant.name}
              </Typography>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Typography variant="subtitle2">restaurant_id:</Typography>
                <Chip label={restaurant.uuid} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <RestaurantViewForm customer={restaurant} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

RestaurantEdit.getLayout = page => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default RestaurantEdit;
