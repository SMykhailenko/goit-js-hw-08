import Player from '@vimeo/player';
import { throttle } from 'lodash';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(e => {
    localStorage.setItem(LOCALSTORAGE_KEY, e.seconds);
  }, 1000)
);

player
  .setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY) || 0)
  .catch(function (error) {
    console.error(error);
  });
