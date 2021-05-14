let API_DOMAIN = '/api';
if (process.env.REACT_APP_NODE_ENV === 'development') {
  API_DOMAIN = '/api';
} else if (process.env.REACT_APP_NODE_ENV === 'pre-production') {
  API_DOMAIN = '';
} else if (process.env.REACT_APP_NODE_ENV === 'production') {
  API_DOMAIN = '';
}

export {
  API_DOMAIN,
}