/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

angular.module('app', ['ui.router'])
    .constant("SERVER_API_URL", "http://fiapi.radiumz.org/api")
    .constant("SERVER_AUDIO_URL", "http://idioms.mindong.asia/assets/audio/")
    .constant("CI_BUILD_NUMBER", "29")
    .constant("CI_COMMIT_HASH", "aca47ae")
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state({
            name: 'home',
            url: '/',
            component: 'landingPage'
        })
            .state({
            name: 'showidiom',
            url: '/idiom/{idiomtext}',
            component: 'viewIdiomPage',
            caseInsensitiveMatch: true
        })
            .state({
            name: 'showhelp',
            url: '/help',
            component: 'helpPage'
        })
            .state({
            name: 'showcategories',
            url: '/tags',
            component: 'categoryPage'
        })
            .state({
            name: 'showapps',
            url: '/apps',
            component: 'appsPage'
        });
        $urlRouterProvider.otherwise('/');
    }]);
__webpack_require__(3);
__webpack_require__(27);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var angular = __webpack_require__(1);
angular.module('app')
    .component('playerButton', __webpack_require__(4))
    .component('canvasCharacter', __webpack_require__(6))
    .component('fiHeader', __webpack_require__(8))
    .component('fiMainview', __webpack_require__(10))
    .component('fiSidebar', __webpack_require__(12))
    .component('viewIdiomPage', __webpack_require__(14))
    .component('appsPage', __webpack_require__(17))
    .component('helpPage', __webpack_require__(19))
    .component('landingPage', __webpack_require__(21))
    .component('categoryPage', __webpack_require__(23))
    .component('sharePanel', __webpack_require__(25));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function PlayerButtonController($scope, $element, $attrs) {
    var ctrl = this;
    ctrl.isAudioPlaying = false;
    ctrl.play = function () {
        console.log('Playing audio:' + ctrl.audioUrl);
        if (!ctrl.isAudioPlaying) {
            ctrl.isAudioPlaying = true;
            var uri = ctrl.audioUrl;
            var sound = new Howl({
                src: [uri],
                onend: function () {
                    console.log('Audio playback finished!');
                    ctrl.isAudioPlaying = false;
                    $scope.$apply();
                }.bind(this),
                onplayerror: function () {
                    console.log('Audio playback failed!');
                    ctrl.isAudioPlaying = false;
                    $scope.$apply();
                }.bind(this),
                onloaderror: function () {
                    console.log('Audio failed to load!');
                    ctrl.isAudioPlaying = false;
                    $scope.$apply();
                }.bind(this),
            });
            sound.play();
        }
    };
}
var PlayerButton = {
    template: __webpack_require__(5),
    bindings: {
        audioUrl: '@',
        text: '@' // text on the button
    },
    controller: PlayerButtonController
};
module.exports = PlayerButton;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<button class=\"ms-Button ms-Button--hero \" ng-click=\"$ctrl.play()\">\n    <span class=\"ms-Button-icon\">\n        <i ng-hide=\"$ctrl.isAudioPlaying\" class=\"ms-Icon ms-Icon--play\"></i>\n        <i ng-show=\"$ctrl.isAudioPlaying\" class=\"ms-Icon ms-Icon--ellipsis\"></i>\n    </span> \n    <span class=\"ms-Button-label\">{{$ctrl.text}}</span>\n</button>";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 用於顯示非Unicode或Unicode擴展區漢字的元件
function CanvasCharacterController($scope, KageService) {
    var ctrl = this;
    ctrl.altText = ""; // 用於 accessibility 的隱藏文字 (方便複製文本和 screen reader)
    ctrl.imgBase64Url = "";
    function updateText() {
        var requestedText = (ctrl.ids != '') ? ctrl.ids : ctrl.char;
        ctrl.altText = requestedText;
        console.log("[canvas-character] requesting IDS " + requestedText);
        ctrl.style = {
            'height': ctrl.size,
            'width': ctrl.size,
            'background': 'url("' + ctrl.imgBase64Url + '")',
            'background-size': 'contain',
            'display': 'inline-block',
            'vertical-align': -5
        };
        KageService.getGlyphImage(requestedText, 200, 1).then(function (r) {
            console.log('got it:', r);
            ctrl.imgBase64Url = r.data;
            ctrl.style['background'] = 'url("' + ctrl.imgBase64Url + '")';
        });
    }
    ctrl.$onChanges = function () {
        updateText();
    };
    ctrl.$onInit = function () {
        updateText();
    };
}
CanvasCharacterController.$inject = ['$scope', 'KageService'];
var CanvasCharacter = {
    template: __webpack_require__(7),
    bindings: {
        char: '@',
        ids: '@',
        size: '@' // size of the character image (=height=width)
    },
    controller: CanvasCharacterController
};
module.exports = CanvasCharacter;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<span ng-style=\"$ctrl.style\"></span><a style=\"font-size:0\">{{$ctrl.altText}}</a>";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function HeaderController($scope, $rootScope, $location) {
    $scope.isOpen = false;
    $scope.homeClicked = function () {
        $location.path('/');
        $rootScope.$emit('toggleSidebar', { 'state': false });
    };
    $scope.helpClicked = function () {
        $location.path('/help');
        $rootScope.$emit('toggleSidebar', { 'state': false });
    };
    $scope.ctgrClicked = function () {
        $location.path('/tags');
        $rootScope.$emit('toggleSidebar', { 'state': false });
    };
    $scope.downloadClicked = function () {
        $location.path('/apps');
        $rootScope.$emit('toggleSidebar', { 'state': false });
    };
    $scope.init = function () {
        $(".headerCommands.ms-CommandBar").CommandBar();
    };
    $scope.hamburgerClicked = function () {
        $rootScope.$emit('toggleSidebar');
    };
    function changeState(state) {
        if (state != undefined) {
            if (state == false)
                $scope.isOpen = false;
            else if (state == true)
                $scope.isOpen = true;
        }
        else {
            $scope.isOpen = !$scope.isOpen;
        }
        console.log($scope.isOpen);
    }
    var unbind = $rootScope.$on("toggleSidebar", function (e, args) {
        if (args) {
            changeState(args.state);
        }
        else {
            changeState(undefined);
        }
    });
    $scope.$on('$destroy', unbind);
    //  $scope.init();
}
;
HeaderController.$inject = ['$scope', '$rootScope', '$location'];
var Header = {
    template: __webpack_require__(9),
    controller: HeaderController
};
module.exports = Header;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div id=\"headerBar\" class=\"ms-bgColor-themeTertiary\">\n        <div id=\"logoRegion\" class=\"ms-bgColor-themePrimary\">\n            <div style=\"position: relative;left: 20px;\" class=\"ms-font-xxl ms-fontColor-themeLighter\">福州话熟语大全</div>\n        </div>\n        <div id=\"hamburgerButton\" ng-click=\"hamburgerClicked()\" class=\"ms-bgColor-themePrimary\">\n            <div class=\"ms-font-xxl ms-fontColor-themeLighter\">\n                <i class=\"ms-Icon\" ng-class=\"{'ms-Icon--x': isOpen, 'ms-Icon--menu': !isOpen}\"></i>\n            </div>\n        </div>\n        <div id=\"commandRegion\">\n            <div class=\"headerCommands ms-CommandBar\">\n                <div class=\"ms-CommandBar-sideCommands\">\n                    <div class=\"ms-CommandBarItem\" ng-click=\"downloadClicked()\">\n                        <div class=\"ms-CommandBarItem-linkWrapper\">\n                            <a class=\"ms-CommandBarItem-link\">\n                                <span class=\"ms-CommandBarItem-icon headerCommands ms-Icon ms-Icon--download\"></span>\n                                <span class=\"ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular\">下载 App</span>\n                            </a>\n                        </div>\n                    </div>\n                    <div class=\"ms-CommandBarItem\" ng-click=\"helpClicked()\">\n                        <div class=\"ms-CommandBarItem-linkWrapper\">\n                            <a class=\"ms-CommandBarItem-link\">\n                                <span class=\"ms-CommandBarItem-icon headerCommands ms-Icon ms-Icon--question\"></span>\n                                <span class=\"ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular\">帮助</span>\n                            </a>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"headerCommands ms-CommandBar-mainArea\">\n                    <div class=\"ms-CommandBarItem\" ng-click=\"homeClicked()\">\n                        <div class=\"ms-CommandBarItem-linkWrapper\">\n                            <a class=\"ms-CommandBarItem-link\">\n                                <span class=\"ms-CommandBarItem-icon headerCommands ms-Icon ms-Icon--home\"></span>\n                                <span class=\"ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular\">首页</span>\n                            </a>\n                        </div>\n                    </div>\n                    <div class=\"ms-CommandBarItem\" ng-click=\"ctgrClicked()\">\n                        <div class=\"ms-CommandBarItem-linkWrapper\">\n                            <a class=\"ms-CommandBarItem-link\">\n                                <span class=\"ms-CommandBarItem-icon headerCommands ms-Icon ms-Icon--waffle\"></span>\n                                <span class=\"ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular\">分类</span>\n                            </a>\n                        </div>\n                    </div>\n                    <!-- Overflow Command -->\n                    <div class=\"ms-CommandBarItem ms-CommandBarItem--iconOnly ms-CommandBarItem-overflow\">\n                        <div class=\"ms-CommandBarItem-linkWrapper\">\n                            <a class=\"ms-CommandBarItem-link\">\n                                <span class=\"ms-CommandBarItem-icon headerCommands ms-Icon ms-Icon--ellipsis\"></span>\n                                <span class=\"ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular\">Ellipsis</span>\n                                <i class=\"ms-CommandBarItem-chevronDown ms-Icon ms-Icon--chevronDown\"></i>\n                            </a>\n                        </div>\n                        <ul class=\"ms-CommandBar-overflowMenu ms-ContextualMenu\"></ul>\n                    </div>\n                    <!-- End Overflow Command -->\n                </div>\n            </div>\n    \n        </div>\n    </div>";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function FiMainviewController() {
}
;
FiMainviewController.$inject = [];
var FiMainview = {
    template: __webpack_require__(11),
    controller: FiMainviewController
};
module.exports = FiMainview;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<div id=\"mainContainer\" ng-cloak>\n\n    <fi-sidebar></fi-sidebar>\n    <div id=\"mainPane\">\n        <ui-view></ui-view>\n    </div>\n</div>";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

