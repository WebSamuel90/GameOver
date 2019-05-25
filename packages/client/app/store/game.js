/* eslint-disable no-param-reassign */
import { action } from 'easy-peasy';

const gameStore = {
  game: null,
  /*  {    timer: 5,
    status: 'playing',
    turn: {
      playerId: '1',
      status: 'countdown',
    },
    players: [
      {
        id: '1',
        name: 'Sven',
        alive: true,
      },
      {
        id: '2',
        name: 'Greger',
        alive: false,
      },
    ],
  }, */
  testing: false,

  enableTesting: action((state) => {
    state.testing = true;
  }),

  setGame: action((state, payload) => {
    state.game = payload;
  }),

  addPlayer: action((state, player) => {
    state.game.players.push(player);
  }),

  removePlayer: action((state, player) => {
    const i = state.game.players.indexOf(player);
    state.game.players.splice(i, 1);
  }),

  updateTurn: action((state, turn) => {
    state.game.turn = turn;
  }),

  setTimer: action((state, time) => {
    state.game.timer = time;
  }),
};

export default gameStore;
