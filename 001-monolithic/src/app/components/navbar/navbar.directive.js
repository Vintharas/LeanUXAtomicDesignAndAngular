export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {},
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavbarController {
  constructor ($location) {
    'ngInject';

    Object.assign(this, {$location});
  }
  isActive(currentLocation){
      return this.$location.path().includes(currentLocation);
  }
}