$ = __webpack_require__(0);
function FiSidebarController($scope, $rootScope, $location, dataService) {
    var ctrl = this;
    var hideSidebar = function () {
        $("#sideBar").addClass("sideBarHide");
    };
    ctrl.loading = false;
    ctrl.list = [];
    ctrl.loaded = false;
    // Only applicable in mobile view
    ctrl.isOpen = false;
    ctrl.tagName = "";
    ctrl.$onInit = function () {
        $(".ms-SearchBox").SearchBox();
    };
    ctrl.listItemClicked = function (text) {
        $rootScope._query = text;
        //$rootScope.$emit("switchToIdiom", {'text': text});
        $location.path('/idiom/' + text);
        $rootScope.$emit("toggleSidebar", { 'state': false });
    };
    ctrl.removeTagClicked = function () {
        switchToTag("");
    };
    function switchToTag(tag) {
        if (tag && tag != '') {
            ctrl.loading = true;
            dataService.getIdiomsByTag(tag).then(function (r) {
                ctrl.list = r;
                ctrl.tagName = tag;
                ctrl.loading = false;
            });
        }
        else {
            ctrl.tagName = "";
            loadAll();
        }
    }
    function loadAll() {
        ctrl.loading = true;
        dataService.getAllIdioms().then(function (r) {
            ctrl.list = r;
            ctrl.loaded = true;
            ctrl.loading = false;
        });
    }
    loadAll();
    var unbindSTT = $rootScope.$on("switchToTag", function (e, args) {
        if (args && args.tag) {
            switchToTag(args.tag);
        }
        else {
            switchToTag("");
        }
    });
    var unbindTS = $rootScope.$on("toggleSidebar", function (e, args) {
        if (args) {
            toggleSidebar(args.state);
        }
        else {
            toggleSidebar(undefined);
        }
    });
    ctrl.$onDestroy = function () {
        unbindSTT();
        unbindTS();
    };
    function toggleSidebar(state) {
        if (state != undefined) {
            if (state == false)
                ctrl.isOpen = false;
            else if (state == true)
                ctrl.isOpen = true;
        }
        else {
            ctrl.isOpen = !ctrl.isOpen;
        }
        console.log(ctrl.isOpen);
        // Animate
        if (ctrl.isOpen) {
            $("#sideBar").removeClass("sideBarHide").removeClass("slideLeftOut40").addClass("slideRightIn40");
        }
        else {
            $("#sideBar").removeClass("slideRightIn40").addClass("slideLeftOut40");
            setTimeout(hideSidebar, 170);
        }
    }
    ctrl.toggleSidebar = toggleSidebar;
}
;
FiSidebarController.$inject = ['$scope', '$rootScope', '$location', 'DataService'];
var FiSidebar = {
    template: __webpack_require__(13),
    controller: FiSidebarController
};
module.exports = FiSidebar;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<div id=\"sideBar\" class=\"ms-bgColor-themeLight sideBarHide\">\n\n    <div style=\"display:flex; flex-direction:row;\">\n        <div class=\"tagButton\" ng-class=\"{'tagButton-hide':!($ctrl.tagName.length)}\" style=\"order:1\">\n            <div class=\"tagButton-text ms-Font-m\">\n                {{$ctrl.tagName}}\n            </div>\n            <div ng-click=\"$ctrl.removeTagClicked()\" class=\"tagButton-removeButton\">\n                <i class=\"ms-Icon ms-Icon--x\"></i>\n            </div>\n\n        </div>\n        <div class=\"filterSearch ms-SearchBox\" style=\"order:2; flex-grow:100;\">\n            <input class=\"ms-SearchBox-field SearchBox\" ng-model=\"filterString\">\n            <label class=\"ms-SearchBox-label\">\n                <i class=\"ms-SearchBox-icon ms-Icon ms-Icon--search\"></i>搜索\n            </label>\n            <button class=\"ms-SearchBox-closeButton\">\n                <i class=\"ms-Icon ms-Icon--x\"></i>\n            </button>\n        </div>\n    </div>\n    <ul class=\"ms-List resultList\">\n        <div ng-repeat=\"item in filteredList = ($ctrl.list | filter:filterString)\" class=\"cListItem is-selectable\" ng-click=\"$ctrl.listItemClicked(item)\">\n            <span class=\"cListItem-primaryText ms-Font-xl\">{{item}}</span>\n        </div>\n        <div ng-show=\"$ctrl.loading\" class=\"ms-Spinner\"></div>\n        <div ng-show=\"$ctrl.loaded && filteredList.length==0\" class=\"ms-Font-xl\">没有符合条件的结果</div>\n\n    </ul>\n</div>";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DictUtils = __webpack_require__(15);
var $ = __webpack_require__(0);
function ViewIdiomPageController($q, $scope, $rootScope, $location, $routeParams, $sce, dataService, kageService, SERVER_AUDIO_URL) {
    var ctrl = this;
    ctrl.$onInit = function () {
        $(".ms-Panel").Panel();
    };
    $scope.highlight = [];
    $scope.highlightAnno = [];
    console.log('detailsCtrl $scope init');
    console.log($routeParams);
    switchToIdiom($routeParams.idiomtext);
    $scope.tagClicked = function (tagName) {
        $rootScope.$emit("switchToTag", { 'tag': tagName });
        $rootScope.$emit("toggleSidebar", { 'state': true });
    };
    $scope.getAbsoluteAudioUrl = function (filename) {
        if (filename === undefined) {
            return '';
        }
        else {
            return SERVER_AUDIO_URL + filename.replace('.wma', '.mp3');
        }
    };
    // load idiom by text
    function switchToIdiom(text) {
        if (text) {
            dataService.getIdiomByText(text).then(function (r) {
                $scope.result = r;
                var glyphs = DictUtils.getChars(r['field_text']);
                var i;
                var list = [];
                for (i = 0; i < glyphs.length; ++i) {
                    list[i] = {};
                    list[i]['text'] = glyphs[i];
                }
                $scope.field_text = list;
                for (i = 0; i < glyphs.length; ++i) {
                    if ((glyphs[i][0] == '{' && glyphs[i][glyphs[i].length - 1] == "}")
                        || DictUtils.extendedGlyphs.indexOf(glyphs[i]) != -1) {
                        $scope.field_text[i]['renderByCanvas'] = true;
                    }
                }
            }).catch(function () {
                console.log('detailsCtrl: view change failed.');
            });
        }
    }
    ;
    function getGlyphImage(str) {
    }
    $scope.highOn = function (annoId) {
        var indices = $scope.result['field_annotations'][annoId]['indices'];
        var i;
        for (i = 0; i < indices.length; ++i) {
            $scope.highlight[indices[i]] = true;
        }
        $scope.highlightAnno[annoId] = true;
    };
    $scope.highOff = function (annoId) {
        var indices = $scope.result['field_annotations'][annoId]['indices'];
        var i;
        for (i = 0; i < indices.length; ++i) {
            $scope.highlight[indices[i]] = false;
        }
        $scope.highlightAnno[annoId] = false;
    };
    $scope.showCallout = function () {
        var $ = __webpack_require__(0);
        $('.ms-Panel').addClass('is-open');
    };
    $scope.$on('$destroy', function () {
    });
}
;
ViewIdiomPageController.$inject = ['$q',
    '$scope',
    '$rootScope',
    '$location',
    '$stateParams',
    '$sce',
    'DataService',
    'KageService',
    'SERVER_AUDIO_URL'];
