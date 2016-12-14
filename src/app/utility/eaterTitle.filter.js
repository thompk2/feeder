export function EaterTitleFilter() {
  'ngInject';
  return function (input) {
    return input.match(/http:\/\/(.*?)\.eater/)[1] || input;
  };
}
