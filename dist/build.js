!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){/*!
	 * iScroll by Matteo "Cubiq" Spinelli ~ http://cubiq.org ~ Released under MIT license
	 */
"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(1),a=i(r),c=n(2),u=i(c),d=function(){function t(e){var i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(o(this,t),e.jquery&&(e=e[0]),"string"==typeof e&&(e=document.querySelector(e)),!e)throw"Element is not defined!";this.container=e,this.options=Object.assign({},n(4),i),this.state={LOOP:!1,POINTS:[]},n(5)["default"](this),a["default"].apply(this),u["default"].apply(this),this.state.ready=!0,this.emit("onReady"),n(6)["default"](this)}return s(t,[{key:"destructor",value:function(){}},{key:"update",value:function(){}},{key:"destroy",value:function(){this.destructor(),this.off()}}]),t}();a["default"].extend(d.prototype),u["default"].extend(d.prototype),window.Iscroll=d,t.exports=d},function(t,e){"use strict";function n(t){return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t}function i(t){if(this._customEvents[t])for(var e=this._customEvents[t].length;e--;)this._customEvents[t][e].apply(this,[].slice.call(arguments,1))}function o(t,e){if("object"!==(void 0===t?"undefined":n(t)))this._customEvents[t]||(this._customEvents[t]=[]),this._customEvents[t].push(e);else for(var i in t)this.attach(i,t[i])}function s(t,e){var n=function i(){e(),this.detach(t,i)};this.attach(t,n)}function r(t,e){if("object"!==(void 0===t?"undefined":n(t)))this._customEvents[t]&&(e?this._customEvents[t].filter(function(t){return t!==e}):this._customEvents[t]=[]);else for(var i in t)this.detach(i,t[i])}function a(t,e,n){this._events[t]||(this._events[t]=[]),n=n||this,e=e||this.container,this._events[t].push({cb:n,context:e}),e.addEventListener(t,n,!1)}function c(t,e,n){var i;if(t){if(this._events[t]){n=n||this,e=e||this.container;var o=this._events[t].slice(0);for(i=o.length;i--;)o[i].cb===n&&o[i].context===e&&(e.removeEventListener(t,n,!1),this._events[t].splice(i,1));this._events[t].length||delete this._events[t]}}else for(i in this._events)this.off(i,this._events[i].context,this._events[i].cb)}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={apply:function(t){t._events={},t._customEvents={}},extend:function(t){Object.assign(t,{attach:o,attachOnce:s,detach:r,emit:i,on:a,off:c})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),o={pointer:{start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel"},MSPointer:{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp",cancel:"MSPointerCancel"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"},mouse:{start:"mousedown",move:"mousemove",end:"mouseup",cancel:"mousecancel"}},s=["onReady","onRefresh","onDestroy","beforeScrollStart","scrollCancel","scrollStart","scroll","scrollEnd","flick","zoomStart","zoomEnd"],r={handleEvent:function(t){switch(t.type){case this.eventType.start:this._eventStart(t);break;case this.eventType.move:this._eventMove(t);break;case this.eventType.end:case this.eventType.cancel:this._eventEnd(t);break;case this.eventType.transitionEnd:this._eventTransitionEnd(t);break;case"orientationchange":case"resize":this._eventResize(t)}},_eventStart:function(t){this.options.preventDefault&&t.preventDefault();var e=t.targetTouches||[t],n=void 0,i=void 0,o=void 0,s=void 0,r=void 0;for(s=0,r=e.length;r>s;s++)n=e[s].identifier||0,i=e[s].pageX,o=e[s].pageY,this.state.POINTS[n]={id:n+"",phase:"start",initiated:!1,x:i,y:o,startX:i,startY:o,deltaX:0,deltaY:0,startTime:Date.now()};this.state.LOOP||this._renderLoop(),this.on(this.eventType.move,this.options.document),this.on(this.eventType.end,this.options.document)},_eventMove:function(t){var e=t.changedTouches||[t],n=this.state.POINTS,i=void 0,o=void 0;for(o=e.length;o--;)i=e[o].identifier||0,n[i]&&n[i].initiated&&(n[i]=this._updatePoint(n[i],t),n[i].phase="move")},_eventEnd:function(t){var e=t.changedTouches||[t],n=this.state.POINTS,i=void 0,o=void 0;for(o=e.length;o--;)i=e[o].identifier||0,n[i]&&n[i].initiated&&(n[i]=this._updatePoint(n[i],t),n[i].phase="end");this.off(this.eventType.move,this.options.document),this.off(this.eventType.end,this.options.document)},_eventResize:function(t){return clearTimeout(this._resizeTimeout),this.ready?void(this._resizeTimeout=setTimeout(this.refresh.bind(this),100)):this.attachOnce("onReady",this._eventResize.bind(this,t))},_updatePoint:function(t,e){t.currentTime=Date.now(),t.deltaX=t.x-e.pageX,t.deltaY=t.y-e.pageY,t.x=e.pageX,t.y=e.pageY;var n=t.startX-t.x,i=t.startY-t.y;t.distance=Math.sqrt(n*n+i*i),t.distanceX=n,t.distanceY=i;var o=Math.atan2(i,-n);return 0>o&&(o+=2*Math.PI),t.theta=o,t},_renderLoop:function(){var t=0,e=this.state.POINTS;for(var n in e){var o=e[n];switch(o.phase){case"move":this.emit("move",o);break;case"start":o.initiated||(o.initiated=!0,this.emit("start",o));break;case"end":o.initiated=!1,this.emit("end",o),delete e[n]}t++}this.state.LOOP=!!t,this.state.LOOP&&(0,i.read)(this._renderLoop.bind(this))}},a=function(t){var e=t.options,n=t.attach;s.forEach(function(t){e[t]&&n(t,e[t])})};e["default"]={apply:function(t){var e=t.options,n=t.detects;e.eventType?t.eventType=o[e.eventType]:n.hasPointerEvents?t.eventType=o.pointer:n.hasMSpointerEvents?t.eventType=o.MSPointer:n.useTouchEvents?t.eventType=o.touch:t.eventType=o.mouse,t.on("orientationchange",window),t.on("resize",window),t.on(t.eventType.start),t.on(t.eventType.transitionEnd),a(t)},extend:function(t){Object.assign(t,r)}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});for(var n=["ms","moz","webkit","o"],i=window.requestAnimationFrame,o=window.cancelAnimationFrame,s=0,r=[],a=[],c=0;c<n.length&&!i;++c)e.request=i=window[n[c]+"RequestAnimationFrame"],e.cancel=o=window[n[c]+"CancelAnimationFrame"]||window[n[c]+"CancelRequestAnimationFrame"];i||(e.request=i=function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-s)),i=setTimeout(function(){t(e+n)},n);return s=e+n,i}),o||(e.cancel=o=function(t){clearTimeout(t)});var u=function(t){r.push(t)},d=function(t){a.push(t)},h=function(t){var e=void 0;return function(){var n=arguments;e&&o(e),e=u(function(){e=!1,t.apply(this,n)})}},v=function f(){var t=r;r=[],t.forEach(function(t){return t()});var e=a;a=[],e.forEach(function(t){return t()}),i(f,"loop set")};i(v,"loop set"),e.request=i,e.cancel=o,e.read=u,e.write=d,e.throttle=h},function(t,e){"use strict";t.exports={eventType:void 0,document:document,preventDefault:!0,onReady:void 0}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){for(var e=document.createElement("div").style,n=["t","webkitT","MozT","msT","OT"],i=!1,o=0,s=n.length;s>o;o++)if(n[o]+"ransform"in e){i=n[o].substr(0,n[o].length-1);break}t.vendor=i},i=function(t){var e={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"oTransitionEnd",ms:"MSTransitionEnd"};t.vendor=e[t.vendor]||!1},o=function(t,e){var n=e.vendor;if(!n)return!1;var i=document.createElement("div").style;return t=""===n?t:n+t.charAt(0).toUpperCase()+t.substr(1),t in i&&t},s=function(t){Object.assign(t,{hasPointerEvents:!!window.navigator.pointerEnabled,hasMSpointerEvents:!!window.navigator.msPointerEnabled,useTouchEvents:"ontouchstart"in window&&/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(window.navigator.userAgent)}),t.useMouseEvents=!t.hasPointerEvents&&!t.hasMSpointerEvents&&!t.useTouchEvents};e["default"]=function(t){t.detects={},t.styles={};var e=t.detects,r=t.styles;s(e),n(e),i(e),Object.assign(r,{transform:o("transform",e),transitionDuration:o("transitionDuration",e)})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3);e["default"]=function(t){function e(){s=JSON.stringify(t.state,null,4),o!==s&&(o=s,n.innerHTML='<pre style="width:360px">'+s+"</pre>"),(0,i.write)(e)}var n=document.createElement("div"),o=void 0,s=void 0;n.style.position="fixed",n.style.top=0,n.style.right=0,n.style.padding=10,n.style.background="red",document.body.appendChild(n),(0,i.write)(e)}}]);
//# sourceMappingURL=build.js.map