var ViewIdiomPage = {
    template: __webpack_require__(16),
    controller: ViewIdiomPageController
};
module.exports = ViewIdiomPage;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function getSymbols(string) {
    var index = 0;
    var length = string.length;
    var output = [];
    for (; index < length - 1; ++index) {
        var charCode = string.charCodeAt(index);
        if (charCode >= 0xD800 && charCode <= 0xDBFF) {
            charCode = string.charCodeAt(index + 1);
            if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
                output.push(string.slice(index, index + 2));
                ++index;
                continue;
            }
        }
        output.push(string.charAt(index));
    }
    output.push(string.charAt(index));
    return output;
}
var DictUtils = {};
(function () {
    'use strict';
    // Glyphs that are Unicode extended chars, but are missing in some fonts. (Needs to be replaced by KanjiVG)
    DictUtils.extendedGlyphs = ['𣍐', '𩩍', '𠲥', '𢵣', '𥻵', '𥮕'];
    // Get chars in a string. Treat IDS as a char.
    DictUtils.getChars = function (str) {
        var unicodeStr = getSymbols(str);
        var outputStr = [], tmp = "";
        var i, idsMode = false;
        for (i = 0; i < unicodeStr.length; ++i) {
            if (idsMode) {
                if (unicodeStr[i] == "}") {
                    tmp += "}";
                    idsMode = false;
                    outputStr.push(tmp);
                    tmp = "";
                }
                else {
                    tmp += unicodeStr[i];
                }
            }
            else {
                if (unicodeStr[i] == "{") {
                    idsMode = true;
                    tmp += "{";
                }
                else {
                    outputStr.push(unicodeStr[i]);
                }
            }
        }
        return outputStr;
    };
})();
module.exports = DictUtils;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<div id=\"contentWrapper\">\n    <div id=\"detailsHeader\">\n        <div class=\"ms-font-su\">\n            <span ng-repeat=\"char in field_text track by $index\" ng-class=\"{highlight: highlight[$index]}\"><a ng-if=\"char.renderByCanvas !== true\">{{char.text}}</a><canvas-character ids=\"{{char.text}}\" size=\"42\" ng-if=\"char.renderByCanvas\"></canvas-character></span>\n            <span class=\"shareButton ms-PanelAction-open\">\n                <i class=\"ms-Icon ms-Icon--share\"></i>\n            </span>\n        </div>\n        <div>\n            <span class=\"ms-font-l ms-bgColor-redDark ms-fontColor-neutralLighter playLabel\">发音</span>\n            <player-button text=\"福州市区音\" audio-url=\"{{getAbsoluteAudioUrl(result['field_audio'])}}\"></player-button>\n        </div>\n    </div>\n    <div id=\"detailsWrapper\">\n        <div ng-show=\"result['field_metaphor'].length>0\">\n            <span class=\"ms-font-l ms-bgColor-redDark ms-fontColor-neutralLighter charsymbol\">喻</span>\n            <span class=\"ms-font-l\">{{::result['field_metaphor']}}</span>\n        </div>\n        <p></p>\n        <div ng-show=\"result['field_notes'].length>0\">\n            <span class=\"ms-font-l ms-bgColor-redDark ms-fontColor-neutralLighter charsymbol\">案</span>\n            <span class=\"ms-font-l\">{{::result['field_notes']}}</span>\n        </div>\n\n\n        <h2 class=\"ms-font-xl ms-fontWeight-semibold\">单字注释：</h2>\n        <ul class=\"ms-font-l\">\n            <li ng-mouseenter=\"highOn($index)\" ng-mouseleave=\"highOff($index)\" ng-repeat=\"item in ::result['field_annotations'] track by $index\">\n                <span ng-class=\"{highlight: highlightAnno[$index]}\">{{::item[\"text\"]}}</span>\n                <span>: </span>\n                <span>{{::item[\"explanation\"]}}</span>\n            </li>\n        </ul>\n        <div>\n            <button ng-repeat=\"tag in ::result['field_tags']\" class=\"ms-Button ms-Button--primary\" ng-click=\"tagClicked(tag)\">\n                <span class=\"ms-Button-icon\">\n                    <i class=\"ms-Icon ms-Icon--plus\"></i>\n                </span>\n                <span class=\"ms-Button-label\">{{::tag}}</span>\n            </button>\n        </div>\n\n    </div>\n</div>";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function AppsPageController() {
}
;
var AppsPage = {
    template: __webpack_require__(18),
    controller: AppsPageController
};
module.exports = AppsPage;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:20px\">\n\n    <h1 class=\"ms-font-su ms-fontColor-themePrimary\">下载 App</h1>\n    <h2 class=\"ms-font-xl ms-fontColor-themePrimary\">福州话熟语大全 Android 版</h2>\n    <div class=\"ms-font-l ms-fontColor-themePrimary\">\n        <ul>\n            <li>离线发音，无需联网</li>\n            <li>轻松分享字图到社交软件</li>\n        </ul>\n        <a href=\"http://www.wandoujia.com/apps/org.mindonglab.foochowidioms\" target=\"_blank\">\n            <button class=\"ms-Button ms-Button--primary\" style=\"background-color: #107c10; border-color: #107c10;\">\n                <span class=\"ms-Button-icon\">\n                    <i class=\"ms-Icon ms-Icon--plus\"></i>\n                </span>\n                <span class=\"ms-Button-label\">豌豆荚下载</span>\n            </button>\n        </a>\n        <a href=\"http://www.wandoujia.com/apps/org.mindonglab.foochowidioms/download?pos=detail-ndownload-org.mindonglab.foochowidioms\" target=\"_blank\">\n            <button class=\"ms-Button ms-Button--primary\">\n                <span class=\"ms-Button-icon\">\n                    <i class=\"ms-Icon ms-Icon--plus\"></i>\n                </span>\n                <span class=\"ms-Button-label\">下载Apk</span>\n            </button>\n        </a>\n        <div>\n            <a href='https://play.google.com/store/apps/details?id=org.mindonglab.foochowidioms&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>\n                <img alt='下载应用，请到 Google Play' style=\"max-height: 60px\" src='assets/img/google-play-badge.png' />\n            </a>\n        </div>\n    </div>\n    <h2 class=\"ms-font-xl ms-fontColor-themePrimary\">iOS 版 开发中</h2>\n</div>";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function HelpPageController($scope, CI_BUILD_NUMBER, CI_COMMIT_HASH) {
    this.CI_BUILD_NUMBER = CI_BUILD_NUMBER;
    this.CI_COMMIT_HASH = CI_COMMIT_HASH;
}
;
HelpPageController.$inject = ['$scope', 'CI_BUILD_NUMBER', 'CI_COMMIT_HASH'];
var HelpPage = {
    template: __webpack_require__(20),
    controller: HelpPageController
};
module.exports = HelpPage;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:20px\">\n    <h1 class=\"ms-font-su ms-fontColor-themePrimary\">帮助</h1>\n    <h2 class=\"ms-font-xl ms-fontColor-themePrimary\">简介</h2>\n    <p class=\"ms-font-l\">\n        福州是一个千年古城，唐代以来它一直是福建的首府。(福州话)有鲜明的特色和丰富的文化积淀。 本地人可以琅琅上口，勾起依稀的记忆而倍觉亲切；语言学家可以获得最宝贵的语料去探讨这一古老闽语的语音、语义和语法的各种规律；历史学家、社会学家可以研究其中所体现的社会文化；文学家可以看到方言的艺术创造……\n        ——李如龙（《福州方言熟语歌谣》序）</p>\n    <p class=\"ms-font-l\">\n        “君子安雅，楚人安楚”，福州人说福州话。语言是文化的载体……熟语歌谣是方言文化遗产的自然结晶，其价值是弥足珍贵的。 ——陈泽平（《福州方言熟语歌谣》前言）\n    </p>\n    <h2 class=\"ms-font-xl ms-fontColor-themePrimary\">使用说明</h2>\n    <p class=\"ms-font-l\">\n        <b>查询</b> 您可以通过左侧的列表（手机上点击左上角），搜索全部的熟语。</p>\n    <p class=\"ms-font-l\">\n        <b>发音</b> 在详情页上，句子下方有播放按钮，点击即可播放。</p>\n    <p class=\"ms-font-l\">\n        <b>分享</b> 点击界面上的\n        <i class=\"ms-Icon ms-Icon--share\"></i>即可将词条分享给好友。您也可以直接复制网址。</p>\n    <h2 class=\"ms-font-xl ms-fontColor-themePrimary\">资料来源</h2>\n    <p class=\"ms-font-l\">《福州方言熟语歌谣》陈泽平 福建人民出版社</p>\n    <h2 class=\"ms-font-xl ms-fontColor-themePrimary\">关于此应用</h2>\n    <p class=\"ms-font-l\">此应用受到萌典 (moedict.tw) 的启发而开发。</p>\n    <h2 class=\"ms-font-xl ms-fontColor-themePrimary\">关于开发者</h2>\n    <p class=\"ms-font-l\">\n        <a href=\"http://lab.mindong.asia\" target=\"_blank\" class=\"ms-Link\">闽东语实验室 (lab.mindong.asia)</a> 是一个致力于用技术力量保护闽东语的开源社群。\n    </p>\n    <p class=\"ms-font-xs\">\n        Build {{::$ctrl.CI_BUILD_NUMBER}} @ {{::$ctrl.CI_COMMIT_HASH}}\n    </p>\n</div>";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function LandingPageController($scope, $rootScope, $location, kageService) {
    var ctrl = this;
    ctrl.featureClicked = function (id) {
        switch (id) {
            case 1:// List All
                // show sideBar
                $rootScope.$emit("toggleSidebar", { 'state': true });
                // remove tag filter
                $rootScope.$emit("switchToTag", { 'tag': "" });
                break;
            case 2:
                $location.path('/tags');
                $rootScope.$emit("toggleSidebar", { 'state': false });
                break;
            case 3:
                $location.path('/help');
                $rootScope.$emit("toggleSidebar", { 'state': false });
                break;
        }
    };
}
;
LandingPageController.$inject = ['$scope', '$rootScope', '$location', "KageService"];
;
var LandingPage = {
    template: __webpack_require__(22),
    controller: LandingPageController
};
module.exports = LandingPage;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:40px\">\n        <div class=\"ms-Grid\">\n            <div class=\"ms-Grid-row\">\n                <div class=\"ms-Grid-col ms-u-sm12 imgLogoWrapper\">\n                    <img class=\"imgLogo\" src=\"assets/img/logo-310.png\" alt=\"Logo\"/>\n                    <h1 class=\"ms-font-su ms-fontColor-themePrimary logoText-font-mobile\">福州话熟语大全</h1>\n                </div>\n            </div>\n            <div class=\"ms-Grid-row\">\n                <div class=\"ms-Grid-col ms-u-sm12 ms-u-lg4\">\n                    <div ng-click=\"$ctrl.featureClicked(1)\" class=\"featureButton ms-bgColor-themeLighter\">\n                        <i class=\"ms-Icon ms-Icon--listgroup2 ms-fontColor-themePrimary featureButton-icon\" ></i>\n                        <div class=\"ms-Font-l featureButton-text ms-fontColor-themeDarkAlt\">所有熟语</div>\n                    </div>\n                </div>\n                <div class=\"ms-Grid-col ms-u-sm12 ms-u-lg4\">\n                    <div ng-click=\"$ctrl.featureClicked(2)\" class=\"featureButton ms-bgColor-themeLighter\">\n                        <i class=\"ms-Icon ms-Icon--tag ms-fontColor-themePrimary featureButton-icon\" ></i>\n                        <div class=\"ms-Font-l featureButton-text ms-fontColor-themeDarkAlt\">分类标签</div>\n                    </div>\n                </div>\n                <div class=\"ms-Grid-col ms-u-sm12 ms-u-lg4\">\n                    <div ng-click=\"$ctrl.featureClicked(3)\" class=\"featureButton  ms-bgColor-themeLighter\">\n                        <i class=\"ms-Icon ms-Icon--question ms-fontColor-themePrimary featureButton-icon\" ></i>\n                        <div class=\"ms-Font-l featureButton-text ms-fontColor-themeDarkAlt\">帮助</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function CategoryPageController($scope, $rootScope, $location, dataService) {
    var ctrl = this;
    dataService.getAllTags().then(function (r) {
        ctrl.list = r;
    });
    ctrl.tagClicked = function (tagName) {
        $rootScope.$emit("switchToTag", { 'tag': tagName });
        $rootScope.$emit("toggleSidebar", { 'state': true });
    };
}
CategoryPageController.$inject = ['$scope', '$rootScope', '$location', "DataService"];
var CategoryPage = {
    template: __webpack_require__(24),
    controller: CategoryPageController
};
module.exports = CategoryPage;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<div style=\"padding:20px\">\n    <h2 class=\"ms-font-xl ms-fontColor-themePrimary\" ng-repeat=\"item in $ctrl.list\" ng-click=\"$ctrl.tagClicked(item)\">{{item}}</h2>\n</div>";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

