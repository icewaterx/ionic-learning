angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('slides', {
    url: '/',
    templateUrl: 'templates/slides.html',
    controller: 'SlidesCtrl'
  });

  $urlRouterProvider.otherwise("/");
})

.controller('SlidesCtrl', function($scope, $ionicSlideBoxDelegate, $ionicPopup, $filter) {
  var getColor = function ( nr ) {
    return nr % 2 === 0 ? '#8080c5' : '#80b280';
  };

  var makeSlide = function ( nr, data ) {
    return angular.extend( data, {
      nr : nr
    });
  };
  
  var
    default_slides_indexes = [ -1, 0, 1 ],
    default_slides = [
      makeSlide( default_slides_indexes[ 0 ], {
        title : 'default slide',
        get color () { return getColor( this.nr ) }
      }),
      makeSlide( default_slides_indexes[ 1 ], {
        title : 'default slide', get color () { return getColor( this.nr ) }
      }),
      makeSlide( default_slides_indexes[ 2 ], {
        title : 'default slide', get color () { return getColor( this.nr ) }
      })
    ];
  $scope.slides = angular.copy( default_slides );
  $scope.selectedSlide = 1; // initial

  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.showDetails = function() {
    $ionicPopup.alert({
      title    : 'Current Slides',
      subTitle : 'currentIndex is ' + '<b>' + $ionicSlideBoxDelegate.currentIndex() + '</b>',
      template : '<pre>' + $filter( 'json' )( $scope.slides ) + '</pre>'
    });
  };
  $scope.showDefaultSlides = function () {
    var
      i              = $ionicSlideBoxDelegate.currentIndex(),
      previous_index = i === 0 ? 2 : i - 1,
      next_index     = i === 2 ? 0 : i + 1;

    angular.copy( default_slides[ 1 ], $scope.slides[ i ] );
    angular.copy( default_slides[ 0 ], $scope.slides[ previous_index ] );
    angular.copy( default_slides[ 2 ], $scope.slides[ next_index ] );
    direction = 0;
    head      = $scope.slides[ previous_index ].nr;
    tail      = $scope.slides[ next_index ].nr;
  };

  var direction = 0;

  $scope.slideChanged = function ( i ) {
    var
      previous_index = i === 0 ? 2 : i - 1,
      next_index     = i === 2 ? 0 : i + 1,
      new_direction  = $scope.slides[ i ].nr > $scope.slides[ previous_index ].nr ? 1 : -1;

    angular.copy(
      createSlideData( new_direction, direction ),
      $scope.slides[ new_direction > 0 ? next_index : previous_index ]
    );
    direction = new_direction;
  };
  
  var
    head = $scope.slides[ 0 ].nr,
    tail = $scope.slides[ $scope.slides.length - 1 ].nr;

  var createSlideData = function ( new_direction, old_direction ) {
    var nr;

    if ( new_direction === 1 ) {
      tail = old_direction < 0 ? head + 3 : tail + 1;  
    }
    else {
      head = old_direction > 0 ? tail - 3 : head - 1;
    }

    nr = new_direction === 1 ? tail : head;
    if ( default_slides_indexes.indexOf( nr ) !== -1 ) {
      return default_slides[ default_slides_indexes.indexOf( nr ) ];
    };
    return makeSlide( nr, {
      title : 'generated slide', get color () { return getColor( this.nr ) }
    });
  };

});