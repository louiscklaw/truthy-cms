import axios from 'axios';
import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

class AdvertisementApi {
  getHelloworld() {
    return 'helloworld';
  }

  getRestaurants() {
    return axios.get('/api/advertisements', { withCredentials: true });
  }

  getRestaurant(id) {
    return axios.get(`/api/advertisements/${id}`, { withCredentials: true });
  }

  getRestaurantByUuid(uuid) {
    return axios.get(`/api/advertisements/uid/${uuid}`, { withCredentials: true });
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
      .post(`/api/advertisements`, values)
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

    return axios.patch(`/api/advertisements/${id}`, values, { withCredentials: true });
  }

  updateRestaurantByUuid(uuid, values) {
    // wash unwanted fields if any
    delete values.submit;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.id;

    return axios.patch(`/api/advertisements/uid/${uuid}`, values, { withCredentials: true });
  }
}

export const restaurantApi = new AdvertisementApi();
