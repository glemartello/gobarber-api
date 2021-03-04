export default {
  jwt: {
    secret: process.env.APP_SECRET || 'pedroTest',
    expiresIn: process.env.EXPIRES_IN || '10m',
  },
};
