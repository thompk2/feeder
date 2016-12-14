export function ScrollDirective($window) {
  'ngInject';
  return {
    link(scope) {
      angular.element($window).bind("scroll", function () {
        if (this.pageYOffset >= 50) {
          scope.boolChangeClass = true;
        } else {
          scope.boolChangeClass = false;
        }
        scope.$apply();
      });
    }
  };
}
