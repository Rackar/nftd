import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
const ishttps = 'https:' === document.location.protocol;
let base = '' //18.176.191.82
if (ishttps) {
  base = 'https://filoli.io:3007/noauth/filoli/'
} else if (process.env.PROD) {
  base = 'http://filoli.io:3006/noauth/filoli/'
} else {
  base = 'http://localhost:3006/noauth/filoli/'
}


const api = axios.create({ baseURL: base });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios, api, base };
