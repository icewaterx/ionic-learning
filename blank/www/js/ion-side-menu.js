angular.module('sideMenu',['ionic'])

.controller('contentCtrl',function($scope, $ionicSideMenuDelegate){
	console.log("contentCtrl");
    console.log($scope);

    $scope.$on('$ionicView.loaded',function(){
    	console.log('loaded...');
    });
})

//ionic config
.config(function($ionicConfigProvider){
     $ionicConfigProvider.views.transition('none');       //配置全局动画(根据具体的平台特征 platform, ios, android, none)
     $ionicConfigProvider.scrolling.jsScrolling(true);    //配置全局是否使用js滚动
     $ionicConfigProvider.tabs.position('bottom');        //android的tabs是在top,ios在bottom,这是显示统一到bottom
     $ionicConfigProvider.tabs.style('standard');         //android默认tab样式为striped,ios默认为standard 这里统一到ios
     $ionicConfigProvider.navBar.alignTitle('center');    //title of navBar side (platform, ios--center android--left) left right center
     $ionicConfigProvider.navBar.positionPrimaryButtons('left');
     $ionicConfigProvider.navBar.positionSecondaryButtons('right');
})


//router config
.config(function($stateProvider){
	$stateProvider
        .state('home',{
            url: '',
            templateUrl: 'home'
        })
        .state('about',{
            url:"/about",
            templateUrl: 'about'
        })
        .state('scroll',{
            url:'/scroll',
            templateUrl: 'scroll'
        })
})