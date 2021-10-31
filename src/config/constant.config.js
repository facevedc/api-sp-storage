require('dotenv').config({ path: process.env.PATH_ENV });

module.exports = {
  endpoint_storage: '/storage-manager',
  cors_dns: process.env.CORS_DNS,
  profile: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 7206,
  repo_imgs: process.env.REPOSITORY_IMGS,
};
