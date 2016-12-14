import {Badge} from './badge.js';

export const app = 'widgets';

export const WidgetModule = angular
  .module(app, [])
  .component('badge', Badge)
  .name;
