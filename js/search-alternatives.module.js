'use strict'; // This component was largly copied from Northwesterns implementation

function proxyLink(link) {
  return 'https://login.libproxy.newschool.edu/login?url=' + link;
}

angular.module('searchAlternatives', []).controller('searchAlternativesController', ['angularLoad', '$scope', '$window', '$location', '$rootScope', function (angularLoad, $scope, $window, $location, $rootScope) {
  $scope.searchTerm = '';
  $scope.displayTabs = false;

  this.$onInit = function () {
    try {
      $rootScope.$on("$locationChangeStart", function (event, next, current) {
        // alert('routechange');
        // handle route changes     
        var query = encodeURIComponent($location.$$search.query.split(",", 3)[2]);

        if ($scope.searchTerm !== query && query !== '') {
          $scope.searchTerm = query;
          $scope.displayTabs = true;
        }
      }); // eg. query=any,contains,romeo and juliet
      //  only split to length 3 so any commas in the query are retained

      var query = encodeURIComponent($location.$$search.query.split(",", 3)[2]);
      $scope.scholarLink = "";

      $scope.yewnoLink = ""; 

      $scope.worldcatLink = ""; 

      console.log($routeParams);
    } catch (e) {
      $scope.showSearchBar = false;
      return;
    }
  };

  $scope.setUrls = function (type) {
    $scope.scholarLink = proxyLink('http://scholar.google.com/scholar');
    $scope.yewnoLink = 'https://ezborrow.reshare.indexdata.com/Search/Results';
    $scope.worldcatLink = proxyLink('http://www.worldcat.org');

    if ($location.$$search) {
      var query = encodeURIComponent($location.$$search.query.split(",", 3)[2]);
      $scope.scholarLink += '?hl=en&q=' + query;
      $scope.yewnoLink += '?&type=AllFields&lookfor=' + query;
      $scope.worldcatLink += '/search?q=' + query;
    }

    return true;
  }; 
  
}]).component('searchAlternatives', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'searchAlternativesController',
  template: "<div class=\"default-card zero-margin _md searchAlternatives md-primoExplore-theme md-ink-ripple\" ng-if=\"displayTabs === true\" ><div><p style=\"color:#000000;\"><strong>Search In:</strong></p><a href={{worldcatLink}} ng-click='setUrls()' target='_blank' aria-label=\"Search the world's largest network of library content\"><md-button class=\"worldcatLogo\"><md-tooltip md-direction=\"bottom\">Search the world&apos;s largest network of library content</md-tooltip></md-button></a><a href={{scholarLink}} target='_blank' ng-click='setUrls()' aria-label=\"Search for scholarly literature and link to complete documents through our library or on the web\"><md-button class=\"scholarLogo\"><md-tooltip md-direction=\"bottom\">Search for scholarly literature and link to complete documents through our library or on the web</md-tooltip></md-button></a><a href={{yewnoLink}} target='_blank' type=\"button\" ng-click='setUrls()' aria-label=\"Request from our PALCI Consortium (70 academic libraries in PA, NY, NJ, and WV areas)\"><md-button class=\"yewnoLogo\"><md-tooltip md-direction=\"bottom\">Request from our PALCI Consortium (70 academic libraries in PA, NY, NJ, and WV areas)</md-tooltip></div></md-button></a></div>"
});