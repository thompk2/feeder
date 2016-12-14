export function BackImageDirective() {
  'ngInject';
  return {
    link(scope, element, attrs) {
      attrs.$observe('backImg', value => {
        element.css({
          'background-image': `url(${value})`,
          'background-size': 'cover'
        });
      });
    }
  };
}
