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

    console.log(values);

    return axios.patch(`/api/restaurants/${id}`, values, { withCredentials: true });
  }
}

export const restaurantApi = new RestaurantApi();
