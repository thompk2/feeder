import angular from 'angular';

import {Feed} from './app/feed';
import {FeedService} from './app/feed.service';
import 'angular-ui-router';
import 'angular-sanitize';
import routesConfig from './routes';

import {WidgetModule} from './app/widgets/widget.module';
import {UtilityModule} from './app/utility/utility.module';

import 'normalize.css';
import './index.scss';

export const app = 'app';

angular
  .module(app, ['ngSanitize', 'ui.router', WidgetModule, UtilityModule])
  .config(routesConfig)
  .factory('FeedService', FeedService)
  .component('app', Feed)
  .run($anchorScroll => {
    "ngInject";
    $anchorScroll.yOffset = 100;
  });
