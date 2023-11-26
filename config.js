const convict = require('convict');

export const config = convict({
  ENV: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },

  IPFS_FILE_EXPIRE_TIME: {
    doc: 'IPFS file expire time',
    format: Number,
    default: 600000, // 10 minutes
    env: 'IPFS_FILE_EXPIRE_TIME',
  },
  IPFS_PUBLIC_PORT: {
    doc: 'IPFS public endpoint',
    format: String,
    default: '6010',
    env: 'IPFS_PUBLIC_PORT',
  },

  PORT: {
    doc: 'The port to bind.',
    format: 'port',
    default: 6009,
    env: 'PORT',
  },

  KAFKA_BROKERS: {
    doc: 'Kafka brokers',
    format: String,
    default: 'localhost:9093',
    env: 'KAFKA_BROKERS',
  },

  JWT_SECRET: {
    doc: 'Secret key for JWT',
    format: String,
    default: 'esgin-secret-key',
    env: 'JWT_SECRET',
  },
  IPFS_FILE_SECRET: {
    doc: 'Secret key for IPFS',
    format: String,
    default: 'esgin-ipfs-secret-key',
    env: 'IPFS_FILE_SECRET',
  },

  JWT_EXPIRATION_TIME: {
    doc: 'Expiration time for JWT',
    format: String,
    default: '10d',
    env: 'JWT_EXPIRATION_TIME',
  },

  /* -------------------------  REDIS -----------------  */

  REDIS_HOST: {
    doc: 'Redis host',
    format: String,
    default: 'redis-17563.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    env: 'REDIS_HOST',
  },

  REDIS_PORT: {
    doc: 'Redis port',
    format: Number,
    default: 17563,
    env: 'REDIS_PORT',
  },

  REDIS_USERNAME: {
    doc: 'Redis username',
    format: String,
    default: 'default',
    env: 'REDIS_USERNAME',
  },

  REDIS_PASSWORD: {
    doc: 'Redis password',
    format: String,
    default: 'oTOCsQP06WgITsUWdpHd9pP93l4twYvX',
    env: 'REDIS_PASSWORD',
  },

  REDIS_DEFAULT_TTL: {
    doc: 'Redis default TTL',
    format: Number,
    default: 60,
    env: 'REDIS_DEFAULT_TTL',
  },

  /* -----------------------  IPFS  ---------------  */
  IPFS_SECRET_KEY: {
    doc: 'IPFS secret key',
    format: String,
    default: '',
    env: 'IPFS_SECRET_KEY',
  },

  IPFS_HOST: {
    doc: 'IPFS host',
    format: String,
    default: '0.0.0.0',
    env: 'IPFS_HOST',
  },
  IPFS_PORT: {
    doc: 'IPFS port',
    format: Number,
    default: 5001,
    env: 'IPFS_PORT',
  },
  IPFS_PROTOCOL: {
    doc: 'IPFS protocol',
    format: String,
    default: 'http',
    env: 'IPFS_PROTOCOL',
  },

  IPFS_GATEWAY_HOST: {
    doc: 'IPFS gateway host',
    format: String,
    default: 'http://0.0.0.0:8080',
    env: 'IPFS_GATEWAY_HOST',
  },

  /* -----------------------  CLOUDINARY  ---------------  */

  CLOUD_NAME: {
    doc: 'Cloudinary cloud name',
    format: String,
    default: '',
    env: 'CLOUD_NAME',
  },

  CLOUD_API_KEY: {
    doc: 'Cloudinary API key',
    format: String,
    default: '',
    env: 'CLOUD_API_KEY',
  },

  CLOUD_API_SECRET: {
    doc: 'Cloudinary API secret',
    format: String,
    default: '',
    env: 'CLOUD_API_SECRET',
  },
  /* ------------------------- SMTP ------------------------ */

  SMTP_HOST: {
    doc: 'SMTP host',
    format: String,
    default: 'smtp.gmail.com',
    env: 'SMTP_HOST',
  },
  SMTP_USER: {
    doc: 'SMTP user',
    format: String,
    default: '',
    env: 'SMTP_USER',
  },
  SMTP_PASS: {
    doc: 'SMTP password',
    format: String,
    default: '',
    env: 'SMTP_PASS',
  },

  EMAIL_SERVICE: {
    doc: 'Email service',
    format: String,
    default: 'gmail',
    env: 'EMAIL_SERVICE',
  },

  EMAIL_FROM: {
    doc: 'Email from',
    format: String,
    default: '19020202@vnu.edu.vn',
    env: 'EMAIL_FROM',
  },

  /* ------------------------- FIle Service --------------------------- */

  FILE_SERVICE: {
    doc: 'File service',
    format: String,
    default: 'http://localhost:4009',
    env: 'FILE_SERVICE',
  },

  ESIGN_WEBAPP: {
    doc: 'Esign web app',
    format: String,
    default: 'http://localhost:4008',
    env: 'ESIGN_WEBAPP',
  },

  PRIVATE_KEY: {
    doc: 'Private key',
    format: String,
    default:
      '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
    env: 'PRIVATE_KEY',
  },

  JSON_RPC_URL: {
    doc: 'JSON RPC',
    format: String,
    default: 'http://0.0.0.0:8545',
    env: 'JSON_RPC_URL',
  },

  CLAMAV_PORT: {
    doc: 'Clamav port',
    format: Number,
    default: 3310,
    env: 'CLAMAV_PORT',
  },

  CLAMAV_HOST: {
    doc: 'Clamav host',
    format: String,
    default: 'localhost',
  },
});
