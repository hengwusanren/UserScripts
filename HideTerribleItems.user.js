// ==UserScript==
// @name         HideTerribleItems
// @version      0.1
// @description  hide items whose name contains particular keywords
// @author       Hengwu
// @include      http://*.taobao.com/*
// @include      https://*.taobao.com/*
// ==/UserScript==

function hideTerribleItems() {
    window.hideTerribleItems = {};
    window.hideTerribleItems.keywords = ['修身'];
    window.hideTerribleItems.lastUrl = '';
	window.hideTerribleItems.listSelector = 'div.items.g-clearfix';
	window.hideTerribleItems.listItemSelector = 'div.item';
	window.hideTerribleItems.listItemTitleSelector = '.title';
    var filter = function () {
        var searchResultList = document.querySelectorAll(window.hideTerribleItems.listSelector)[0];
        if(!searchResultList) return;
        if(location.href === window.hideTerribleItems.lastUrl) return;
        console.log(1);
        var searchResults = searchResultList.querySelectorAll(window.hideTerribleItems.listItemSelector);
        console.log(searchResults);
        for(var i = 0, n = searchResults.length; i < n; i++) {
            var curItemTitle = searchResults[i].querySelectorAll(window.hideTerribleItems.listItemTitleSelector)[0];
            if(!curItemTitle) continue;
            curItemTitle = curItemTitle.innerHTML;
            for(var j = 0, k = window.hideTerribleItems.keywords.length; j < k; j++) {
                if(curItemTitle.indexOf(window.hideTerribleItems.keywords[j]) > 0) {
                    searchResults[i].style.display = 'none';
                    break;
                }
            }
        };
        window.hideTerribleItems.lastUrl = location.href;
    };
    var r = setInterval(filter, 500);
}

(function (func) {
    var oldonload = window.onload;
    if(typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
})(hideTerribleItems);