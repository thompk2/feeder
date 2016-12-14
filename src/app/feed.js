import './feed.scss';

export const Feed = {
  template: require('./feed.html'),
  controller(FeedService, $location, $anchorScroll) {
    "ngInject";
    this.goTo = goTo;

    function goTo(hash) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(`card-${hash}`);

      // call $anchorScroll()
      $anchorScroll();
    }

    this.listFilter = 'opening';
    FeedService.beginStrem().then(() => {
      this.data = FeedService.data;
    });
  }
};
