(function () {
  'use strict';

  angular
    .module('reviews')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    // Menus.addMenuItem('topbar', {
    //   title: 'Reviews',
    //   state: 'reviews',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // Menus.addSubMenuItem('topbar', 'reviews', {
    //   title: 'List Reviews',
    //   state: 'reviews.list'
    // });

    // // Add the dropdown create item
    // Menus.addSubMenuItem('topbar', 'reviews', {
    //   title: 'Create Review',
    //   state: 'reviews.create',
    //   roles: ['user']
    // });
  }
})();