$ = __webpack_require__(0);
function SharePanelController() {
    this.$onInit = function () {
        $(".ms-Panel").Panel();
    };
}
;
var SharePanel = {
    template: __webpack_require__(26),
    controller: SharePanelController
};
module.exports = SharePanel;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "<div class=\"ms-Panel\">\n    <div class=\"ms-Overlay ms-Overlay--dark ms-PanelAction-close\"></div>\n    <div class=\"ms-Panel-main\">\n        <div class=\"ms-Panel-commands\">\n            <div class=\"ms-CommandBar\">\n                <div class=\"ms-CommandBar-sideCommands\">\n                </div>\n                <div class=\"ms-CommandBar-mainArea\">\n\n                    <div class=\"ms-CommandBarItem ms-PanelAction-close\">\n                        <div class=\"ms-CommandBarItem-linkWrapper\">\n                            <div class=\"ms-CommandBarItem-link\">\n                                <span class=\"ms-CommandBarItem-icon ms-Icon ms-Icon--x\"></span>\n                                <span class=\"ms-CommandBarItem-commandText ms-font-m ms-font-weight-regular\">取消</span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"ms-Panel-contentInner\">\n            <span class=\"ms-Panel-headerText\">分享</span>\n            <p class=\"ms-font-m\">\n                分享到：\n            </p>\n            <!-- JiaThis Button BEGIN -->\n            <div class=\"jiathis_style_32x32\">\n                <a class=\"jiathis_button_qzone\"></a>\n                <a class=\"jiathis_button_tsina\"></a>\n                <a class=\"jiathis_button_tqq\"></a>\n                <a class=\"jiathis_button_weixin\"></a>\n                <a class=\"jiathis_button_renren\"></a>\n                <a href=\"http://www.jiathis.com/share\" class=\"jiathis jiathis_txt jtico jtico_jiathis\" target=\"_blank\"></a>\n                <a class=\"jiathis_counter_style\"></a>\n            </div>\n            <script type=\"text/javascript\" src=\"http://v3.jiathis.com/code/jia.js\" charset=\"utf-8\"></script>\n            <!-- JiaThis Button END -->\n        </div>\n    </div>\n</div>";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var angular = __webpack_require__(1);
angular.module('app')
    .factory('DataService', __webpack_require__(28))
    .factory('KageService', __webpack_require__(29));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

