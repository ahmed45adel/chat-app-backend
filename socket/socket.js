import * as Ably from 'ably';

const ablyRest = new Ably.Rest({ key: process.env.ABLY_API_KEY });

const ablyRealtime = new Ably.Realtime({ key: process.env.ABLY_API_KEY });


const userChannelMap = {}; // {userId: channel}

const connectUser = async (userId) => {
  const channel = ablyRealtime.channels.get(`chat:${userId}`);
  userChannelMap[userId] = channel;
  return channel;
};

const disconnectUser = async (userId) => {
  const channel = userChannelMap[userId];
  if (channel) {
    await new Promise((resolve, reject) => {
      channel.detach((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    delete userChannelMap[userId];
  }
};

export { ablyRest, ablyRealtime, connectUser, disconnectUser };