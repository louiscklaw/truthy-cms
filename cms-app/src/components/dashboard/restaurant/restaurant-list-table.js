import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { getInitials } from '../../../utils/get-initials';
import { Scrollbar } from '../../scrollbar';
import { useTranslation } from 'react-i18next';

export const RestaurantListTable = props => {
  const { t } = useTranslation();

  const { customers, customersCount, onPageChange, onRowsPerPageChange, page, rowsPerPage, ...other } = props;
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedCustomers.length) {
        setSelectedCustomers([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [customers],
  );

  const handleSelectAllCustomers = event => {
    setSelectedCustomers(event.target.checked ? customers.map(customer => customer.id) : []);
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers(prevSelected => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers(prevSelected => prevSelected.filter(id => id !== customerId));
    }
  };

  const enableBulkActions = selectedCustomers.length > 0;
  const selectedSomeCustomers = selectedCustomers.length > 0 && selectedCustomers.length < customers.length;
  const selectedAllCustomers = selectedCustomers.length === customers.length;

  return (
    <div {...other}>
      <Box
        sx={{
          backgroundColor: theme => (theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100'),
          display: enableBulkActions ? 'block' : 'none',
          px: 2,
          py: 0.5,
        }}
      >
        <Checkbox
          checked={selectedAllCustomers}
          indeterminate={selectedSomeCustomers}
          onChange={handleSelectAllCustomers}
        />
        <Button size="small" sx={{ ml: 2 }}>
          {t('DELETE')}
        </Button>
        <Button size="small" sx={{ ml: 2 }}>
          {t('EDIT')}
        </Button>
      </Box>
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAllCustomers}
                  indeterminate={selectedSomeCustomers}
                  onChange={handleSelectAllCustomers}
                />
              </TableCell>
              <TableCell>{t('NAME')}</TableCell>
              <TableCell>{t('LOCATION')}</TableCell>
              <TableCell>{t('ORDERS')}</TableCell>
              <TableCell>{t('SPENT')}</TableCell>
              <TableCell align="right">{t('ACTIONS')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(restaurant => {
              const isCustomerSelected = selectedCustomers.includes(restaurant.id);

              return (
                <TableRow hover key={restaurant.id} selected={isCustomerSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCustomerSelected}
                      onChange={event => handleSelectOneCustomer(event, restaurant.id)}
                      value={isCustomerSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <Avatar src={restaurant.avatar} sx={{ height: 42, width: 42 }}>
                        {getInitials(restaurant.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink href="/dashboard/customers/1" passHref>
                          <Link color="inherit" variant="subtitle2">
                            {restaurant.name}
                          </Link>
                        </NextLink>
                        <Typography color="textSecondary" variant="body2">
                          {restaurant.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{`${restaurant.city}, ${restaurant.state}, ${restaurant.country}`}</TableCell>
                  <TableCell>{restaurant.totalOrders}</TableCell>
                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {numeral(restaurant.totalAmountSpent).format(`${restaurant.currency}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {process.env.NODE_ENV === 'development' ? (
                      <NextLink href={`/dashboard/restaurants/${restaurant.id}/edit`} passHref>
                        <IconButton component="a">
                          <PencilAltIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    ) : (
                      <></>
                    )}
                    <NextLink href={`/dashboard/restaurants/edit/${restaurant.uuid}`} passHref>
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>

                    <NextLink href={`/dashboard/restaurants/uid/${restaurant.uuid}`} passHref>
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePagination
        component="div"
        count={customersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[100, 200, 500]}
      />
    </div>
  );
};

RestaurantListTable.propTypes = {
  customers: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