DataService.$inject = ['$http', '$q', "SERVER_API_URL"];
function DataService($http, $q, SERVER_API_URL) {
    return {
        getAllIdioms: getAllIdioms,
        getIdiomsByTag: getIdiomsByTag,
        getIdiomByText: getIdiomByText,
        getGlyph: getGlyph,
        getAllTags: getAllTags
    };
    function getAllIdioms() {
        return $q.when($http.get(SERVER_API_URL + '/all/').then(function (r) {
            return r.data;
        }).catch(function () {
            console.log('DataService: Error in getAllIdioms()');
            return $q.reject('e');
        }));
    }
    function getAllTags() {
        return $q.when($http.get(SERVER_API_URL + '/tags/').then(function (r) {
            return r.data;
        }).catch(function () {
            console.log('DataService: Error in getAllTags()');
            return $q.reject('e');
        }));
    }
    function getIdiomsByTag(tagName) {
        return $q.when($http.get(SERVER_API_URL + '/tag/' + tagName).then(function (r) {
            return r.data;
        }).catch(function () {
            return $q.reject('e');
        }));
    }
    function getGlyph(ids) {
        return $q.when($http.get(SERVER_API_URL + '/glyph/' + ids).then(function (r) {
            return r.data;
        }).catch(function () {
            return $q.reject('e');
        }));
    }
    function getIdiomByText(text) {
        return $q.when($http.get(SERVER_API_URL + '/sentence/' + text).then(function (r) {
            return r.data;
        }).catch(function () {
            return $q.reject('e');
        }));
    }
}
;
module.exports = DataService;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Kage) {
KageService.$inject = ["DataService", "$q"];
function KageService(dataService, $q) {
    return {
        getKage: getKage,
        getGlyphImage: getGlyphImage
    };
    function getKage(ids, canvas) {
        return $q.when(dataService.getGlyph(ids)).then(function (r) {
            drawKage(r["field_kanjivg"], canvas);
            return canvas;
        }).catch(function () {
            return $q.reject('e');
        });
    }
    function getGlyphImage(str, size, id) {
        var can = document.createElement('canvas');
        can.height = size;
        can.width = size;
        return getKage(str, can).then(function (can) {
            return { id: id, data: can.toDataURL() };
        }).catch(function () {
            return $q.reject('e');
        });
    }
    function drawKage(arr, canvas) {
        var ctx = canvas.getContext("2d");
        var kage = new Kage();
        kage.kUseCurve = false;
        var polygons = new Polygons();
        for (var i = 0; i < arr.length; ++i) {
            kage.kBuhin.push(arr[i]["name"], arr[i]["code"]);
        }
        kage.makeGlyph(polygons, "target");
        ctx.fillStyle = "rgb(0, 0, 0)";
        for (var i = 0; i < polygons.array.length; i++) {
            ctx.beginPath();
            ctx.moveTo(polygons.array[i].array[0].x, polygons.array[i].array[0].y);
            for (var j = 1; j < polygons.array[i].array.length; j++) {
                ctx.lineTo(polygons.array[i].array[j].x, polygons.array[i].array[j].y);
            }
            ctx.closePath();
            ctx.fill();
        }
    }
}
;
module.exports = KageService;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = Kage;

/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map