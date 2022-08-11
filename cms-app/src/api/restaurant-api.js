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

  getRestaurantByUuid(uuid) {
    return axios.get(`/api/restaurants/uid/${uuid}`, { withCredentials: true });
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

  createRestaurant(values) {
    console.log({ createRestaurant: values });
    axios
      .post(`/api/restaurants`, values)
      .then(res => {
        console.log('update done');
      })
      .catch(err => console.error(err));
  }

  updateRestaurant(id, values) {
    // wash unwanted fields if any
    delete values.submit;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.id;

    return axios.patch(`/api/restaurants/${id}`, values, { withCredentials: true });
  }

  updateRestaurantByUuid(uuid, values) {
    // wash unwanted fields if any
    delete values.submit;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.id;

    return axios.patch(`/api/restaurants/uid/${uuid}`, values, { withCredentials: true });
  }
}

export const restaurantApi = new RestaurantApi();
