import axios from 'axios';
import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

class RestaurantApi {
  getRestaurants() {
    return axios.get('/api/restaurants', { withCredentials: true });
  }

  getRestaurant(id) {
    return axios.get(`/api/restaurants/${id}`, { withCredentials: true });
  }

  getRestaurantEmails() {
    return {};
  }

  getRestaurantInvoices() {
    return [];
  }

  getRestaurantsLogs() {
    return [];
  }

  updateRestaurant(id, values) {
    // wash unwanted fields if any
    delete values.submit;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.id;

    console.log({
      updateRestaurant: values,
    });
    console.log({
      ok_value: {
        address: 'address test',
        address1: 'address1 test',
        address2: 'address2 test',
        country: 'country test',
        email: 'user1@truthy.com',
        isActive: true,
        location: 'Hong Kong',
        name: 'user1',
        orders: 0,
        phone: '91234567',
        spent: 0,
        state: 'state test',
      },
    });

    return axios.patch(`/api/restaurants/${id}`, values, { withCredentials: true });
  }
}

export const restaurantApi = new RestaurantApi();
