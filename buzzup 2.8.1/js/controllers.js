var buzzUpControllers=angular.module("buzzUpControllers",["ionic.contrib.ui.cards"]);buzzUpControllers.controller("TopicRequestController",["$scope","$firebase","ToastService","$timeout",function(e,o,t,n){e.postTopic=function(){var e=document.getElementById("topicSug"),i=document.getElementById("userName"),s=document.getElementById("userEmail");if(e=e.value,i=i.value,s=s.value,e){var r=new Firebase("https://buzzupapp.firebaseio.com/topicSuggestions"),a=o(r);a.$add({topic:e,name:i,email:s}),n(function(){t.setTopicSuggest()},500)}}}]),buzzUpControllers.controller("CantConnectController",["$scope","$ionicViewService","$state","MediaService","$timeout","$window",function(e,o,t,n,i,s){i(function(){n.loadMedia("sounds/connection-error.wav").then(function(e){e.play()})},500),e.goTo=function(e){"home"==e&&(o.clearHistory(),s.sessionStorage.removeItem("connected")),t.go(e)}}]),buzzUpControllers.controller("HomeController",["$scope","recentlyPlayedList","homeData","$timeout","MediaService","RecentlyPlayedService",function(e,o,t){e.recentlyPlayed=o;var n=t[0];e.trendingList=n;var i=t[1];e.searchTrendsList=i;var s=t[2];e.liveAndHappeningList=s;var r=t[3];e.mostSuggestedList=r}]),buzzUpControllers.controller("TopicsController",["$scope","allTopics","$ionicLoading","GetTopicNameService","refreshTopics","$timeout","RecentlyPlayedService",function(e,o,t,n,i,s){e.topics=o[0],e.newContentList=o[1],e.popularList=o[2],e.updatedList=o[3],e.getTopicName=function(e){n.setName(e)},e.refreshTopicsList=function(){e.topics=i[0],e.newContentList=i[1],e.popularList=i[2],e.updatedList=i[3],s(function(){e.$broadcast("scroll.refreshComplete")},1250)}}]),buzzUpControllers.controller("SubTopicsController",["$scope","subTopics","$timeout","$ionicScrollDelegate","refreshSubTopics","RecentlyPlayedService","$ionicLoading","GetTopicNameService",function(e,o,t,n,i,s,r,a){e.subTopicsList=o,e.name=a.getName(),e.focusList=function(){n.scrollTop(!0)},e.refreshSubTopicList=function(){e.subTopicsList=i,t(function(){e.$broadcast("scroll.refreshComplete")},1250)}}]),buzzUpControllers.controller("SubTopicQuestionsController",["$scope","$http","$stateParams","$timeout","$q","$ionicPopup","$ionicActionSheet","$ionicModal","$ionicScrollDelegate","$ionicPlatform","$state","$rootScope","$ionicViewService","$ionicLoading","subTopicQuestionsService","$window","$firebase","BUQService","StatsService","ShareService","MediaService","RecentlyPlayedService","ToastService","$ionicPopover","$ionicPopupOnlyBody",function(e,o,t,n,i,s,r,a,c,l,u,p,d,m,f,h,g,b,v,w,z,S,y,T,B){function N(e){var o=document.getElementsByClassName(e);o=angular.element(o),o.remove()}function A(e){z.loadMedia("sounds/"+e).then(function(e){e.play()})}function C(){n(function(){e.cardShow=!0},1e3)}function $(o,t){e.cardShowBigIndigoMargin=!1,e.animRot=!0,e.addToRedProg=!0,e.addToGreenProg=!0,A("whoosh.wav"),n(function(){n(function(){e.hasBg=!0,e.tabsIsVis=!1,e.roundEnds=!0,e.navBarShown=!1,A("result.wav")},1050),n(function(){N("rmv-frm-dom"),e.questions=null;var n=parseInt(o/.7);e.blueBUQ=n;var i=parseInt(t/.7);e.greenBUQ=i,b.setBUQ(o>t?n:t>o?i:parseInt(t/.7)),v.setTotal(),e.modal.show(),A("result-show.wav");var s=document.getElementById("full-remove");s=angular.element(s),s.remove()},3700)},1500)}function P(e){var o,t=0;Array.prototype.writeIndices=function(e){for(var o=0;o<(e||this.length);++o)this[o]=o;return this};var n=[].writeIndices(e-1);return n.forEach(function(e){o=Math.floor(Math.random()*++t),n[t-1]=n[o],n[o]=e}),n.splice(6,n.length-6),n}function q(o,t){n(function(){A("bonus.wav")},150);var i=B.show({title:'<i class="icon ion-icecream popup-head-icon"></i>',template:'<p class="correct-ans">2x Bonus Question ~ Final Round</p>'});n(function(){i.close(),c.scrollTop(!0),e.qNum=o[t],C()},2e3)}function k(){function e(e){e.input1&&1==e.buttonIndex&&n(function(){y.setReportMessage()},500);var t="Error in the topic "+o+". User says: "+e.input1,i=new Firebase("https://buzzupapp.firebaseio.com/errorReport"),s=g(i);s.$add({name:t})}var o=S.getPlayed();o=o.name?o.name:"Buzzup",navigator.notification.prompt("A bit more context",e,"Report",["Report","Cancel"],"")}function U(){n(function(){if(e.questions[e.qNum].opt3||e.questions[e.qNum].opt4){var o=0;if(e.questions[e.qNum].opt1!=e.questions[e.qNum].ans){if(2==o)return!0;e.isFlipped1=!0,o++}if(e.questions[e.qNum].opt2!=e.questions[e.qNum].ans){if(2==o)return!0;e.isFlipped2=!0,o++}if(e.questions[e.qNum].opt3!=e.questions[e.qNum].ans){if(2==o)return!0;e.isFlipped3=!0,o++}if(e.questions[e.qNum].opt4!=e.questions[e.qNum].ans){if(2==o)return!0;e.isFlipped4=!0,o++}}},250)}function I(){e.isDisabled1=e.isDisabled2=e.isDisabled3=e.isDisabled4=!0,e.isInCorrect1=e.isInCorrect2=e.isInCorrect3=e.isInCorrect4=!1,e.buzzGreenDisabled=e.buzzBlueDisabled=!1,e.bluePlr={isActive:!1},e.greenPlr={isActive:!1},n(function(){e.isDisabled1=e.isDisabled2=e.isDisabled3=e.isDisabled4=!1,e.blueNotOutlined=!1,e.greenNotOutlined=!1,e.blueNotActive=!1,e.greenNotActive=!1,e.isFlipped1=e.isFlipped2=e.isFlipped3=e.isFlipped4=!1},2500)}function D(o,i,a,l,p,m,f,h,g,b,z){N("round-begin-remove");var y=B.show({title:'<span class="buzz-logo">B</span>',template:'<p class="go">GO</p>'});A("go.wav"),n(function(){y.close(),c.scrollTop(!0),n(function(){e.navBarShown=!0,e.tabsIsVis=!0,e.cardShow=!0,e.cardShowBigIndigoMargin=!0},250),e.qNum=i[o],p[i[o]].img?n(function(){c.scrollBottom(!0),e.slowShow=!0},2500):n(function(){e.slowShow=!0},2250)},1250),e.showCorrect=function(t){n(function(){var s;A("correct.wav"),s=B.show(t?{title:'<i class="icon ion-android-star popup-head-icon"></i>',template:'<p class="correct-ans-head">Answer</p><p class="correct-ans">'+t+"</p>"}:{title:'<i class="icon ion-checkmark-round popup-head-icon"></i>',template:'<p class="correct-ans">That Is Correct</p>'}),n(function(){e.slowShow=!1,o>5&&(a>l?(s.close(),$(a,l),v.setWins("blueWon")):l>a?(s.close(),$(a,l),v.setWins("greenWon")):(s.close(),$(a,l),v.setTie())),e.cardShow=!1,s.close(),c.scrollTop(!0),5>o?(C(),e.qNum=i[o]):5==o&&(e.qNum={},q(i,o)),5>o?p[i[o]].img?n(function(){c.scrollBottom(!0),e.slowShow=!0},2500):n(function(){e.slowShow=!0},2500):5==o&&(p[i[o]].img?n(function(){c.scrollBottom(!0),e.slowShow=!0},4750):n(function(){e.slowShow=!0},4750))},1900)},250)},e.greenActionSheet=function(){var o=document.getElementsByClassName("options-right");o=angular.element(o),o.css("display","none"),A("actionsheet.wav"),r.showRight({buttons:[{text:'<i class="icon whip-whip logo"></i>'},{text:'<i class="icon flaticon-magic4 logo "></i>'}],cancelText:'<i class="icon ion-close-circled logo"></i>',cancel:function(){o.css("display","block")},buttonClicked:function(t){return o.css("display","block"),0==t&&0==m?(s.alert({title:'<i class="whip-whip popup-head-icon"></i>',template:'<p class="correct-ans">Two Incorrect options will be whipped out now</p>',buttons:[{text:'<span class="pink">OK</span>',type:"",onTap:function(){return A("whip.wav"),m++,U(),!0}},{text:'<span class="blue-color">Nope</span>',type:"",onTap:function(){return!1}}]}).then(function(){}),!0):1==t&&0==f?(s.alert({title:'<i class="flaticon-magic4 popup-head-icon"></i>',template:'<p class="correct-ans">Red team will be reduced by a point</p>',buttons:[{text:'<span class="pink">OK</span>',type:"",onTap:function(){return n(function(){a-=1,e.blueScr=a,f++},250),A("magic.wav"),!0}},{text:'<span class="blue-color">Nope</span>',type:"",onTap:function(){return!1}}]}).then(function(){}),c.scrollTop(!0),!0):void 0}})},e.blueActionSheet=function(){var o=document.getElementsByClassName("options");o=angular.element(o),o.css("display","none"),A("actionsheet.wav"),r.show({buttons:[{text:'<i class="icon whip-whip logo"></i>'},{text:'<i class="icon flaticon-magic4 logo"></i>'}],cancelText:'<i class="icon ion-close-circled logo"></i>',cancel:function(){o.css("display","block")},buttonClicked:function(t){return o.css("display","block"),0==t&&0==h?(s.alert({title:'<i class="whip-whip popup-head-icon"></i>',template:'<p class="correct-ans">Two Incorrect options will be whipped out now</p>',buttons:[{text:'<span class="pink">OK</span>',type:"",onTap:function(){return A("whip.wav"),h++,U(),!0}},{text:'<span class="blue-color">Nope</span>',type:"",onTap:function(){return!1}}]}).then(function(){}),!0):1==t&&0==g?(s.alert({title:'<i class="icon flaticon-magic4 popup-head-icon"></i>',template:'<p class="correct-ans">Green team will be reduced by a point</p>',buttons:[{text:'<span class="pink">OK</span>',type:"",onTap:function(){return n(function(){l-=1,e.greenScr=l,g++},250),A("magic.wav"),!0}},{text:'<span class="blue-color">Nope</span>',type:"",onTap:function(){return!1}}]}).then(function(){}),c.scrollTop(!0),!0):void 0}})},e.checkAns=function(t,i,r){e.bluePlr.isActive||e.greenPlr.isActive?(z+=1,t==e.questions[e.qNum].ans&&2>=z?(z=0,e.bluePlr.isActive?(a+=5==o?2:1,n(function(){e.blueScr=a},700)):e.greenPlr.isActive&&(l+=5==o?2:1,n(function(){e.greenScr=l},700)),o+=1,e.showCorrect(),I()):(navigator.vibrate(100),A("wrong.wav"),2>=z&&(e[r]=!0,e[i]=!0,2>z?e.bluePlr.isActive?(e.buzzGreenDisabled=!1,e.greenNotOutlined=!1,e.buzzBlueDisabled=!0,e.blueNotOutlined=!0,e.blueNotActive=!1,e.greenNotActive=!0,e.greenPlr={isActive:!0},e.bluePlr={isActive:!1}):e.greenPlr.isActive&&(e.buzzGreenDisabled=!0,e.greenNotOutlined=!0,e.buzzBlueDisabled=!1,e.blueNotOutlined=!1,e.greenNotActive=!1,e.blueNotActive=!0,e.greenPlr={isActive:!1},e.bluePlr={isActive:!0}):(e.buzzGreenDisabled=!0,e.greenNotOutlined=!0,e.buzzBlueDisabled=!0,e.blueNotOutlined=!0,e.greenNotActive=!1,e.blueNotActive=!1,e.greenPlr={isActive:!1},e.bluePlr={isActive:!1},n(function(){var t=e.questions[e.qNum].ans;o+=1,z=0,e.showCorrect(t),I()},550))))):2>z&&(navigator.vibrate(500),A("buzz-before.aac"),e.showPleaseBuzzAnim=!0,n(function(){e.showPleaseBuzzAnim=!1},2e3),s.alert({title:'<i class="icon ion-android-reminder popup-head-icon"></i>',template:'<p class="correct-ans">Buzz Before You Answer</p>',buttons:[{text:'<span class="pink">OK</span>',type:"",onTap:function(){c.scrollBottom(!0)}}]}).then(function(){c.scrollBottom(!0)}))},e.disableBuzz=function(o){e[o]=!0,"buzzGreenDisabled"==o?(e.bluePlr={isActive:!0},e.greenNotOutlined=!0,e.blueNotActive=!0):"buzzBlueDisabled"==o&&(e.greenPlr={isActive:!0},e.blueNotOutlined=!0,e.greenNotActive=!0)},e.goTo=function(o){d.clearHistory(),e.modal.hide(),e.modal.remove(),u.go(o)},e.playAgain=function(){e.modal.hide(),e.modal.remove(),u.transitionTo(u.current,t,{reload:!0,inherit:!1,notify:!0})},e.hello=function(o){var t="The final scores are "+a+" to "+l+". ",n=S.getPlayed();n=n?n.name:"BuzzUp";var i="Hey! I just played the topic "+n+" on #BuzzUp. "+t+b+" #BuzzUp ",s="Hey! I just played the topic "+n+" on #BuzzUp. "+t+" @appbuzzup .";switch(o){case"facebook":w.shareViaFB(i);break;case"twitter":w.shareViaTwitter(s);break;case"whatsApp":w.shareViaWhatsApp(i);break;case"hangouts":w.shareViaHangouts(i)}e.popover.hide()},e.report=function(){k(),e.popoverReport.hide()},e.sharePopup=function(){}}function x(e,o,t){return e.forEach(function(e){var n={};n.que=t[e].que,n.opt1=t[e].opt1,n.opt2=t[e].opt2,n.opt3=t[e].opt3,n.opt4=t[e].opt4,n.ans=t[e].ans,t[e].img&&(n.img=t[e].img),o.push(n)}),o}function L(e,o){for(var t=0;e>t;t++)o.push(t);return o}n(function(){!function(){A("round-begins.wav"),e.hasBg=!0,e.navBarShown=!1,e.roundBegins=!0,e.slowShow=!1,e.cardShow=!1,e.roundEnds=!1,e.tabsIsVis=!1,e.cardShowBigIndigoMargin=!1,e.showPleaseBuzzAnim=!1,e.animRot=!1,e.addToRedProg=!1,e.addToGreenProg=!1;var o=S.getPlayed();e.name=o.name,f.getSubTopicQuestions(t).then(function(o){var t=null,i=new Array,s=null,r=0,c=null,l=null,u=greenPlrScr=0,p=0,d=0,m=0,f=0,h=0,g=null;e.blueScr=u,e.greenScr=greenPlrScr,I(),s=o.length,t=P(s),i=x(t,i,o),e.questions=i,c=i;var b=new Array;b=L(t.length,b),a.fromTemplateUrl("templates/result.html",function(o){e.modal=o},{scope:e,animation:"slide-left-right",backdropClickToClose:!1,hardwareBackButtonClose:!1}),T.fromTemplateUrl("templates/share-popover.html",{scope:e}).then(function(o){e.popover=o}),T.fromTemplateUrl("templates/report-popover.html",{scope:e}).then(function(o){e.popoverReport=o});for(var v=0;v<i.length;v++){if(!(5>v)){g=i[v].que,l=g;break}if(!i[v].img){g=i[v].que,l=g;break}}n(function(){e.roundBegins=!1,e.hasBg=!1,D(r,b,u,greenPlrScr,c,p,d,m,f,l,h)},3250),e.$on("destroy",function(){e.modal.remove()}),e.$on("destroy",function(){e.popover.remove(),e.popoverReport.remove()})})}()},500)}]),buzzUpControllers.controller("HelpController",["$scope","$ionicSwipeCardDelegate",function(e,o){var t=0,n=[{title:"1. Choose a topic",image:"img/step1.png"},{title:"2. Question",image:"img/step2.png"},{title:"3. Buzz to answer",image:"img/step3.png"},{title:"4. Choose an answer",image:"img/step4.png"}];e.cards=Array.prototype.slice.call(n,0,0),e.cardSwiped=function(){e.addCard()},e.cardDestroyed=function(o){e.cards.splice(o,1)},e.addCard=function(){var o=n[t++];o.id=Math.random(),e.cards.push(angular.extend({},o)),4==t&&(t=0)},e.goAway=function(){var t=o.getSwipebleCard(e);t.swipe()}}]),buzzUpControllers.controller("StatsController",["$scope","$ionicPopup","totalMatches","blueWins","greenWins","tie","BUQ","ShareService","$ionicPopover",function(e,o,t,n,i,s,r,a,c){e.total=t,e.blueWin=n,e.greenWin=i,e.ties=s,e.BUQ=r,c.fromTemplateUrl("templates/share-popover.html",{scope:e}).then(function(o){e.popover=o});var l="I have just made my way through "+r+" BUQ's on #BuzzUp";e.hello=function(o){switch(o){case"facebook":a.shareViaFB(l);break;case"twitter":a.shareViaTwitter(l);break;case"whatsApp":a.shareViaWhatsApp(l);break;case"hangouts":a.shareViaHangouts(l)}e.popover.hide()},e.moreBUQ=function(){o.show({title:"Not yet available",buttons:[{text:"OK",type:"button-block button-positive",onTap:function(){return!0}}]})}}]);