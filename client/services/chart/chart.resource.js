'use strict';

angular.module('nod3')
  .factory('Chart', function ($resource) {
    return $resource('/api/charts/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  });
