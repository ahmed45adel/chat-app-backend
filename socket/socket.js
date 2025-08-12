import Ably from 'ably';

const ablyRest = new Ably.Rest({ key: process.env.ABLY_API_KEY });

export { ablyRest };