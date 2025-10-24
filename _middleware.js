export async function onRequest(context) {
  const auth = context.request.headers.get('Authorization');
  
  if (!auth) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Family Status Page"',
      },
    });
  }
  
  const [scheme, encoded] = auth.split(' ');
  
  if (!encoded || scheme !== 'Basic') {
    return new Response('Invalid authentication', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Family Status Page"',
      },
    });
  }
  
  const decoded = atob(encoded);
  const [username, password] = decoded.split(':');
  
  const VALID_USERNAME = context.env.AUTH_USERNAME;
  const VALID_PASSWORD = context.env.AUTH_PASSWORD;
  
  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return new Response('Invalid credentials', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Family Status Page"',
      },
    });
  }
  
  return context.next();
}
