import { Realtime } from 'ably';

const ably = new Realtime.Promise(process.env.ABLY_API_KEY);

const userChannelMap = {}; // {userId: channel}

const connectUser = async (userId) => {
  const channel = ably.channels.get(`chat:${userId}`);
  userChannelMap[userId] = channel;
  return channel;
};

const disconnectUser = async (userId) => {
  const channel = userChannelMap[userId];
  if (channel) {
    await channel.detach();
    delete userChannelMap[userId];
  }
};

export { connectUser, disconnectUser };