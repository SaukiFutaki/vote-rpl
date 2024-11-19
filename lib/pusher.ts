import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

export const pusherServer = new PusherServer({
  appId: "1898102",
  key: "cca1f744f9bcd7279af7",
  secret: "6c7e001afe8d4e77df97",
  cluster: "ap1",
  useTLS: true,
});

// app_id = "1898102"
// key = "cca1f744f9bcd7279af7"
// secret = "6c7e001afe8d4e77df97"
// cluster = "ap1"

export const pusherClient = new PusherClient(
 "cca1f744f9bcd7279af7",
  {
    cluster: "ap1",
  }
);