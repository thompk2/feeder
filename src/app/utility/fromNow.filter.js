import moment from 'moment';

export function FromNow() {
  'ngInject';
  return function (input) {
    return moment(input).fromNow();
  };
}
