import {EaterTitleFilter} from './eaterTitle.filter';
import {FromNow} from './fromNow.filter';
import {ScrollDirective} from './scroll.directive';
import {BackImageDirective} from './backImage.directive';

import './utility.scss';

export const app = 'utilities';

export const UtilityModule = angular
  .module(app, [])
  .filter('eaterTitle', EaterTitleFilter)
  .filter('fromNow', FromNow)
  .directive('scroll', ScrollDirective)
  .directive('backImg', BackImageDirective)
  .name;
