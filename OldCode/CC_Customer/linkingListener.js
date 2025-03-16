const handleDeepLink = event => {
  const queryStartIndex = event.url.indexOf('?');
  if (queryStartIndex !== -1) {
    const queryString = event.url.substring(queryStartIndex + 1);
    const queryParams = queryString.split('&');
    const params = {};
    queryParams.forEach(param => {
      const [key, value] = param.split('=');
      params[key] = decodeURIComponent(value);
    });
    const receivedAccessToken = params.access_token;
    const receivedRefreshToken = params.refresh_token;
    const user_id = params.user_id;
    // You recived the access token now store it in your state or whereever you want to
  }
};

export default handleDeepLink;
