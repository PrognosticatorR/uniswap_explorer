import { createClient } from 'redis';

export const getClient = () => {
  createClient({
    url: 'redis://redis_server:6380'
  });
  client.connect();
  client.on('error', err => console.error('Redis Client Error', err));
};
