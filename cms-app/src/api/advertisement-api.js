import axios from 'axios';
import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

class AdvertisementApi {
  getHelloworld() {
    return 'helloworld';
  }

  getAdvertisementsCount() {
    return axios.get('/api/advertisement/count', { withCredentials: true });
  }

  getAdvertisements() {
    return axios.get('/api/advertisement', { withCredentials: true });
  }

  getAdvertisement(id) {
    return axios.get(`/api/advertisement/${id}`, { withCredentials: true });
  }

  getAdvertisementByUuid(uuid) {
    return axios.get(`/api/advertisement/uid/${uuid}`, { withCredentials: true });
  }

  getAdvertisementEmails() {
    return {};
  }

  getAdvertisementInvoices() {
    return [];
  }

  getAdvertisementsLogs() {
    return [];
  }

  createAdvertisement(values) {
    console.log({ createAdvertisement: values });
    axios
      .post(`/api/advertisements`, values)
      .then(res => {
        console.log('update done');
      })
      .catch(err => console.error(err));
  }

  updateAdvertisement(id, values) {
    // wash unwanted fields if any
    delete values.submit;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.id;

    return axios.patch(`/api/advertisements/${id}`, values, { withCredentials: true });
  }

  updateAdvertisementByUuid(uuid, values) {
    // wash unwanted fields if any
    delete values.submit;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.id;

    return axios.patch(`/api/advertisements/uid/${uuid}`, values, { withCredentials: true });
  }
}

export const advertisementApi = new AdvertisementApi();
