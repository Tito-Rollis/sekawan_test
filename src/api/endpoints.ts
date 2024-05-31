const api_key = import.meta.env.REACT_APP_API_KEY;
const base_url = `https://${api_key}.mockapi.io/api/v1/`;

const users_endpoint = `${base_url}users`;
const tickets_endpoint = `${base_url}tickets`;

export { users_endpoint, tickets_endpoint };
