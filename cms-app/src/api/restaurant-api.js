import axios from 'axios';
import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

class RestaurantApi {
  getRestaurants() {
    return axios.get('/api/restaurants', { withCredentials: true });
  }

  getRestaurant() {
    return {};
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
}

export const restaurantApi = new RestaurantApi();
