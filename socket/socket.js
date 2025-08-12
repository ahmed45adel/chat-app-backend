import Ably from 'ably';

if (!process.env.ABLY_API_KEY) {
  throw new Error('ABLY_API_KEY environment variable is required');
}

const ablyRealtime = new Ably.Realtime({
  key: process.env.ABLY_API_KEY,
  log: {
    level: process.env.NODE_ENV === 'production' ? 2 : 4
  }
});

export { ablyRealtime };
