import { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fakeCustomerApi } from '../../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { RestaurantEditForm } from '../../../../components/dashboard/restaurant/restaurant-edit-form';
import { useMounted } from '../../../../hooks/use-mounted';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { useTranslation } from 'react-i18next';
import { restaurantApi } from '../../../../api/restaurant-api';
import { useRouter } from 'next/router';

const RestaurantEdit = () => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);
  const { restaurantId } = useRouter().query;
  const [is_loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      // const data = await fakeCustomerApi.getCustomer();
      const { data } = await restaurantApi.getRestaurant(restaurantId);

      console.log(data);

      if (isMounted()) {
        console.log({ setCustomer: data });
        setCustomer(data);
      }
    } catch (err) {
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

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard: Customer Edit | louislabs</title>
      </Head>
      {JSON.stringify({ error })}

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
          <Box sx={{ alignItems: 'center', display: 'flex', overflow: 'hidden' }}>
            <Avatar src={customer.avatar} sx={{ height: 64, mr: 2, width: 64 }}>
              {getInitials(customer.name)}
            </Avatar>
            <div>
              <Typography noWrap variant="h4">
                {customer.email}
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
                <Chip label={customer.id} size="small" sx={{ ml: 1 }} />
              </Box>
            </div>
          </Box>
          <Box mt={3}>
            <RestaurantEditForm customer={customer} />
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
