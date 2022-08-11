import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
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
import { ArrowRight as ArrowRightIcon } from '../../../../icons/arrow-right';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { getInitials } from '../../../../utils/get-initials';
import { Scrollbar } from '../../../scrollbar';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Debug from '../../../debug';
import DeleteingModal from './deleteing';

import { FiDelete } from 'react-icons/fi';
import DeleteIcon from '@mui/icons-material/Delete';
import { GoCheck } from 'react-icons/go';
import toast from 'react-hot-toast';

export const AdvertisementListTable = props => {
  const { t } = useTranslation();

  const { advertisements, advertisementsCount, onPageChange, onRowsPerPageChange, page, rowsPerPage, ...other } = props;
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  // Reset selected customers when customers change
  useEffect(
    () => {
      if (selectedRestaurants.length) {
        setSelectedRestaurants([]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [advertisements],
  );

  const handleDeleteRestaurantClick = (e, uuid) => {
    axios
      .delete(`/api/restaurants/uid/${uuid}`)
      .then(res => {
        toast.success('DELETE_DONE');
      })
      .catch(err => {
        toast.error('DELETE_ERROR');
        console.error(err);
      });
  };

  const handleSelectAllRestaurants = event => {
    setSelectedRestaurants(event.target.checked ? advertisements.map(restaurant => restaurant.uuid) : []);
  };

  const handleSelectOneRestaurant = (event, restaurantId) => {
    if (!selectedRestaurants.includes(restaurantId)) {
      setSelectedRestaurants(prevSelected => [...prevSelected, restaurantId]);
    } else {
      setSelectedRestaurants(prevSelected => prevSelected.filter(id => id !== restaurantId));
    }
  };

  const enableBulkActions = selectedRestaurants.length > 0;
  const selectedSomeCustomers = selectedRestaurants.length > 0 && selectedRestaurants.length < advertisements.length;
  const selectedAllCustomers = selectedRestaurants.length === advertisements.length;

  const [is_processing, setIsProcessing] = useState(false);
  const router = useRouter();

  const multiItemDelete = () => {
    setIsProcessing(true);
    console.log({ selectedRestaurants });
    axios
      .post('/api/restaurants/delete_multiple', selectedRestaurants, { withCredentials: true })
      .then(res => {
        setIsProcessing(false);
        router.reload();
      })
      .catch(err => console.error({ err }));
  };

  return (
    <div {...other}>
      <DeleteingModal open={is_processing} />
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
          onChange={handleSelectAllRestaurants}
        />
        <Button onClick={multiItemDelete} size="small" sx={{ ml: 2 }}>
          {t('DELETE')}
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
                  onChange={handleSelectAllRestaurants}
                />
              </TableCell>
              <TableCell>{t('NAME')}</TableCell>
              <TableCell>{t('LOCATION')}</TableCell>
              <TableCell>{t('ORDERS')}</TableCell>
              <TableCell>{t('SPENT')}</TableCell>
              <TableCell>{t('ACTIVE')}</TableCell>
              <TableCell align="right">{t('ACTIONS')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advertisements.map(restaurant => {
              const isCustomerSelected = selectedRestaurants.includes(restaurant.uuid);

              return (
                <TableRow hover key={restaurant.uuid} selected={isCustomerSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isCustomerSelected}
                      onChange={event => handleSelectOneRestaurant(event, restaurant.uuid)}
                      value={isCustomerSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                      <Avatar src={restaurant.avatar} sx={{ height: 42, width: 42 }}>
                        {getInitials(restaurant.name)}
                      </Avatar>
                      <Box sx={{ ml: 1 }}>
                        <NextLink href={`/dashboard/restaurants/edit/${restaurant.uuid}`} passHref>
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
                  <TableCell>{`${restaurant.address}, ${restaurant.address1}, ${restaurant.address2}`}</TableCell>

                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {123}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="success.main" variant="subtitle2">
                      {numeral(restaurant.totalAmountSpent).format(`${restaurant.currency}0,0.00`)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip icon={<GoCheck />} label={restaurant.isActive ? t('ACTIVE') : t('NOT_ACTIVE')} />
                  </TableCell>
                  <TableCell align="right">
                    <NextLink href={`/dashboard/restaurants/edit/${restaurant.uuid}`} passHref>
                      <IconButton component="a">
                        <PencilAltIcon fontSize="small" />
                      </IconButton>
                    </NextLink>

                    <NextLink href={`/dashboard/restaurants/view/${restaurant.uuid}`} passHref>
                      <IconButton component="a">
                        <ArrowRightIcon fontSize="small" />
                      </IconButton>
                    </NextLink>

                    <IconButton onClick={e => handleDeleteRestaurantClick(e, restaurant.uuid)} component="a">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>

      <TablePagination
        component="div"
        count={advertisementsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[100, 500, 1000]}
      />
    </div>
  );
};

AdvertisementListTable.propTypes = {
  advertisements: PropTypes.array.isRequired,
  customersCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
