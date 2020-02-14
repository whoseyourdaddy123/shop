/*!
 * better-scroll / better-scroll
 * (c) 2016-2020 ustbhuangyi
 * Released under the MIT License.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function warn(msg) {
    console.error("[BScroll warn]: " + msg);
}

// ssr support
var inBrowser = typeof window !== 'undefined';
var ua = inBrowser && navigator.userAgent.toLowerCase();
var isWeChatDevTools = ua && /wechatdevtools/.test(ua);
var isAndroid = ua && ua.indexOf('android') > 0;

function getNow() {
    return window.performance && window.performance.now && window.performance.timing
        ? window.performance.now() + window.performance.timing.navigationStart
        : +new Date();
}
function extend(target) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < rest.length; i++) {
        var source = rest[i];
        for (var key in source) {
            target[key] = source[key];
        }
    }
    return target;
}
function isUndef(v) {
    return v === undefined || v === null;
}
function isPlainObject(v) {
    return typeof v === 'object' && v !== null;
}
function getDistance(x, y) {
    return Math.sqrt(x * x + y * y);
}
function fixInboundValue(x, min, max) {
    if (x < min) {
        return min;
    }
    if (x > max) {
        return max;
    }
    return x;
}

var elementStyle = (inBrowser &&
    document.createElement('div').style);
var vendor = (function () {
    if (!inBrowser) {
        return false;
    }
    var transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };
    for (var key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key;
        }
    }
    return false;
})();
function prefixStyle(style) {
    if (vendor === false) {
        return style;
    }
    if (vendor === 'standard') {
        if (style === 'transitionEnd') {
            return 'transitionend';
        }
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
function getElement(el) {
    return (typeof el === 'string'
        ? document.querySelector(el)
        : el);
}
function addEvent(el, type, fn, capture) {
    el.addEventListener(type, fn, {
        passive: false,
        capture: !!capture
    });
}
function removeEvent(el, type, fn, capture) {
    el.removeEventListener(type, fn, {
        capture: !!capture
    });
}
function offset(el) {
    var left = 0;
    var top = 0;
    while (el) {
        left -= el.offsetLeft;
        top -= el.offsetTop;
        el = el.offsetParent;
    }
    return {
        left: left,
        top: top
    };
}
function offsetToBody(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: -(rect.left + window.pageXOffset),
        top: -(rect.top + window.pageYOffset)
    };
}
var cssVendor = vendor && vendor !== 'standard' ? '-' + vendor.toLowerCase() + '-' : '';
var transform = prefixStyle('transform');
var transition = prefixStyle('transition');
var hasPerspective = inBrowser && prefixStyle('perspective') in elementStyle;
// fix issue #361
var hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools);
var hasTransition = inBrowser && transition in elementStyle;
var style = {
    transform: transform,
    transition: transition,
    transitionTimingFunction: prefixStyle('transitionTimingFunction'),
    transitionDuration: prefixStyle('transitionDuration'),
    transitionDelay: prefixStyle('transitionDelay'),
    transformOrigin: prefixStyle('transformOrigin'),
    transitionEnd: prefixStyle('transitionEnd')
};
var eventTypeMap = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,
    mousedown: 2,
    mousemove: 2,
    mouseup: 2
};
function getRect(el) {
    if (el instanceof window.SVGElement) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        };
    }
    else {
        return {
            top: el.offsetTop,
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
    }
}
function preventDefaultExceptionFn(el, exceptions) {
    for (var i in exceptions) {
        if (exceptions[i].test(el[i])) {
            return true;
        }
    }
    return false;
}
var tagExceptionFn = preventDefaultExceptionFn;
function tap(e, eventName) {
    var ev = document.createEvent('Event');
    ev.initEvent(eventName, true, true);
    ev.pageX = e.pageX;
    ev.pageY = e.pageY;
    e.target.dispatchEvent(ev);
}
function click(e, event) {
    if (event === void 0) { event = 'click'; }
    var eventSource;
    if (e.type === 'mouseup') {
        eventSource = e;
    }
    else if (e.type === 'touchend' || e.type === 'touchcancel') {
        eventSource = e.changedTouches[0];
    }
    var posSrc = {};
    if (eventSource) {
        posSrc.screenX = eventSource.screenX || 0;
        posSrc.screenY = eventSource.screenY || 0;
        posSrc.clientX = eventSource.clientX || 0;
        posSrc.clientY = eventSource.clientY || 0;
    }
    var ev;
    var bubbles = true;
    var cancelable = true;
    if (typeof MouseEvent !== 'undefined') {
        try {
            ev = new MouseEvent(event, extend({
                bubbles: bubbles,
                cancelable: cancelable
            }, posSrc));
        }
        catch (e) {
            createEvent();
        }
    }
    else {
        createEvent();
    }
    function createEvent() {
        ev = document.createEvent('Event');
        ev.initEvent(event, bubbles, cancelable);
        extend(ev, posSrc);
    }
    // forwardedTouchEvent set to true in case of the conflict with fastclick
    ev.forwardedTouchEvent = true;
    ev._constructed = true;
    e.target.dispatchEvent(ev);
}
function dblclick(e) {
    click(e, 'dblclick');
}
function prepend(el, target) {
    var firstChild = target.firstChild;
    if (firstChild) {
        before(el, firstChild);
    }
    else {
        target.appendChild(el);
    }
}
function before(el, target) {
    target.parentNode.insertBefore(el, target);
}
function removeChild(el, child) {
    el.removeChild(child);
}
function hasClass(el, className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

var ease = {
    // easeOutQuint
    swipe: {
        style: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fn: function (t) {
            return 1 + --t * t * t * t * t;
        }
    },
    // easeOutQuard
    swipeBounce: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function (t) {
            return t * (2 - t);
        }
    },
    // easeOutQuart
    bounce: {
        style: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        fn: function (t) {
            return 1 - --t * t * t * t;
        }
    }
};

var DEFAULT_INTERVAL = 100 / 60;
var windowCompat = inBrowser && window;
function noop() { }
var requestAnimationFrame = (function () {
    if (!inBrowser) {
        /* istanbul ignore if */
        return noop;
    }
    return (windowCompat.requestAnimationFrame ||
        windowCompat.webkitRequestAnimationFrame ||
        windowCompat.mozRequestAnimationFrame ||
        windowCompat.oRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function (callback) {
            return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL) / 2); // make interval as precise as possible.
        });
})();
var cancelAnimationFrame = (function () {
    if (!inBrowser) {
        /* istanbul ignore if */
        return noop;
    }
    return (windowCompat.cancelAnimationFrame ||
        windowCompat.webkitCancelAnimationFrame ||
        windowCompat.mozCancelAnimationFrame ||
        windowCompat.oCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id);
        });
})();

var noop$1 = function (val) { };
var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop$1,
    set: noop$1
};
var getProperty = function (obj, key) {
    var keys = key.split('.');
    for (var i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
        if (typeof obj !== 'object' || !obj)
            return;
    }
    var lastKey = keys.pop();
    if (typeof obj[lastKey] === 'function') {
        return function () {
            return obj[lastKey].apply(obj, arguments);
        };
    }
    else {
        return obj[lastKey];
    }
};
var setProperty = function (obj, key, value) {
    var keys = key.split('.');
    var temp;
    for (var i = 0; i < keys.length - 1; i++) {
        temp = keys[i];
        if (!obj[temp])
            obj[temp] = {};
        obj = obj[temp];
    }
    obj[keys.pop()] = value;
};
function propertiesProxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return getProperty(this, sourceKey);
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        setProperty(this, sourceKey, val);
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

var EventEmitter = /** @class */ (function () {
    function EventEmitter(names) {
        this.events = {};
        this.eventTypes = {};
        this.registerType(names);
    }
    EventEmitter.prototype.on = function (type, fn, context) {
        if (context === void 0) { context = this; }
        this.hasType(type);
        if (!this.events[type]) {
            this.events[type] = [];
        }
        this.events[type].push([fn, context]);
        return this;
    };
    EventEmitter.prototype.once = function (type, fn, context) {
        var _this = this;
        if (context === void 0) { context = this; }
        this.hasType(type);
        var magic = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.off(type, magic);
            fn.apply(context, args);
        };
        magic.fn = fn;
        this.on(type, magic);
        return this;
    };
    EventEmitter.prototype.off = function (type, fn) {
        if (!type && !fn) {
            this.events = {};
            return this;
        }
        if (type) {
            this.hasType(type);
            if (!fn) {
                this.events[type] = [];
                return this;
            }
            var events = this.events[type];
            if (!events) {
                return this;
            }
            var count = events.length;
            while (count--) {
                if (events[count][0] === fn ||
                    (events[count][0] && events[count][0].fn === fn)) {
                    events.splice(count, 1);
                }
            }
            return this;
        }
    };
    EventEmitter.prototype.trigger = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.hasType(type);
        var events = this.events[type];
        if (!events) {
            return;
        }
        var len = events.length;
        var eventsCopy = events.slice();
        var ret;
        for (var i = 0; i < len; i++) {
            var event_1 = eventsCopy[i];
            var fn = event_1[0], context = event_1[1];
            if (fn) {
                ret = fn.apply(context, args);
                if (ret === true) {
                    return ret;
                }
            }
        }
    };
    EventEmitter.prototype.registerType = function (names) {
        var _this = this;
        names.forEach(function (type) {
            _this.eventTypes[type] = type;
        });
    };
    EventEmitter.prototype.destroy = function () {
        this.events = {};
        this.eventTypes = {};
    };
    EventEmitter.prototype.hasType = function (type) {
        var types = this.eventTypes;
        var isType = types[type] === type;
        if (!isType) {
            warn("EventEmitter has used unknown event type: \"" + type + "\", should be oneof [" +
                ("" + Object.keys(types).map(function (_) { return JSON.stringify(_); })) +
                "]");
        }
    };
    return EventEmitter;
}());
var EventRegister = /** @class */ (function () {
    function EventRegister(wrapper, events) {
        this.wrapper = wrapper;
        this.events = events;
        this.addDOMEvents();
    }
    EventRegister.prototype.destroy = function () {
        this.removeDOMEvents();
        this.events = [];
    };
    EventRegister.prototype.addDOMEvents = function () {
        this.handleDOMEvents(addEvent);
    };
    EventRegister.prototype.removeDOMEvents = function () {
        this.handleDOMEvents(removeEvent);
    };
    EventRegister.prototype.handleDOMEvents = function (eventOperation) {
        var _this = this;
        var wrapper = this.wrapper;
        this.events.forEach(function (event) {
            eventOperation(wrapper, event.name, _this, !!event.capture);
        });
    };
    EventRegister.prototype.handleEvent = function (e) {
        var eventType = e.type;
        this.events.some(function (event) {
            if (event.name === eventType) {
                event.handler(e);
                return true;
            }
            return false;
        });
    };
    return EventRegister;
}());

var Options = /** @class */ (function () {
    function Options() {
        this.startX = 0;
        this.startY = 0;
        this.scrollX = false;
        this.scrollY = true;
        this.freeScroll = false;
        this.directionLockThreshold = 5;
        this.eventPassthrough = "" /* None */;
        this.click = false;
        this.dblclick = false;
        this.tap = '';
        this.bounce = {
            top: true,
            bottom: true,
            left: true,
            right: true
        };
        this.bounceTime = 800;
        this.momentum = true;
        this.momentumLimitTime = 300;
        this.momentumLimitDistance = 15;
        this.swipeTime = 2500;
        this.swipeBounceTime = 500;
        this.deceleration = 0.0015;
        this.flickLimitTime = 200;
        this.flickLimitDistance = 100;
        this.resizePolling = 60;
        this.probeType = 0 /* Default */;
        this.stopPropagation = false;
        this.preventDefault = true;
        this.preventDefaultException = {
            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO)$/
        };
        this.tagException = {
            tagName: /^TEXTAREA$/
        };
        this.HWCompositing = true;
        this.useTransition = true;
        this.bindToWrapper = false;
        this.disableMouse = hasTouch;
        this.disableTouch = !hasTouch;
        this.autoBlur = true;
    }
    Options.prototype.merge = function (options) {
        if (!options)
            return this;
        for (var key in options) {
            this[key] = options[key];
        }
        return this;
    };
    Options.prototype.process = function () {
        this.translateZ =
            this.HWCompositing && hasPerspective ? ' translateZ(0)' : '';
        this.useTransition = this.useTransition && hasTransition;
        this.preventDefault = !this.eventPassthrough && this.preventDefault;
        this.resolveBounce();
        // If you want eventPassthrough I have to lock one of the axes
        this.scrollX =
            this.eventPassthrough === "horizontal" /* Horizontal */
                ? false
                : this.scrollX;
        this.scrollY =
            this.eventPassthrough === "vertical" /* Vertical */ ? false : this.scrollY;
        // With eventPassthrough we also need lockDirection mechanism
        this.freeScroll = this.freeScroll && !this.eventPassthrough;
        // force true when freeScroll is true
        this.scrollX = this.freeScroll ? true : this.scrollX;
        this.scrollY = this.freeScroll ? true : this.scrollY;
        this.directionLockThreshold = this.eventPassthrough
            ? 0
            : this.directionLockThreshold;
        return this;
    };
    Options.prototype.resolveBounce = function () {
        var directions = ['top', 'right', 'bottom', 'left'];
        var bounce = this.bounce;
        if (bounce === false || bounce === true) {
            this.bounce = makeMap(directions, bounce);
        }
    };
    return Options;
}());
function makeMap(keys, val) {
    if (val === void 0) { val = true; }
    var ret = {};
    keys.forEach(function (key) {
        ret[key] = val;
    });
    return ret;
}

var ActionsHandler = /** @class */ (function () {
    function ActionsHandler(wrapper, options) {
        this.wrapper = wrapper;
        this.options = options;
        this.hooks = new EventEmitter([
            'beforeStart',
            'start',
            'move',
            'end',
            'click'
        ]);
        this.handleDOMEvents();
    }
    ActionsHandler.prototype.handleDOMEvents = function () {
        var _a = this.options, bindToWrapper = _a.bindToWrapper, disableMouse = _a.disableMouse, disableTouch = _a.disableTouch, click = _a.click;
        var wrapper = this.wrapper;
        var target = bindToWrapper ? wrapper : window;
        var wrapperEvents = [];
        var targetEvents = [];
        var shouldRegisterTouch = hasTouch && !disableTouch;
        var shouldRegisterMouse = !disableMouse;
        if (click) {
            wrapperEvents.push({
                name: 'click',
                handler: this.click.bind(this),
                capture: true
            });
        }
        if (shouldRegisterTouch) {
            wrapperEvents.push({
                name: 'touchstart',
                handler: this.start.bind(this)
            });
            targetEvents.push({
                name: 'touchmove',
                handler: this.move.bind(this)
            }, {
                name: 'touchend',
                handler: this.end.bind(this)
            }, {
                name: 'touchcancel',
                handler: this.end.bind(this)
            });
        }
        if (shouldRegisterMouse) {
            wrapperEvents.push({
                name: 'mousedown',
                handler: this.start.bind(this)
            });
            targetEvents.push({
                name: 'mousemove',
                handler: this.move.bind(this)
            }, {
                name: 'mouseup',
                handler: this.end.bind(this)
            });
        }
        this.wrapperEventRegister = new EventRegister(wrapper, wrapperEvents);
        this.targetEventRegister = new EventRegister(target, targetEvents);
    };
    ActionsHandler.prototype.beforeHandler = function (e, type) {
        var _a = this.options, preventDefault = _a.preventDefault, stopPropagation = _a.stopPropagation, preventDefaultException = _a.preventDefaultException;
        var preventDefaultConditions = {
            start: function () {
                return (preventDefault &&
                    !preventDefaultExceptionFn(e.target, preventDefaultException));
            },
            end: function () {
                return (preventDefault &&
                    !preventDefaultExceptionFn(e.target, preventDefaultException));
            },
            move: function () {
                return preventDefault;
            }
        };
        if (preventDefaultConditions[type]()) {
            e.preventDefault();
        }
        if (stopPropagation) {
            e.stopPropagation();
        }
    };
    ActionsHandler.prototype.setInitiated = function (type) {
        if (type === void 0) { type = 0; }
        this.initiated = type;
    };
    ActionsHandler.prototype.start = function (e) {
        var _eventType = eventTypeMap[e.type];
        if (this.initiated && this.initiated !== _eventType) {
            return;
        }
        this.setInitiated(_eventType);
        // if textarea or other html tags in options.tagException is manipulated
        // do not make bs scroll
        if (tagExceptionFn(e.target, this.options.tagException)) {
            this.setInitiated();
            return;
        }
        // no mouse left button
        if (_eventType === 2 /* Mouse */ && e.button !== 0 /* Left */)
            return;
        if (this.hooks.trigger(this.hooks.eventTypes.beforeStart, e)) {
            return;
        }
        this.beforeHandler(e, 'start');
        var point = (e.touches ? e.touches[0] : e);
        this.pointX = point.pageX;
        this.pointY = point.pageY;
        this.hooks.trigger(this.hooks.eventTypes.start, e);
    };
    ActionsHandler.prototype.move = function (e) {
        if (eventTypeMap[e.type] !== this.initiated) {
            return;
        }
        this.beforeHandler(e, 'move');
        var point = (e.touches ? e.touches[0] : e);
        var deltaX = point.pageX - this.pointX;
        var deltaY = point.pageY - this.pointY;
        this.pointX = point.pageX;
        this.pointY = point.pageY;
        if (this.hooks.trigger(this.hooks.eventTypes.move, {
            deltaX: deltaX,
            deltaY: deltaY,
            e: e
        })) {
            return;
        }
        // auto end when out of wrapper
        var scrollLeft = document.documentElement.scrollLeft ||
            window.pageXOffset ||
            document.body.scrollLeft;
        var scrollTop = document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
        var pX = this.pointX - scrollLeft;
        var pY = this.pointY - scrollTop;
        if (pX >
            document.documentElement.clientWidth -
                this.options.momentumLimitDistance ||
            pX < this.options.momentumLimitDistance ||
            pY < this.options.momentumLimitDistance ||
            pY >
                document.documentElement.clientHeight -
                    this.options.momentumLimitDistance) {
            this.end(e);
        }
    };
    ActionsHandler.prototype.end = function (e) {
        if (eventTypeMap[e.type] !== this.initiated) {
            return;
        }
        this.setInitiated();
        this.beforeHandler(e, 'end');
        this.hooks.trigger(this.hooks.eventTypes.end, e);
    };
    ActionsHandler.prototype.click = function (e) {
        this.hooks.trigger(this.hooks.eventTypes.click, e);
    };
    ActionsHandler.prototype.destroy = function () {
        this.wrapperEventRegister.destroy();
        this.targetEventRegister.destroy();
        this.hooks.destroy();
    };
    return ActionsHandler;
}());

var translaterMetaData = {
    x: ['translateX', 'px'],
    y: ['translateY', 'px']
};
var Translater = /** @class */ (function () {
    function Translater(content) {
        this.content = content;
        this.style = content.style;
        this.hooks = new EventEmitter(['beforeTranslate', 'translate']);
    }
    Translater.prototype.getComputedPosition = function () {
        var cssStyle = window.getComputedStyle(this.content, null);
        var matrix = cssStyle[style.transform].split(')')[0].split(', ');
        var x = +(matrix[12] || matrix[4]);
        var y = +(matrix[13] || matrix[5]);
        return {
            x: x,
            y: y
        };
    };
    Translater.prototype.translate = function (point) {
        var transformStyle = [];
        Object.keys(point).forEach(function (key) {
            if (!translaterMetaData[key]) {
                return;
            }
            var transformFnName = translaterMetaData[key][0];
            if (transformFnName) {
                var transformFnArgUnit = translaterMetaData[key][1];
                var transformFnArg = point[key];
                transformStyle.push(transformFnName + "(" + transformFnArg + transformFnArgUnit + ")");
            }
        });
        this.hooks.trigger(this.hooks.eventTypes.beforeTranslate, transformStyle, point);
        this.style[style.transform] = transformStyle.join(' ');
        this.hooks.trigger(this.hooks.eventTypes.translate, point);
    };
    Translater.prototype.destroy = function () {
        this.hooks.destroy();
    };
    return Translater;
}());

var Base = /** @class */ (function () {
    function Base(content, translater, options) {
        this.content = content;
        this.translater = translater;
        this.options = options;
        this.hooks = new EventEmitter([
            'move',
            'end',
            'beforeForceStop',
            'forceStop',
            'time',
            'timeFunction'
        ]);
        this.style = content.style;
    }
    Base.prototype.translate = function (endPoint) {
        this.translater.translate(endPoint);
    };
    Base.prototype.setPending = function (pending) {
        this.pending = pending;
    };
    Base.prototype.setForceStopped = function (forceStopped) {
        this.forceStopped = forceStopped;
    };
    Base.prototype.destroy = function () {
        this.hooks.destroy();
        cancelAnimationFrame(this.timer);
    };
    return Base;
}());

var Transition = /** @class */ (function (_super) {
    __extends(Transition, _super);
    function Transition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Transition.prototype.startProbe = function () {
        var _this = this;
        var probe = function () {
            var pos = _this.translater.getComputedPosition();
            _this.hooks.trigger(_this.hooks.eventTypes.move, pos);
            // excute when transition ends
            if (!_this.pending) {
                _this.hooks.trigger(_this.hooks.eventTypes.end, pos);
                return;
            }
            _this.timer = requestAnimationFrame(probe);
        };
        cancelAnimationFrame(this.timer);
        this.timer = requestAnimationFrame(probe);
    };
    Transition.prototype.transitionTime = function (time) {
        if (time === void 0) { time = 0; }
        this.style[style.transitionDuration] = time + 'ms';
        this.hooks.trigger(this.hooks.eventTypes.time, time);
    };
    Transition.prototype.transitionTimingFunction = function (easing) {
        this.style[style.transitionTimingFunction] = easing;
        this.hooks.trigger(this.hooks.eventTypes.timeFunction, easing);
    };
    Transition.prototype.move = function (startPoint, endPoint, time, easingFn, isSlient) {
        this.setPending(time > 0 && (startPoint.x !== endPoint.x || startPoint.y !== endPoint.y));
        this.transitionTimingFunction(easingFn);
        this.transitionTime(time);
        this.translate(endPoint);
        if (time && this.options.probeType === 3 /* Realtime */) {
            this.startProbe();
        }
        // if we change content's transformY in a tick
        // such as: 0 -> 50px -> 0
        // transitionend will not be triggered
        // so we forceupdate by reflow
        if (!time) {
            this._reflow = this.content.offsetHeight;
        }
        // no need to dispatch move and end when slient
        if (!time && !isSlient) {
            this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
            this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
        }
    };
    Transition.prototype.stop = function () {
        // still in transition
        if (this.pending) {
            this.setPending(false);
            cancelAnimationFrame(this.timer);
            var _a = this.translater.getComputedPosition(), x = _a.x, y = _a.y;
            this.transitionTime();
            this.translate({ x: x, y: y });
            this.setForceStopped(true);
            if (this.hooks.trigger(this.hooks.eventTypes.beforeForceStop, { x: x, y: y })) {
                return;
            }
            this.hooks.trigger(this.hooks.eventTypes.forceStop, { x: x, y: y });
        }
    };
    return Transition;
}(Base));

var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation.prototype.move = function (startPoint, endPoint, time, easingFn, isSlient) {
        // time is 0
        if (!time) {
            this.translate(endPoint);
            // if we change content's transformY in a tick
            // such as: 0 -> 50px -> 0
            // transitionend will not be triggered
            // so we forceupdate by reflow
            this._reflow = this.content.offsetHeight;
            // no need to dispatch move and end when slient
            if (isSlient)
                return;
            this.hooks.trigger(this.hooks.eventTypes.move, endPoint);
            this.hooks.trigger(this.hooks.eventTypes.end, endPoint);
            return;
        }
        this.animate(startPoint, endPoint, time, easingFn);
    };
    Animation.prototype.animate = function (startPoint, endPoint, duration, easingFn) {
        var _this = this;
        var startTime = getNow();
        var destTime = startTime + duration;
        var step = function () {
            var now = getNow();
            // js animation end
            if (now >= destTime) {
                _this.translate(endPoint);
                _this.hooks.trigger(_this.hooks.eventTypes.move, endPoint);
                _this.hooks.trigger(_this.hooks.eventTypes.end, endPoint);
                return;
            }
            now = (now - startTime) / duration;
            var easing = easingFn(now);
            var newPoint = {};
            Object.keys(endPoint).forEach(function (key) {
                var startValue = startPoint[key];
                var endValue = endPoint[key];
                newPoint[key] = (endValue - startValue) * easing + startValue;
            });
            _this.translate(newPoint);
            if (_this.pending) {
                _this.timer = requestAnimationFrame(step);
            }
            if (_this.options.probeType === 3 /* Realtime */) {
                _this.hooks.trigger(_this.hooks.eventTypes.move, newPoint);
            }
        };
        this.setPending(true);
        cancelAnimationFrame(this.timer);
        step();
    };
    Animation.prototype.stop = function () {
        // still in requestFrameAnimation
        if (this.pending) {
            this.setPending(false);
            cancelAnimationFrame(this.timer);
            var pos = this.translater.getComputedPosition();
            this.setForceStopped(true);
            if (this.hooks.trigger(this.hooks.eventTypes.beforeForceStop, pos)) {
                return;
            }
            this.hooks.trigger(this.hooks.eventTypes.forceStop, pos);
        }
    };
    return Animation;
}(Base));

function createAnimater(element, translater, options) {
    var useTransition = options.useTransition;
    var animaterOptions = {};
    Object.defineProperty(animaterOptions, 'probeType', {
        enumerable: true,
        configurable: false,
        get: function () {
            return options.probeType;
        }
    });
    if (useTransition) {
        return new Transition(element, translater, animaterOptions);
    }
    else {
        return new Animation(element, translater, animaterOptions);
    }
}

var Behavior = /** @class */ (function () {
    function Behavior(wrapper, options) {
        this.wrapper = wrapper;
        this.options = options;
        this.hooks = new EventEmitter(['momentum', 'end']);
        this.content = this.wrapper.children[0];
        this.currentPos = 0;
        this.startPos = 0;
    }
    Behavior.prototype.start = function () {
        this.direction = 0 /* Default */;
        this.movingDirection = 0 /* Default */;
        this.dist = 0;
    };
    Behavior.prototype.move = function (delta) {
        delta = this.hasScroll ? delta : 0;
        this.movingDirection =
            delta > 0
                ? -1 /* Negative */
                : delta < 0
                    ? 1 /* Positive */
                    : 0 /* Default */;
        var newPos = this.currentPos + delta;
        // Slow down or stop if outside of the boundaries
        if (newPos > this.minScrollPos || newPos < this.maxScrollPos) {
            if ((newPos > this.minScrollPos && this.options.bounces[0]) ||
                (newPos < this.maxScrollPos && this.options.bounces[1])) {
                newPos = this.currentPos + delta / 3;
            }
            else {
                newPos =
                    newPos > this.minScrollPos ? this.minScrollPos : this.maxScrollPos;
            }
        }
        return newPos;
    };
    Behavior.prototype.end = function (duration) {
        var momentumInfo = {
            duration: 0
        };
        var absDist = Math.abs(this.currentPos - this.startPos);
        // start momentum animation if needed
        if (this.options.momentum &&
            duration < this.options.momentumLimitTime &&
            absDist > this.options.momentumLimitDistance) {
            var wrapperSize = (this.direction === -1 /* Negative */ && this.options.bounces[0]) ||
                (this.direction === 1 /* Positive */ && this.options.bounces[1])
                ? this.wrapperSize
                : 0;
            momentumInfo = this.hasScroll
                ? this.momentum(this.currentPos, this.startPos, duration, this.maxScrollPos, this.minScrollPos, wrapperSize, this.options)
                : { destination: this.currentPos, duration: 0 };
        }
        else {
            this.hooks.trigger(this.hooks.eventTypes.end, momentumInfo);
        }
        return momentumInfo;
    };
    Behavior.prototype.momentum = function (current, start, time, lowerMargin, upperMargin, wrapperSize, options) {
        if (options === void 0) { options = this.options; }
        var distance = current - start;
        var speed = Math.abs(distance) / time;
        var deceleration = options.deceleration, swipeBounceTime = options.swipeBounceTime, swipeTime = options.swipeTime;
        var momentumData = {
            destination: current + (speed / deceleration) * (distance < 0 ? -1 : 1),
            duration: swipeTime,
            rate: 15
        };
        this.hooks.trigger(this.hooks.eventTypes.momentum, momentumData, distance);
        if (momentumData.destination < lowerMargin) {
            momentumData.destination = wrapperSize
                ? Math.max(lowerMargin - wrapperSize / 4, lowerMargin - (wrapperSize / momentumData.rate) * speed)
                : lowerMargin;
            momentumData.duration = swipeBounceTime;
        }
        else if (momentumData.destination > upperMargin) {
            momentumData.destination = wrapperSize
                ? Math.min(upperMargin + wrapperSize / 4, upperMargin + (wrapperSize / momentumData.rate) * speed)
                : upperMargin;
            momentumData.duration = swipeBounceTime;
        }
        momentumData.destination = Math.round(momentumData.destination);
        return momentumData;
    };
    Behavior.prototype.updateDirection = function () {
        var absDist = Math.round(this.currentPos) - this.absStartPos;
        this.direction =
            absDist > 0
                ? -1 /* Negative */
                : absDist < 0
                    ? 1 /* Positive */
                    : 0 /* Default */;
    };
    Behavior.prototype.refresh = function () {
        var _a = this.options.rect, size = _a.size, position = _a.position;
        var isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static';
        var wrapperRect = getRect(this.wrapper);
        this.wrapperSize = wrapperRect[size];
        var contentRect = getRect(this.content);
        this.contentSize = contentRect[size];
        this.relativeOffset = contentRect[position];
        if (isWrapperStatic) {
            this.relativeOffset -= wrapperRect[position];
        }
        this.minScrollPos = 0;
        this.maxScrollPos = this.wrapperSize - this.contentSize;
        if (this.maxScrollPos < 0) {
            this.maxScrollPos -= this.relativeOffset;
            this.minScrollPos = -this.relativeOffset;
        }
        this.hasScroll =
            this.options.scrollable && this.maxScrollPos < this.minScrollPos;
        if (!this.hasScroll) {
            this.maxScrollPos = this.minScrollPos;
            this.contentSize = this.wrapperSize;
        }
        this.direction = 0;
    };
    Behavior.prototype.updatePosition = function (pos) {
        this.currentPos = pos;
    };
    Behavior.prototype.getCurrentPos = function () {
        return Math.round(this.currentPos);
    };
    Behavior.prototype.checkInBoundary = function () {
        var position = this.adjustPosition(this.currentPos);
        var inBoundary = position === this.getCurrentPos();
        return {
            position: position,
            inBoundary: inBoundary
        };
    };
    // adjust position when out of boundary
    Behavior.prototype.adjustPosition = function (pos) {
        var roundPos = Math.round(pos);
        if (!this.hasScroll || roundPos > this.minScrollPos) {
            roundPos = this.minScrollPos;
        }
        else if (roundPos < this.maxScrollPos) {
            roundPos = this.maxScrollPos;
        }
        return roundPos;
    };
    Behavior.prototype.updateStartPos = function () {
        this.startPos = this.currentPos;
    };
    Behavior.prototype.updateAbsStartPos = function () {
        this.absStartPos = this.currentPos;
    };
    Behavior.prototype.resetStartPos = function () {
        this.updateStartPos();
        this.updateAbsStartPos();
    };
    Behavior.prototype.getAbsDist = function (delta) {
        this.dist += delta;
        return Math.abs(this.dist);
    };
    Behavior.prototype.destroy = function () {
        this.hooks.destroy();
    };
    return Behavior;
}());

var _a, _b, _c, _d;
var PassthroughHandlers = (_a = {},
    _a["yes" /* Yes */] = function (e) {
        return true;
    },
    _a["no" /* No */] = function (e) {
        e.preventDefault();
        return false;
    },
    _a);
var DirectionMap = (_b = {},
    _b["horizontal" /* Horizontal */] = (_c = {},
        _c["yes" /* Yes */] = "horizontal" /* Horizontal */,
        _c["no" /* No */] = "vertical" /* Vertical */,
        _c),
    _b["vertical" /* Vertical */] = (_d = {},
        _d["yes" /* Yes */] = "vertical" /* Vertical */,
        _d["no" /* No */] = "horizontal" /* Horizontal */,
        _d),
    _b);
var DirectionLockAction = /** @class */ (function () {
    function DirectionLockAction(directionLockThreshold, freeScroll, eventPassthrough) {
        this.directionLockThreshold = directionLockThreshold;
        this.freeScroll = freeScroll;
        this.eventPassthrough = eventPassthrough;
        this.reset();
    }
    DirectionLockAction.prototype.reset = function () {
        this.directionLocked = "" /* Default */;
    };
    DirectionLockAction.prototype.checkMovingDirection = function (absDistX, absDistY, e) {
        this.computeDirectionLock(absDistX, absDistY);
        return this.handleEventPassthrough(e);
    };
    DirectionLockAction.prototype.adjustDelta = function (deltaX, deltaY) {
        if (this.directionLocked === "horizontal" /* Horizontal */) {
            deltaY = 0;
        }
        else if (this.directionLocked === "vertical" /* Vertical */) {
            deltaX = 0;
        }
        return {
            deltaX: deltaX,
            deltaY: deltaY
        };
    };
    DirectionLockAction.prototype.computeDirectionLock = function (absDistX, absDistY) {
        // If you are scrolling in one direction, lock it
        if (this.directionLocked === "" /* Default */ && !this.freeScroll) {
            if (absDistX > absDistY + this.directionLockThreshold) {
                this.directionLocked = "horizontal" /* Horizontal */; // lock horizontally
            }
            else if (absDistY >= absDistX + this.directionLockThreshold) {
                this.directionLocked = "vertical" /* Vertical */; // lock vertically
            }
            else {
                this.directionLocked = "none" /* None */; // no lock
            }
        }
    };
    DirectionLockAction.prototype.handleEventPassthrough = function (e) {
        var handleMap = DirectionMap[this.directionLocked];
        if (handleMap) {
            if (this.eventPassthrough === handleMap["yes" /* Yes */]) {
                return PassthroughHandlers["yes" /* Yes */](e);
            }
            else if (this.eventPassthrough === handleMap["no" /* No */]) {
                return PassthroughHandlers["no" /* No */](e);
            }
        }
        return false;
    };
    return DirectionLockAction;
}());

var ScrollerActions = /** @class */ (function () {
    function ScrollerActions(scrollBehaviorX, scrollBehaviorY, actionsHandler, animater, options) {
        this.hooks = new EventEmitter([
            'start',
            'beforeMove',
            'scrollStart',
            'scroll',
            'beforeEnd',
            'end',
            'scrollEnd'
        ]);
        this.scrollBehaviorX = scrollBehaviorX;
        this.scrollBehaviorY = scrollBehaviorY;
        this.actionsHandler = actionsHandler;
        this.animater = animater;
        this.options = options;
        this.directionLockAction = new DirectionLockAction(options.directionLockThreshold, options.freeScroll, options.eventPassthrough);
        this.enabled = true;
        this.bindActionsHandler();
    }
    ScrollerActions.prototype.bindActionsHandler = function () {
        var _this = this;
        // [mouse|touch]start event
        this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.start, function (e) {
            if (!_this.enabled)
                return true;
            return _this.handleStart(e);
        });
        // [mouse|touch]move event
        this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.move, function (_a) {
            var deltaX = _a.deltaX, deltaY = _a.deltaY, e = _a.e;
            if (!_this.enabled)
                return true;
            return _this.handleMove(deltaX, deltaY, e);
        });
        // [mouse|touch]end event
        this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.end, function (e) {
            if (!_this.enabled)
                return true;
            return _this.handleEnd(e);
        });
        // click
        this.actionsHandler.hooks.on(this.actionsHandler.hooks.eventTypes.click, function (e) {
            // handle native click event
            if (_this.enabled && !e._constructed) {
                _this.handleClick(e);
            }
        });
    };
    ScrollerActions.prototype.handleStart = function (e) {
        var timestamp = getNow();
        this.moved = false;
        this.startTime = timestamp;
        this.directionLockAction.reset();
        this.scrollBehaviorX.start();
        this.scrollBehaviorY.start();
        // force stopping last transition or animation
        this.animater.stop();
        this.scrollBehaviorX.resetStartPos();
        this.scrollBehaviorY.resetStartPos();
        this.hooks.trigger(this.hooks.eventTypes.start, e);
    };
    ScrollerActions.prototype.handleMove = function (deltaX, deltaY, e) {
        if (this.hooks.trigger(this.hooks.eventTypes.beforeMove, e)) {
            return;
        }
        var absDistX = this.scrollBehaviorX.getAbsDist(deltaX);
        var absDistY = this.scrollBehaviorY.getAbsDist(deltaY);
        var timestamp = getNow();
        // We need to move at least momentumLimitDistance pixels
        // for the scrolling to initiate
        if (this.checkMomentum(absDistX, absDistY, timestamp)) {
            return true;
        }
        if (this.directionLockAction.checkMovingDirection(absDistX, absDistY, e)) {
            this.actionsHandler.setInitiated();
            return true;
        }
        var delta = this.directionLockAction.adjustDelta(deltaX, deltaY);
        var newX = this.scrollBehaviorX.move(delta.deltaX);
        var newY = this.scrollBehaviorY.move(delta.deltaY);
        if (!this.moved) {
            this.moved = true;
            this.hooks.trigger(this.hooks.eventTypes.scrollStart);
        }
        this.animater.translate({
            x: newX,
            y: newY
        });
        this.dispatchScroll(timestamp);
    };
    ScrollerActions.prototype.dispatchScroll = function (timestamp) {
        // dispatch scroll in interval time
        if (timestamp - this.startTime > this.options.momentumLimitTime) {
            // refresh time and starting position to initiate a momentum
            this.startTime = timestamp;
            this.scrollBehaviorX.updateStartPos();
            this.scrollBehaviorY.updateStartPos();
            if (this.options.probeType === 1 /* Throttle */) {
                this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
            }
        }
        // dispatch scroll all the time
        if (this.options.probeType > 1 /* Throttle */) {
            this.hooks.trigger(this.hooks.eventTypes.scroll, this.getCurrentPos());
        }
    };
    ScrollerActions.prototype.checkMomentum = function (absDistX, absDistY, timestamp) {
        return (timestamp - this.endTime > this.options.momentumLimitTime &&
            absDistY < this.options.momentumLimitDistance &&
            absDistX < this.options.momentumLimitDistance);
    };
    ScrollerActions.prototype.handleEnd = function (e) {
        if (this.hooks.trigger(this.hooks.eventTypes.beforeEnd, e)) {
            return;
        }
        var currentPos = this.getCurrentPos();
        this.scrollBehaviorX.updateDirection();
        this.scrollBehaviorY.updateDirection();
        if (this.hooks.trigger(this.hooks.eventTypes.end, e, currentPos)) {
            return true;
        }
        this.animater.translate(currentPos);
        this.endTime = getNow();
        var duration = this.endTime - this.startTime;
        this.hooks.trigger(this.hooks.eventTypes.scrollEnd, currentPos, duration);
    };
    ScrollerActions.prototype.handleClick = function (e) {
        if (!preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
            e.preventDefault();
            e.stopPropagation();
        }
    };
    ScrollerActions.prototype.getCurrentPos = function () {
        return {
            x: this.scrollBehaviorX.getCurrentPos(),
            y: this.scrollBehaviorY.getCurrentPos()
        };
    };
    ScrollerActions.prototype.refresh = function () {
        this.endTime = 0;
    };
    ScrollerActions.prototype.destroy = function () {
        this.hooks.destroy();
    };
    return ScrollerActions;
}());

function createActionsHandlerOptions(bsOptions) {
    var options = [
        'click',
        'bindToWrapper',
        'disableMouse',
        'disableTouch',
        'preventDefault',
        'stopPropagation',
        'tagException',
        'preventDefaultException'
    ].reduce(function (prev, cur) {
        prev[cur] = bsOptions[cur];
        return prev;
    }, {});
    return options;
}
function createBehaviorOptions(bsOptions, extraProp, bounces, rect) {
    var options = [
        'momentum',
        'momentumLimitTime',
        'momentumLimitDistance',
        'deceleration',
        'swipeBounceTime',
        'swipeTime'
    ].reduce(function (prev, cur) {
        prev[cur] = bsOptions[cur];
        return prev;
    }, {});
    // add extra property
    options.scrollable = bsOptions[extraProp];
    options.bounces = bounces;
    options.rect = rect;
    return options;
}

function bubbling(source, target, events) {
    events.forEach(function (event) {
        var sourceEvent;
        var targetEvent;
        if (typeof event === 'string') {
            sourceEvent = targetEvent = event;
        }
        else {
            sourceEvent = event.source;
            targetEvent = event.target;
        }
        source.on(sourceEvent, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return target.trigger.apply(target, [targetEvent].concat(args));
        });
    });
}

var Scroller = /** @class */ (function () {
    function Scroller(wrapper, options) {
        this.hooks = new EventEmitter([
            'beforeStart',
            'beforeMove',
            'beforeScrollStart',
            'scrollStart',
            'scroll',
            'beforeEnd',
            'scrollEnd',
            'refresh',
            'touchEnd',
            'end',
            'flick',
            'scrollCancel',
            'momentum',
            'scrollTo',
            'ignoreDisMoveForSamePos',
            'scrollToElement'
        ]);
        this.wrapper = wrapper;
        this.content = wrapper.children[0];
        this.options = options;
        var _a = this
            .options.bounce, _b = _a.left, left = _b === void 0 ? true : _b, _c = _a.right, right = _c === void 0 ? true : _c, _d = _a.top, top = _d === void 0 ? true : _d, _e = _a.bottom, bottom = _e === void 0 ? true : _e;
        // direction X
        this.scrollBehaviorX = new Behavior(wrapper, createBehaviorOptions(options, 'scrollX', [left, right], {
            size: 'width',
            position: 'left'
        }));
        // direction Y
        this.scrollBehaviorY = new Behavior(wrapper, createBehaviorOptions(options, 'scrollY', [top, bottom], {
            size: 'height',
            position: 'top'
        }));
        this.translater = new Translater(this.content);
        this.animater = createAnimater(this.content, this.translater, this.options);
        this.actionsHandler = new ActionsHandler(wrapper, createActionsHandlerOptions(this.options));
        this.actions = new ScrollerActions(this.scrollBehaviorX, this.scrollBehaviorY, this.actionsHandler, this.animater, this.options);
        var resizeHandler = this.resize.bind(this);
        this.resizeRegister = new EventRegister(window, [
            {
                name: 'orientationchange',
                handler: resizeHandler
            },
            {
                name: 'resize',
                handler: resizeHandler
            }
        ]);
        this.transitionEndRegister = new EventRegister(this.content, [
            {
                name: style.transitionEnd,
                handler: this.transitionEnd.bind(this)
            }
        ]);
        this.init();
    }
    Scroller.prototype.init = function () {
        var _this = this;
        this.bindTranslater();
        this.bindAnimater();
        this.bindActions();
        // enable pointer events when scrolling ends
        this.hooks.on(this.hooks.eventTypes.scrollEnd, function () {
            _this.togglePointerEvents(true);
        });
    };
    Scroller.prototype.bindTranslater = function () {
        var _this = this;
        var hooks = this.translater.hooks;
        hooks.on(hooks.eventTypes.beforeTranslate, function (transformStyle) {
            if (_this.options.translateZ) {
                transformStyle.push(_this.options.translateZ);
            }
        });
        // disable pointer events when scrolling
        hooks.on(hooks.eventTypes.translate, function (pos) {
            _this.updatePositions(pos);
            _this.togglePointerEvents(false);
        });
    };
    Scroller.prototype.bindAnimater = function () {
        var _this = this;
        // reset position
        this.animater.hooks.on(this.animater.hooks.eventTypes.end, function (pos) {
            if (!_this.resetPosition(_this.options.bounceTime)) {
                _this.animater.setPending(false);
                _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
            }
        });
        bubbling(this.animater.hooks, this.hooks, [
            {
                source: this.animater.hooks.eventTypes.move,
                target: this.hooks.eventTypes.scroll
            },
            {
                source: this.animater.hooks.eventTypes.forceStop,
                target: this.hooks.eventTypes.scrollEnd
            }
        ]);
    };
    Scroller.prototype.bindActions = function () {
        var _this = this;
        var actions = this.actions;
        bubbling(actions.hooks, this.hooks, [
            {
                source: actions.hooks.eventTypes.start,
                target: this.hooks.eventTypes.beforeStart
            },
            {
                source: actions.hooks.eventTypes.start,
                target: this.hooks.eventTypes.beforeScrollStart // just for event api
            },
            {
                source: actions.hooks.eventTypes.beforeMove,
                target: this.hooks.eventTypes.beforeMove
            },
            {
                source: actions.hooks.eventTypes.scrollStart,
                target: this.hooks.eventTypes.scrollStart
            },
            {
                source: actions.hooks.eventTypes.scroll,
                target: this.hooks.eventTypes.scroll
            },
            {
                source: actions.hooks.eventTypes.beforeEnd,
                target: this.hooks.eventTypes.beforeEnd
            }
        ]);
        actions.hooks.on(actions.hooks.eventTypes.end, function (e, pos) {
            _this.hooks.trigger(_this.hooks.eventTypes.touchEnd, pos);
            if (_this.hooks.trigger(_this.hooks.eventTypes.end, pos)) {
                return true;
            }
            // check if it is a click operation
            if (!actions.moved && _this.checkClick(e)) {
                _this.animater.setForceStopped(false);
                _this.hooks.trigger(_this.hooks.eventTypes.scrollCancel);
                return true;
            }
            _this.animater.setForceStopped(false);
            // reset if we are outside of the boundaries
            if (_this.resetPosition(_this.options.bounceTime, ease.bounce)) {
                return true;
            }
        });
        actions.hooks.on(actions.hooks.eventTypes.scrollEnd, function (pos, duration) {
            var deltaX = Math.abs(pos.x - _this.scrollBehaviorX.startPos);
            var deltaY = Math.abs(pos.y - _this.scrollBehaviorY.startPos);
            if (_this.checkFlick(duration, deltaX, deltaY)) {
                _this.hooks.trigger(_this.hooks.eventTypes.flick);
                return;
            }
            if (_this.momentum(pos, duration)) {
                return;
            }
            _this.hooks.trigger(_this.hooks.eventTypes.scrollEnd, pos);
        });
    };
    Scroller.prototype.checkFlick = function (duration, deltaX, deltaY) {
        // flick
        if (this.hooks.events.flick.length > 1 &&
            duration < this.options.flickLimitTime &&
            deltaX < this.options.flickLimitDistance &&
            deltaY < this.options.flickLimitDistance) {
            return true;
        }
    };
    Scroller.prototype.momentum = function (pos, duration) {
        var meta = {
            time: 0,
            easing: ease.swiper,
            newX: pos.x,
            newY: pos.y
        };
        // start momentum animation if needed
        var momentumX = this.scrollBehaviorX.end(duration);
        var momentumY = this.scrollBehaviorY.end(duration);
        meta.newX = isUndef(momentumX.destination)
            ? meta.newX
            : momentumX.destination;
        meta.newY = isUndef(momentumY.destination)
            ? meta.newY
            : momentumY.destination;
        meta.time = Math.max(momentumX.duration, momentumY.duration);
        this.hooks.trigger(this.hooks.eventTypes.momentum, meta, this);
        // when x or y changed, do momentum animation now!
        if (meta.newX !== pos.x || meta.newY !== pos.y) {
            // change easing function when scroller goes out of the boundaries
            if (meta.newX > this.scrollBehaviorX.minScrollPos ||
                meta.newX < this.scrollBehaviorX.maxScrollPos ||
                meta.newY > this.scrollBehaviorY.minScrollPos ||
                meta.newY < this.scrollBehaviorY.maxScrollPos) {
                meta.easing = ease.swipeBounce;
            }
            this.scrollTo(meta.newX, meta.newY, meta.time, meta.easing);
            return true;
        }
    };
    Scroller.prototype.checkClick = function (e) {
        // when in the process of pulling down, it should not prevent click
        var cancelable = {
            preventClick: this.animater.forceStopped
        };
        // we scrolled less than momentumLimitDistance pixels
        if (this.hooks.trigger(this.hooks.eventTypes.checkClick))
            return true;
        if (!cancelable.preventClick) {
            var _dblclick = this.options.dblclick;
            var dblclickTrigged = false;
            if (_dblclick && this.lastClickTime) {
                var _a = _dblclick.delay, delay = _a === void 0 ? 300 : _a;
                if (getNow() - this.lastClickTime < delay) {
                    dblclickTrigged = true;
                    dblclick(e);
                }
            }
            if (this.options.tap) {
                tap(e, this.options.tap);
            }
            if (this.options.click &&
                !preventDefaultExceptionFn(e.target, this.options.preventDefaultException)) {
                click(e);
            }
            this.lastClickTime = dblclickTrigged ? null : getNow();
            return true;
        }
        return false;
    };
    Scroller.prototype.resize = function () {
        var _this = this;
        if (!this.actions.enabled) {
            return;
        }
        // fix a scroll problem under Android condition
        if (isAndroid) {
            this.wrapper.scrollTop = 0;
        }
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = window.setTimeout(function () {
            _this.refresh();
        }, this.options.resizePolling);
    };
    Scroller.prototype.transitionEnd = function (e) {
        if (e.target !== this.content || !this.animater.pending) {
            return;
        }
        var animater = this.animater;
        animater.transitionTime();
        if (!this.resetPosition(this.options.bounceTime, ease.bounce)) {
            this.animater.setPending(false);
            if (this.options.probeType !== 3 /* Realtime */) {
                this.hooks.trigger(this.hooks.eventTypes.scrollEnd, this.getCurrentPos());
            }
        }
    };
    Scroller.prototype.togglePointerEvents = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        var el = this.content.children.length
            ? this.content.children
            : [this.content];
        var pointerEvents = enabled ? 'auto' : 'none';
        for (var i = 0; i < el.length; i++) {
            var node = el[i];
            // ignore BetterScroll instance's wrapper DOM
            if (node.isBScrollContainer) {
                continue;
            }
            node.style.pointerEvents = pointerEvents;
        }
    };
    Scroller.prototype.refresh = function () {
        this.scrollBehaviorX.refresh();
        this.scrollBehaviorY.refresh();
        this.actions.refresh();
        this.wrapperOffset = offset(this.wrapper);
    };
    Scroller.prototype.scrollBy = function (deltaX, deltaY, time, easing) {
        if (time === void 0) { time = 0; }
        var _a = this.getCurrentPos(), x = _a.x, y = _a.y;
        easing = !easing ? ease.bounce : easing;
        deltaX += x;
        deltaY += y;
        this.scrollTo(deltaX, deltaY, time, easing);
    };
    Scroller.prototype.scrollTo = function (x, y, time, easing, extraTransform, isSilent) {
        if (time === void 0) { time = 0; }
        if (extraTransform === void 0) { extraTransform = {
            start: {},
            end: {}
        }; }
        easing = !easing ? ease.bounce : easing;
        var easingFn = this.options.useTransition ? easing.style : easing.fn;
        var currentPos = this.getCurrentPos();
        var startPoint = __assign({ x: currentPos.x, y: currentPos.y }, extraTransform.start);
        var endPoint = __assign({ x: x,
            y: y }, extraTransform.end);
        this.hooks.trigger(this.hooks.eventTypes.scrollTo, endPoint);
        if (!this.hooks.trigger(this.hooks.eventTypes.ignoreDisMoveForSamePos)) {
            // it is an useless move
            if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
                return;
            }
        }
        this.animater.move(startPoint, endPoint, time, easingFn, isSilent);
    };
    Scroller.prototype.scrollToElement = function (el, time, offsetX, offsetY, easing) {
        var targetEle = getElement(el);
        var pos = offset(targetEle);
        var getOffset = function (offset, size, wrapperSize) {
            if (typeof offset === 'number') {
                return offset;
            }
            // if offsetX/Y are true we center the element to the screen
            return offset ? Math.round(size / 2 - wrapperSize / 2) : 0;
        };
        offsetX = getOffset(offsetX, targetEle.offsetWidth, this.wrapper.offsetWidth);
        offsetY = getOffset(offsetY, targetEle.offsetHeight, this.wrapper.offsetHeight);
        var getPos = function (pos, wrapperPos, offset, scrollBehavior) {
            pos -= wrapperPos;
            pos = scrollBehavior.adjustPosition(pos - offset);
            return pos;
        };
        pos.left = getPos(pos.left, this.wrapperOffset.left, offsetX, this.scrollBehaviorX);
        pos.top = getPos(pos.top, this.wrapperOffset.top, offsetY, this.scrollBehaviorY);
        if (this.hooks.trigger(this.hooks.eventTypes.scrollToElement, targetEle, pos)) {
            return;
        }
        this.scrollTo(pos.left, pos.top, time, easing);
    };
    Scroller.prototype.resetPosition = function (time, easing) {
        if (time === void 0) { time = 0; }
        easing = !easing ? ease.bounce : easing;
        var _a = this.scrollBehaviorX.checkInBoundary(), x = _a.position, xInBoundary = _a.inBoundary;
        var _b = this.scrollBehaviorY.checkInBoundary(), y = _b.position, yInBoundary = _b.inBoundary;
        if (xInBoundary && yInBoundary) {
            return false;
        }
        // out of boundary
        this.scrollTo(x, y, time, easing);
        return true;
    };
    Scroller.prototype.updatePositions = function (pos) {
        this.scrollBehaviorX.updatePosition(pos.x);
        this.scrollBehaviorY.updatePosition(pos.y);
    };
    Scroller.prototype.getCurrentPos = function () {
        return this.actions.getCurrentPos();
    };
    Scroller.prototype.enable = function () {
        this.actions.enabled = true;
    };
    Scroller.prototype.disable = function () {
        cancelAnimationFrame(this.animater.timer);
        this.actions.enabled = false;
    };
    Scroller.prototype.destroy = function () {
        var _this = this;
        var keys = [
            'resizeRegister',
            'transitionEndRegister',
            'actionsHandler',
            'actions',
            'hooks',
            'animater',
            'translater',
            'scrollBehaviorX',
            'scrollBehaviorY'
        ];
        keys.forEach(function (key) { return _this[key].destroy(); });
    };
    return Scroller;
}());

var propertiesConfig = [
    {
        sourceKey: 'scroller.scrollBehaviorX.currentPos',
        key: 'x'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.currentPos',
        key: 'y'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.hasScroll',
        key: 'hasHorizontalScroll'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.hasScroll',
        key: 'hasVerticalScroll'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.contentSize',
        key: 'scrollerWidth'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.contentSize',
        key: 'scrollerHeight'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.maxScrollPos',
        key: 'maxScrollX'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.maxScrollPos',
        key: 'maxScrollY'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.minScrollPos',
        key: 'minScrollX'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.minScrollPos',
        key: 'minScrollY'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.movingDirection',
        key: 'movingDirectionX'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.movingDirection',
        key: 'movingDirectionY'
    },
    {
        sourceKey: 'scroller.scrollBehaviorX.direction',
        key: 'directionX'
    },
    {
        sourceKey: 'scroller.scrollBehaviorY.direction',
        key: 'directionY'
    },
    {
        sourceKey: 'scroller.actions.enabled',
        key: 'enabled'
    },
    {
        sourceKey: 'scroller.animater.pending',
        key: 'pending'
    },
    {
        sourceKey: 'scroller.animater.stop',
        key: 'stop'
    },
    {
        sourceKey: 'scroller.scrollTo',
        key: 'scrollTo'
    },
    {
        sourceKey: 'scroller.scrollBy',
        key: 'scrollBy'
    },
    {
        sourceKey: 'scroller.scrollToElement',
        key: 'scrollToElement'
    },
    {
        sourceKey: 'scroller.resetPosition',
        key: 'resetPosition'
    }
];

var BScroll = /** @class */ (function (_super) {
    __extends(BScroll, _super);
    function BScroll(el, options) {
        var _this = _super.call(this, [
            'refresh',
            'enable',
            'disable',
            'beforeScrollStart',
            'scrollStart',
            'scroll',
            'scrollEnd',
            'scrollCancel',
            'touchEnd',
            'flick',
            'destroy'
        ]) || this;
        var wrapper = getElement(el);
        if (!wrapper) {
            warn('Can not resolve the wrapper DOM.');
            return _this;
        }
        var content = wrapper.children[0];
        if (!content) {
            warn('The wrapper need at least one child element to be scroller.');
            return _this;
        }
        _this.plugins = {};
        _this.options = new Options().merge(options).process();
        _this.hooks = new EventEmitter([
            'init',
            'refresh',
            'enable',
            'disable',
            'destroy'
        ]);
        _this.init(wrapper);
        return _this;
    }
    BScroll.use = function (ctor) {
        var name = ctor.pluginName;
        var installed = this.plugins.some(function (plugin) { return ctor === plugin.ctor; });
        if (installed)
            return this;
        if (isUndef(name)) {
            warn("Plugin Class must specify plugin's name in static property by 'pluginName' field.");
            return this;
        }
        if (this.pluginsMap[name]) {
            warn("This plugin has been registered, maybe you need change plugin's name");
            return this;
        }
        this.pluginsMap[name] = true;
        this.plugins.push({
            name: name,
            applyOrder: ctor.applyOrder,
            ctor: ctor
        });
        return this;
    };
    BScroll.prototype.init = function (wrapper) {
        this.wrapper = wrapper;
        wrapper.isBScrollContainer = true;
        this.scroller = new Scroller(wrapper, this.options);
        this.eventBubbling();
        this.handleAutoBlur();
        this.innerRefresh();
        this.scroller.scrollTo(this.options.startX, this.options.startY);
        this.enable();
        this.proxy(propertiesConfig);
        this.applyPlugins();
    };
    BScroll.prototype.applyPlugins = function () {
        var _this = this;
        var options = this.options;
        this.constructor.plugins
            .sort(function (a, b) {
            var _a;
            var applyOrderMap = (_a = {},
                _a["pre" /* Pre */] = -1,
                _a["post" /* Post */] = 1,
                _a);
            var aOrder = a.applyOrder ? applyOrderMap[a.applyOrder] : 0;
            var bOrder = b.applyOrder ? applyOrderMap[b.applyOrder] : 0;
            return aOrder - bOrder;
        })
            .forEach(function (item) {
            var ctor = item.ctor;
            if (options[item.name] && typeof ctor === 'function') {
                _this.plugins[item.name] = new ctor(_this);
            }
        });
    };
    BScroll.prototype.handleAutoBlur = function () {
        if (this.options.autoBlur) {
            this.on(this.eventTypes.beforeScrollStart, function () {
                var activeElement = document.activeElement;
                if (activeElement &&
                    (activeElement.tagName === 'INPUT' ||
                        activeElement.tagName === 'TEXTAREA')) {
                    activeElement.blur();
                }
            });
        }
    };
    BScroll.prototype.eventBubbling = function () {
        bubbling(this.scroller.hooks, this, [
            'beforeScrollStart',
            'scrollStart',
            'scroll',
            'scrollEnd',
            'scrollCancel',
            'touchEnd',
            'flick'
        ]);
    };
    BScroll.prototype.innerRefresh = function () {
        this.scroller.refresh();
        this.hooks.trigger(this.hooks.eventTypes.refresh);
        this.trigger(this.eventTypes.refresh);
    };
    BScroll.prototype.proxy = function (propertiesConfig) {
        var _this = this;
        propertiesConfig.forEach(function (_a) {
            var key = _a.key, sourceKey = _a.sourceKey;
            propertiesProxy(_this, sourceKey, key);
        });
    };
    BScroll.prototype.refresh = function () {
        this.innerRefresh();
        this.scroller.resetPosition();
    };
    BScroll.prototype.enable = function () {
        this.scroller.enable();
        this.hooks.trigger(this.hooks.eventTypes.enable);
        this.trigger(this.eventTypes.enable);
    };
    BScroll.prototype.disable = function () {
        this.scroller.disable();
        this.hooks.trigger(this.hooks.eventTypes.disable);
        this.trigger(this.eventTypes.disable);
    };
    BScroll.prototype.destroy = function () {
        this.hooks.trigger(this.hooks.eventTypes.destroy);
        this.trigger(this.eventTypes.destroy);
        this.scroller.destroy();
    };
    BScroll.prototype.eventRegister = function (names) {
        this.registerType(names);
    };
    BScroll.plugins = [];
    BScroll.pluginsMap = {};
    return BScroll;
}(EventEmitter));

var MouseWheel = /** @class */ (function () {
    function MouseWheel(scroll) {
        this.scroll = scroll;
        this.wheelStart = false;
        scroll.registerType(['mousewheelMove', 'mousewheelStart', 'mousewheelEnd']);
        this.mouseWheelOpt = scroll.options.mouseWheel;
        this.deltaCache = [];
        this.registorEvent();
        this.hooksFn = [];
        this.registorHooks(scroll.hooks, 'destroy', this.destroy);
    }
    MouseWheel.prototype.destroy = function () {
        this.eventRegistor.destroy();
        window.clearTimeout(this.wheelEndTimer);
        window.clearTimeout(this.wheelMoveTimer);
        this.hooksFn.forEach(function (item) {
            var hooks = item[0];
            var hooksName = item[1];
            var handlerFn = item[2];
            hooks.off(hooksName, handlerFn);
        });
    };
    MouseWheel.prototype.registorEvent = function () {
        this.eventRegistor = new EventRegister(this.scroll.scroller.wrapper, [
            {
                name: 'wheel',
                handler: this.wheelHandler.bind(this)
            },
            {
                name: 'mousewheel',
                handler: this.wheelHandler.bind(this)
            },
            {
                name: 'DOMMouseScroll',
                handler: this.wheelHandler.bind(this)
            }
        ]);
    };
    MouseWheel.prototype.wheelHandler = function (e) {
        this.beforeHandler(e);
        // start
        if (!this.wheelStart) {
            this.wheelStartHandler(e);
            this.wheelStart = true;
        }
        // move
        var delta = this.getWheelDelta(e);
        this.wheelMove(delta);
        // end
        this.wheelStopDetactor(e, delta);
    };
    MouseWheel.prototype.wheelStartHandler = function (e) {
        this.deltaCache = [];
        this.scroll.trigger(this.scroll.eventTypes.mousewheelStart);
    };
    MouseWheel.prototype.wheelStopDetactor = function (e, delta) {
        var _this = this;
        window.clearTimeout(this.wheelEndTimer);
        var delayTime = this.mouseWheelOpt.throttle || 400;
        this.wheelEndTimer = window.setTimeout(function () {
            _this.wheelStart = false;
            window.clearTimeout(_this.wheelMoveTimer);
            _this.wheelMoveTimer = 0;
            _this.scroll.trigger(_this.scroll.eventTypes.mousewheelEnd, delta);
        }, delayTime);
    };
    MouseWheel.prototype.getWheelDelta = function (e) {
        var _a = this.mouseWheelOpt, _b = _a.speed, speed = _b === void 0 ? 20 : _b, _c = _a.invert, invert = _c === void 0 ? false : _c;
        var wheelDeltaX = 0;
        var wheelDeltaY = 0;
        var direction = invert ? -1 /* Negative */ : 1 /* Positive */;
        switch (true) {
            case 'deltaX' in e:
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX * speed;
                    wheelDeltaY = -e.deltaY * speed;
                }
                else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
                break;
            case 'wheelDeltaX' in e:
                wheelDeltaX = (e.wheelDeltaX / 120) * speed;
                wheelDeltaY = (e.wheelDeltaY / 120) * speed;
                break;
            case 'wheelDelta' in e:
                wheelDeltaX = wheelDeltaY = (e.wheelDelta / 120) * speed;
                break;
            case 'detail' in e:
                wheelDeltaX = wheelDeltaY = (-e.detail / 3) * speed;
                break;
        }
        wheelDeltaX *= direction;
        wheelDeltaY *= direction;
        if (!this.scroll.scroller.scrollBehaviorY.hasScroll) {
            wheelDeltaX = wheelDeltaY;
            wheelDeltaY = 0;
        }
        if (!this.scroll.scroller.scrollBehaviorX.hasScroll) {
            wheelDeltaX = 0;
        }
        var directionX = wheelDeltaX > 0
            ? -1 /* Negative */
            : wheelDeltaX < 0
                ? 1 /* Positive */
                : 0;
        var directionY = wheelDeltaY > 0
            ? -1 /* Negative */
            : wheelDeltaY < 0
                ? 1 /* Positive */
                : 0;
        return {
            x: wheelDeltaX,
            y: wheelDeltaY,
            directionX: directionX,
            directionY: directionY
        };
    };
    MouseWheel.prototype.beforeHandler = function (e) {
        var _a = this.scroll.options, preventDefault = _a.preventDefault, stopPropagation = _a.stopPropagation, preventDefaultException = _a.preventDefaultException;
        if (preventDefault &&
            !preventDefaultExceptionFn(e.target, preventDefaultException)) {
            e.preventDefault();
        }
        if (stopPropagation) {
            e.stopPropagation();
        }
    };
    MouseWheel.prototype.wheelMove = function (delta) {
        var _this = this;
        if (this.mouseWheelOpt.debounce && this.wheelMoveTimer) {
            this.deltaCache.push(delta);
        }
        else {
            var cachedDelta = this.deltaCache.reduce(function (prev, current) {
                return {
                    x: prev.x + current.x,
                    y: prev.y + current.y
                };
            }, { x: 0, y: 0 });
            this.deltaCache = [];
            var newX = this.scroll.x + Math.round(delta.x) + cachedDelta.x;
            var newY = this.scroll.y + Math.round(delta.y) + cachedDelta.y;
            var scrollBehaviorX = this.scroll.scroller.scrollBehaviorX;
            var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
            newX = fixInboundValue(newX, scrollBehaviorX.maxScrollPos, scrollBehaviorX.minScrollPos);
            newY = fixInboundValue(newY, scrollBehaviorY.maxScrollPos, scrollBehaviorY.minScrollPos);
            if (!this.scroll.trigger(this.scroll.eventTypes.mousewheelMove, {
                x: newX,
                y: newY
            })) {
                var easeTime = this.getEaseTime();
                if (newX !== this.scroll.x || newY !== this.scroll.y) {
                    this.scroll.scrollTo(newX, newY, easeTime);
                }
            }
            if (this.mouseWheelOpt.debounce) {
                this.wheelMoveTimer = window.setTimeout(function () {
                    _this.wheelMoveTimer = 0;
                }, this.mouseWheelOpt.debounce);
            }
        }
    };
    MouseWheel.prototype.registorHooks = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksFn.push([hooks, name, handler]);
    };
    MouseWheel.prototype.getEaseTime = function () {
        var DEFAULT_EASETIME = 300;
        var SAFE_EASETIME = 100;
        var easeTime = this.mouseWheelOpt.easeTime || DEFAULT_EASETIME;
        // scrollEnd event will be triggered in every calling of scrollTo when easeTime is too small
        // easeTime needs to be greater than 100
        if (easeTime < SAFE_EASETIME) {
            warn("easeTime should be greater than 100.\n      If mouseWheel easeTime is too small, scrollEnd will be triggered many times.");
        }
        return easeTime;
    };
    MouseWheel.pluginName = 'mouseWheel';
    MouseWheel.applyOrder = "pre" /* Pre */;
    return MouseWheel;
}());

var ObserveDOM = /** @class */ (function () {
    function ObserveDOM(scroll) {
        var _this = this;
        this.scroll = scroll;
        this.stopObserver = false;
        this.hooksFn = [];
        this.init();
        this.registorHooks(this.scroll.hooks, 'enable', function () {
            if (_this.stopObserver) {
                _this.init();
            }
        });
        this.registorHooks(this.scroll.hooks, 'disable', function () {
            _this.stopObserve();
        });
        this.registorHooks(this.scroll.hooks, 'destroy', function () {
            _this.destroy();
        });
    }
    ObserveDOM.prototype.init = function () {
        var _this = this;
        if (typeof MutationObserver !== 'undefined') {
            var timer_1 = 0;
            this.observer = new MutationObserver(function (mutations) {
                _this.mutationObserverHandler(mutations, timer_1);
            });
            this.startObserve(this.observer);
        }
        else {
            this.checkDOMUpdate();
        }
    };
    ObserveDOM.prototype.destroy = function () {
        this.stopObserve();
        this.hooksFn.forEach(function (item) {
            var hooks = item[0];
            var hooksName = item[1];
            var handlerFn = item[2];
            hooks.off(hooksName, handlerFn);
        });
        this.hooksFn.length = 0;
    };
    ObserveDOM.prototype.mutationObserverHandler = function (mutations, timer) {
        var _this = this;
        if (this.shouldNotRefresh()) {
            return;
        }
        var immediateRefresh = false;
        var deferredRefresh = false;
        for (var i = 0; i < mutations.length; i++) {
            var mutation = mutations[i];
            if (mutation.type !== 'attributes') {
                immediateRefresh = true;
                break;
            }
            else {
                if (mutation.target !== this.scroll.scroller.content) {
                    deferredRefresh = true;
                    break;
                }
            }
        }
        if (immediateRefresh) {
            this.scroll.refresh();
        }
        else if (deferredRefresh) {
            // attributes changes too often
            clearTimeout(timer);
            timer = window.setTimeout(function () {
                if (!_this.shouldNotRefresh()) {
                    _this.scroll.refresh();
                }
            }, 60);
        }
    };
    ObserveDOM.prototype.startObserve = function (observer) {
        var config = {
            attributes: true,
            childList: true,
            subtree: true
        };
        observer.observe(this.scroll.scroller.content, config);
    };
    ObserveDOM.prototype.shouldNotRefresh = function () {
        var scroller = this.scroll.scroller;
        var scrollBehaviorX = scroller.scrollBehaviorX;
        var scrollBehaviorY = scroller.scrollBehaviorY;
        var outsideBoundaries = scrollBehaviorX.currentPos > scrollBehaviorX.minScrollPos ||
            scrollBehaviorX.currentPos < scrollBehaviorX.maxScrollPos ||
            scrollBehaviorY.currentPos > scrollBehaviorY.minScrollPos ||
            scrollBehaviorY.currentPos < scrollBehaviorY.maxScrollPos;
        return scroller.animater.pending || outsideBoundaries;
    };
    ObserveDOM.prototype.checkDOMUpdate = function () {
        var me = this;
        var scrollIns = this.scroll;
        var scrollerEl = scrollIns.scroller.content;
        var scrollerRect = getRect(scrollerEl);
        var oldWidth = scrollerRect.width;
        var oldHeight = scrollerRect.height;
        function check() {
            if (me.stopObserver) {
                return;
            }
            scrollerRect = getRect(scrollerEl);
            var newWidth = scrollerRect.width;
            var newHeight = scrollerRect.height;
            if (oldWidth !== newWidth || oldHeight !== newHeight) {
                scrollIns.refresh();
            }
            oldWidth = newWidth;
            oldHeight = newHeight;
            next();
        }
        function next() {
            setTimeout(function () {
                check();
            }, 1000);
        }
        next();
    };
    ObserveDOM.prototype.registorHooks = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksFn.push([hooks, name, handler]);
    };
    ObserveDOM.prototype.stopObserve = function () {
        this.stopObserver = true;
        if (this.observer) {
            this.observer.disconnect();
        }
    };
    ObserveDOM.pluginName = 'observeDOM';
    return ObserveDOM;
}());

var sourcePrefix = 'plugins.pullDownRefresh';
var propertiesMap = [
    {
        key: 'finishPullDown',
        name: 'finish'
    },
    {
        key: 'openPullDown',
        name: 'open'
    },
    {
        key: 'closePullDown',
        name: 'close'
    },
    {
        key: 'autoPullDownRefresh',
        name: 'autoPull'
    }
];
var propertiesProxyConfig = propertiesMap.map(function (item) {
    return {
        key: item.key,
        sourceKey: sourcePrefix + "." + item.name
    };
});

var PullDown = /** @class */ (function () {
    function PullDown(scroll) {
        this.scroll = scroll;
        this.pulling = false;
        if (scroll.options.pullDownRefresh) {
            this._watch();
        }
        this.scroll.registerType(['pullingDown']);
        this.scroll.proxy(propertiesProxyConfig);
    }
    PullDown.prototype._watch = function () {
        // 需要设置 probe = 3 吗？
        // must watch scroll in real time
        this.scroll.options.probeType = 3 /* Realtime */;
        this.scroll.scroller.hooks.on('end', this._checkPullDown, this);
    };
    PullDown.prototype._checkPullDown = function () {
        if (!this.scroll.options.pullDownRefresh) {
            return;
        }
        var _a = this.scroll.options
            .pullDownRefresh, _b = _a.threshold, threshold = _b === void 0 ? 90 : _b, _c = _a.stop, stop = _c === void 0 ? 40 : _c;
        // check if a real pull down action
        if (this.scroll.directionY !== -1 /* Negative */ ||
            this.scroll.y < threshold) {
            return false;
        }
        if (!this.pulling) {
            this.pulling = true;
            this.scroll.trigger('pullingDown');
            this.originalMinScrollY = this.scroll.minScrollY;
            this.scroll.minScrollY = stop;
        }
        this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, ease.bounce);
        return this.pulling;
    };
    PullDown.prototype.finish = function () {
        this.pulling = false;
        this.scroll.minScrollY = this.originalMinScrollY;
        this.scroll.resetPosition(this.scroll.options.bounceTime, ease.bounce);
    };
    PullDown.prototype.open = function (config) {
        if (config === void 0) { config = true; }
        this.scroll.options.pullDownRefresh = config;
        this._watch();
    };
    PullDown.prototype.close = function () {
        this.scroll.options.pullDownRefresh = false;
    };
    PullDown.prototype.autoPull = function () {
        var _a = this.scroll.options
            .pullDownRefresh, _b = _a.threshold, threshold = _b === void 0 ? 90 : _b, _c = _a.stop, stop = _c === void 0 ? 40 : _c;
        if (this.pulling) {
            return;
        }
        this.pulling = true;
        this.originalMinScrollY = this.scroll.minScrollY;
        this.scroll.minScrollY = threshold;
        this.scroll.scrollTo(this.scroll.x, threshold);
        this.scroll.trigger('pullingDown');
        this.scroll.scrollTo(this.scroll.x, stop, this.scroll.options.bounceTime, ease.bounce);
    };
    PullDown.pluginName = 'pullDownRefresh';
    return PullDown;
}());

var sourcePrefix$1 = 'plugins.pullUpLoad';
var propertiesMap$1 = [
    {
        key: 'finishPullUp',
        name: 'finish'
    },
    {
        key: 'openPullUp',
        name: 'open'
    },
    {
        key: 'closePullUp',
        name: 'close'
    }
];
var propertiesProxyConfig$1 = propertiesMap$1.map(function (item) {
    return {
        key: item.key,
        sourceKey: sourcePrefix$1 + "." + item.name
    };
});

var PullUp = /** @class */ (function () {
    function PullUp(bscroll) {
        this.bscroll = bscroll;
        this.watching = false;
        if (bscroll.options.pullUpLoad) {
            this._watch();
        }
        this.bscroll.registerType(['pullingUp']);
        this.bscroll.proxy(propertiesProxyConfig$1);
    }
    PullUp.prototype._watch = function () {
        if (this.watching) {
            return;
        }
        // must watch scroll in real time
        this.bscroll.options.probeType = 3 /* Realtime */;
        this.watching = true;
        this.bscroll.on('scroll', this._checkToEnd, this);
    };
    PullUp.prototype._checkToEnd = function (pos) {
        var _this = this;
        if (!this.bscroll.options.pullUpLoad) {
            return;
        }
        var _a = this.bscroll.options
            .pullUpLoad.threshold, threshold = _a === void 0 ? 0 : _a;
        if (this.bscroll.movingDirectionY === 1 /* Positive */ &&
            pos.y <= this.bscroll.maxScrollY + threshold) {
            // reset pullupWatching status after scroll end to promise that trigger 'pullingUp' only once when pulling up
            this.bscroll.once('scrollEnd', function () {
                _this.watching = false;
            });
            this.bscroll.trigger('pullingUp');
            this.bscroll.off('scroll', this._checkToEnd);
        }
    };
    PullUp.prototype.finish = function () {
        if (this.watching) {
            this.bscroll.once('scrollEnd', this._watch, this);
        }
        else {
            this._watch();
        }
    };
    PullUp.prototype.open = function (config) {
        if (config === void 0) { config = true; }
        this.bscroll.options.pullUpLoad = config;
        this._watch();
    };
    PullUp.prototype.close = function () {
        this.bscroll.options.pullUpLoad = false;
        if (!this.watching) {
            return;
        }
        this.watching = false;
        this.bscroll.off('scroll', this._checkToEnd);
    };
    PullUp.pluginName = 'pullUpLoad';
    return PullUp;
}());

var EventHandler = /** @class */ (function () {
    function EventHandler(indicator, options) {
        this.indicator = indicator;
        this.options = options;
        this.bscroll = indicator.bscroll;
        this.startEventRegister = new EventRegister(this.indicator.el, [
            {
                name: options.disableMouse ? 'touchstart' : 'mousedown',
                handler: this._start.bind(this)
            }
        ]);
        this.endEventRegister = new EventRegister(window, [
            {
                name: options.disableMouse ? 'touchend' : 'mouseup',
                handler: this._end.bind(this)
            }
        ]);
        this.hooks = new EventEmitter(['touchStart', 'touchMove', 'touchEnd']);
    }
    EventHandler.prototype._start = function (e) {
        var point = (e.touches ? e.touches[0] : e);
        e.preventDefault();
        e.stopPropagation();
        this.initiated = true;
        this.moved = false;
        this.lastPoint = point[this.indicator.keysMap.pointPos];
        var disableMouse = this.bscroll.options.disableMouse;
        this.moveEventRegister = new EventRegister(window, [
            {
                name: disableMouse ? 'touchmove' : 'mousemove',
                handler: this._move.bind(this)
            }
        ]);
        this.hooks.trigger('touchStart');
    };
    EventHandler.prototype._move = function (e) {
        var point = (e.touches ? e.touches[0] : e);
        var pointPos = point[this.indicator.keysMap.pointPos];
        e.preventDefault();
        e.stopPropagation();
        var delta = pointPos - this.lastPoint;
        this.lastPoint = pointPos;
        if (!this.moved) {
            this.hooks.trigger('touchMove', this.moved, delta);
            this.moved = true;
            return;
        }
        this.hooks.trigger('touchMove', this.moved, delta);
    };
    EventHandler.prototype._end = function (e) {
        if (!this.initiated) {
            return;
        }
        this.initiated = false;
        e.preventDefault();
        e.stopPropagation();
        this.moveEventRegister.destroy();
        this.hooks.trigger('touchEnd', this.moved);
    };
    EventHandler.prototype.destroy = function () {
        this.startEventRegister.destroy();
        this.moveEventRegister && this.moveEventRegister.destroy();
        this.endEventRegister.destroy();
    };
    return EventHandler;
}());

var INDICATOR_MIN_LEN = 8;
var Indicator = /** @class */ (function () {
    function Indicator(bscroll, options) {
        this.bscroll = bscroll;
        this.options = options;
        this.keyVals = {
            sizeRatio: 1,
            maxPos: 0,
            initialSize: 0
        };
        this.curPos = 0;
        this.hooksHandlers = [];
        this.wrapper = options.wrapper;
        this.wrapperStyle = this.wrapper.style;
        this.el = this.wrapper.children[0];
        this.elStyle = this.el.style;
        this.bscroll = bscroll;
        this.direction = options.direction;
        this.keysMap = this._getKeysMap();
        if (options.fade) {
            this.visible = 0;
            this.wrapperStyle.opacity = '0';
        }
        else {
            this.visible = 1;
        }
        this._listenHooks(options.fade, options.interactive);
        this.refresh();
    }
    Indicator.prototype._listenHooks = function (fade, interactive) {
        var _this = this;
        var bscroll = this.bscroll;
        var bscrollHooks = bscroll;
        var translaterHooks = bscroll.scroller.translater.hooks;
        var animaterHooks = bscroll.scroller.animater.hooks;
        this._listen(bscrollHooks, 'refresh', this.refresh);
        this._listen(translaterHooks, 'translate', this.updatePosAndSize);
        this._listen(animaterHooks, 'time', function (time) {
            _this.setTransitionTime(time);
        });
        this._listen(animaterHooks, 'timeFunction', function (ease) {
            _this.setTransitionTimingFunction(ease);
        });
        if (fade) {
            this._listen(bscrollHooks, 'scrollEnd', function () {
                _this.fade();
            });
            this._listen(bscrollHooks, 'scrollStart', function () {
                _this.fade(true);
            });
            // for mousewheel event
            if (bscroll.eventTypes.mousewheelStart &&
                bscroll.eventTypes.mousewheelEnd) {
                this._listen(bscrollHooks, 'mousewheelStart', function () {
                    _this.fade(true);
                });
                this._listen(bscrollHooks, 'mousewheelEnd', function () {
                    _this.fade();
                });
            }
        }
        if (interactive) {
            var disableMouse = this.bscroll.options.disableMouse;
            this.eventHandler = new EventHandler(this, { disableMouse: disableMouse });
            var eventHandlerHooks = this.eventHandler.hooks;
            this._listen(eventHandlerHooks, 'touchStart', this.startHandler);
            this._listen(eventHandlerHooks, 'touchMove', this.moveHandler);
            this._listen(eventHandlerHooks, 'touchEnd', this.endHandler);
        }
    };
    Indicator.prototype._getKeysMap = function () {
        if (this.direction === "vertical" /* Vertical */) {
            return {
                hasScroll: 'hasVerticalScroll',
                size: 'height',
                wrapperSize: 'clientHeight',
                scrollerSize: 'scrollerHeight',
                maxScroll: 'maxScrollY',
                pos: 'y',
                pointPos: 'pageY',
                translate: 'translateY'
            };
        }
        return {
            hasScroll: 'hasHorizontalScroll',
            size: 'width',
            wrapperSize: 'clientWidth',
            scrollerSize: 'scrollerWidth',
            maxScroll: 'maxScrollX',
            pos: 'x',
            pointPos: 'pageX',
            translate: 'translateX'
        };
    };
    Indicator.prototype.fade = function (visible) {
        var time = visible ? 250 : 500;
        this.wrapperStyle[style.transitionDuration] = time + 'ms';
        this.wrapperStyle.opacity = visible ? '1' : '0';
        this.visible = visible ? 1 : 0;
    };
    Indicator.prototype.refresh = function () {
        var hasScroll = this.keysMap.hasScroll;
        if (this._setShowBy(this.bscroll[hasScroll])) {
            var _a = this.keysMap, wrapperSize = _a.wrapperSize, scrollerSize = _a.scrollerSize, maxScroll = _a.maxScroll;
            this.keyVals = this._refreshKeyValues(this.wrapper[wrapperSize], this.bscroll[scrollerSize], this.bscroll[maxScroll]);
            this.updatePosAndSize({
                x: this.bscroll.x,
                y: this.bscroll.y
            });
        }
    };
    Indicator.prototype._setShowBy = function (hasScroll) {
        if (hasScroll) {
            this.wrapper.style.display = '';
            return true;
        }
        this.wrapper.style.display = 'none';
        return false;
    };
    Indicator.prototype._refreshKeyValues = function (wrapperSize, scrollerSize, maxScroll) {
        var initialSize = Math.max(Math.round((wrapperSize * wrapperSize) / (scrollerSize || wrapperSize || 1)), INDICATOR_MIN_LEN);
        var maxPos = wrapperSize - initialSize;
        // sizeRatio is negative
        var sizeRatio = maxPos / maxScroll;
        return {
            initialSize: initialSize,
            maxPos: maxPos,
            sizeRatio: sizeRatio
        };
    };
    Indicator.prototype.updatePosAndSize = function (endPoint) {
        var _a = this._refreshPosAndSizeValue(endPoint, this.keyVals), pos = _a.pos, size = _a.size;
        this.curPos = pos;
        this._refreshPosAndSizeStyle(size, pos);
    };
    Indicator.prototype._refreshPosAndSizeValue = function (endPoint, keyVals) {
        var posKey = this.keysMap.pos;
        var sizeRatio = keyVals.sizeRatio, initialSize = keyVals.initialSize, maxPos = keyVals.maxPos;
        var pos = Math.round(sizeRatio * endPoint[posKey]);
        var size;
        if (pos < 0) {
            size = Math.max(initialSize + pos * 3, INDICATOR_MIN_LEN);
            pos = 0;
        }
        else if (pos > maxPos) {
            size = Math.max(initialSize - (pos - maxPos) * 3, INDICATOR_MIN_LEN);
            pos = maxPos + initialSize - size;
        }
        else {
            size = initialSize;
        }
        return {
            pos: pos,
            size: size
        };
    };
    Indicator.prototype._refreshPosAndSizeStyle = function (size, pos) {
        var _a = this.keysMap, translate = _a.translate, sizeKey = _a.size;
        this.elStyle[sizeKey] = size + "px";
        this.elStyle[style.transform] = translate + "(" + pos + "px)" + this.bscroll.options.translateZ;
    };
    Indicator.prototype.setTransitionTime = function (time) {
        if (time === void 0) { time = 0; }
        this.elStyle[style.transitionDuration] = time + 'ms';
    };
    Indicator.prototype.setTransitionTimingFunction = function (easing) {
        this.elStyle[style.transitionTimingFunction] = easing;
    };
    Indicator.prototype.startHandler = function () {
        this.setTransitionTime();
        this.bscroll.trigger('beforeScrollStart');
    };
    Indicator.prototype.moveHandler = function (moved, delta) {
        if (!moved) {
            this.bscroll.trigger('scrollStart');
        }
        var newScrollPos = this._calScrollDesPos(this.curPos, delta, this.keyVals);
        // TODO freeScroll ？
        if (this.direction === "vertical" /* Vertical */) {
            this.bscroll.scrollTo(this.bscroll.x, newScrollPos);
        }
        else {
            this.bscroll.scrollTo(newScrollPos, this.bscroll.y);
        }
        this.bscroll.trigger('scroll', {
            x: this.bscroll.x,
            y: this.bscroll.y
        });
    };
    Indicator.prototype._calScrollDesPos = function (curPos, delta, keyVals) {
        var maxPos = keyVals.maxPos, sizeRatio = keyVals.sizeRatio;
        var newPos = curPos + delta;
        if (newPos < 0) {
            newPos = 0;
        }
        else if (newPos > maxPos) {
            newPos = maxPos;
        }
        return Math.round(newPos / sizeRatio);
    };
    Indicator.prototype.endHandler = function (moved) {
        if (moved) {
            this.bscroll.trigger('scrollEnd', {
                x: this.bscroll.x,
                y: this.bscroll.y
            });
        }
    };
    Indicator.prototype.destroy = function () {
        if (this.options.interactive) {
            this.eventHandler.destroy();
        }
        this.wrapper.parentNode.removeChild(this.wrapper);
        this.hooksHandlers.forEach(function (item) {
            var hooks = item[0];
            var hooksName = item[1];
            var handlerFn = item[2];
            hooks.off(hooksName, handlerFn);
        });
        this.hooksHandlers.length = 0;
    };
    Indicator.prototype._listen = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksHandlers.push([hooks, name, handler]);
    };
    return Indicator;
}());

var ScrollBar = /** @class */ (function () {
    function ScrollBar(bscroll) {
        this.indicators = [];
        if (bscroll.options.scrollbar) {
            this.indicators = this._initIndicators(bscroll);
            bscroll.on('destroy', this.destroy, this);
        }
    }
    ScrollBar.prototype._initIndicators = function (bscroll) {
        var _this = this;
        var _a = bscroll.options
            .scrollbar, _b = _a.fade, fade = _b === void 0 ? true : _b, _c = _a.interactive, interactive = _c === void 0 ? false : _c;
        var indicatorOption;
        var scrolls = {
            scrollX: "horizontal" /* Horizontal */,
            scrollY: "vertical" /* Vertical */
        };
        var indicators = [];
        Object.keys(scrolls).forEach(function (key) {
            var direction = scrolls[key];
            if (bscroll.options[key]) {
                indicatorOption = {
                    wrapper: _this._createIndicatorElement(direction),
                    direction: direction,
                    fade: fade,
                    interactive: interactive
                };
                bscroll.wrapper.appendChild(indicatorOption.wrapper);
                indicators.push(new Indicator(bscroll, indicatorOption));
            }
        });
        return indicators;
    };
    ScrollBar.prototype._createIndicatorElement = function (direction) {
        var scrollbarEl = document.createElement('div');
        var indicatorEl = document.createElement('div');
        scrollbarEl.style.cssText =
            'position:absolute;z-index:9999;pointerEvents:none';
        indicatorEl.style.cssText =
            'box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;';
        indicatorEl.className = 'bscroll-indicator';
        if (direction === 'horizontal') {
            scrollbarEl.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
            indicatorEl.style.height = '100%';
            scrollbarEl.className = 'bscroll-horizontal-scrollbar';
        }
        else {
            scrollbarEl.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
            indicatorEl.style.width = '100%';
            scrollbarEl.className = 'bscroll-vertical-scrollbar';
        }
        scrollbarEl.style.cssText += ';overflow:hidden';
        scrollbarEl.appendChild(indicatorEl);
        return scrollbarEl;
    };
    ScrollBar.prototype.destroy = function () {
        for (var _i = 0, _a = this.indicators; _i < _a.length; _i++) {
            var indicator = _a[_i];
            indicator.destroy();
        }
    };
    ScrollBar.pluginName = 'scrollbar';
    return ScrollBar;
}());

var PagesPos = /** @class */ (function () {
    function PagesPos(scroll, slideOpt) {
        this.scroll = scroll;
        this.slideOpt = slideOpt;
        this.slideEl = null;
        this.init();
    }
    PagesPos.prototype.init = function () {
        var scrollerIns = this.scroll.scroller;
        var scrollBehaviorX = scrollerIns.scrollBehaviorX;
        var scrollBehaviorY = scrollerIns.scrollBehaviorY;
        var wrapper = getRect(scrollerIns.wrapper);
        var scroller = getRect(scrollerIns.content);
        this.wrapperWidth = wrapper.width;
        this.wrapperHeight = wrapper.height;
        this.scrollerHeight = scrollBehaviorY.hasScroll
            ? scroller.height
            : wrapper.height;
        this.scrollerWidth = scrollBehaviorX.hasScroll
            ? scroller.width
            : wrapper.width;
        var stepX = this.slideOpt.stepX || this.wrapperWidth;
        var stepY = this.slideOpt.stepY || this.wrapperHeight;
        var slideEls = scrollerIns.content;
        var el = this.slideOpt.el;
        if (typeof el === 'string') {
            this.slideEl = slideEls.querySelectorAll(el);
        }
        this.pages = this.slideEl
            ? this.computePagePosInfoByEl(this.slideEl)
            : this.computePagePosInfo(stepX, stepY);
        this.xLen = this.pages ? this.pages.length : 0;
        this.yLen = this.pages && this.pages[0] ? this.pages[0].length : 0;
    };
    PagesPos.prototype.hasInfo = function () {
        if (!this.pages || !this.pages.length) {
            return false;
        }
        return true;
    };
    PagesPos.prototype.getPos = function (x, y) {
        return this.pages[x][y];
    };
    PagesPos.prototype.getNearestPage = function (x, y) {
        if (!this.hasInfo()) {
            return;
        }
        var pageX = 0;
        var pageY = 0;
        var l = this.pages.length;
        for (; pageX < l - 1; pageX++) {
            if (x >= this.pages[pageX][0].cx) {
                break;
            }
        }
        l = this.pages[pageX].length;
        for (; pageY < l - 1; pageY++) {
            if (y >= this.pages[0][pageY].cy) {
                break;
            }
        }
        return {
            pageX: pageX,
            pageY: pageY
        };
    };
    PagesPos.prototype.computePagePosInfo = function (stepX, stepY) {
        var pages = [];
        var x = 0;
        var y;
        var cx;
        var cy;
        var i = 0;
        var l;
        var maxScrollPosX = this.scroll.scroller.scrollBehaviorX.maxScrollPos;
        var maxScrollPosY = this.scroll.scroller.scrollBehaviorY.maxScrollPos;
        cx = Math.round(stepX / 2);
        cy = Math.round(stepY / 2);
        while (x > -this.scrollerWidth) {
            pages[i] = [];
            l = 0;
            y = 0;
            while (y > -this.scrollerHeight) {
                pages[i][l] = {
                    x: Math.max(x, maxScrollPosX),
                    y: Math.max(y, maxScrollPosY),
                    width: stepX,
                    height: stepY,
                    cx: x - cx,
                    cy: y - cy
                };
                y -= stepY;
                l++;
            }
            x -= stepX;
            i++;
        }
        return pages;
    };
    PagesPos.prototype.computePagePosInfoByEl = function (el) {
        var pages = [];
        var x = 0;
        var y = 0;
        var cx;
        var cy;
        var i = 0;
        var l = el.length;
        var m = 0;
        var n = -1;
        var rect;
        var maxScrollX = this.scroll.scroller.scrollBehaviorX.maxScrollPos;
        var maxScrollY = this.scroll.scroller.scrollBehaviorY.maxScrollPos;
        for (; i < l; i++) {
            rect = getRect(el[i]);
            if (i === 0 || rect.left <= getRect(el[i - 1]).left) {
                m = 0;
                n++;
            }
            if (!pages[m]) {
                pages[m] = [];
            }
            x = Math.max(-rect.left, maxScrollX);
            y = Math.max(-rect.top, maxScrollY);
            cx = x - Math.round(rect.width / 2);
            cy = y - Math.round(rect.height / 2);
            pages[m][n] = {
                x: x,
                y: y,
                width: rect.width,
                height: rect.height,
                cx: cx,
                cy: cy
            };
            if (x > maxScrollX) {
                m++;
            }
        }
        return pages;
    };
    return PagesPos;
}());

var PageInfo = /** @class */ (function () {
    function PageInfo(scroll, slideOpt) {
        this.scroll = scroll;
        this.slideOpt = slideOpt;
    }
    PageInfo.prototype.init = function () {
        this.currentPage = {
            x: 0,
            y: 0,
            pageX: 0,
            pageY: 0
        };
        this.pagesPos = new PagesPos(this.scroll, this.slideOpt);
        this.checkSlideLoop();
    };
    PageInfo.prototype.change2safePage = function (pageX, pageY) {
        if (!this.pagesPos.hasInfo()) {
            return;
        }
        if (pageX >= this.pagesPos.xLen) {
            pageX = this.pagesPos.xLen - 1;
        }
        else if (pageX < 0) {
            pageX = 0;
        }
        if (pageY >= this.pagesPos.yLen) {
            pageY = this.pagesPos.yLen - 1;
        }
        else if (pageY < 0) {
            pageY = 0;
        }
        var _a = this.pagesPos.getPos(pageX, pageY), x = _a.x, y = _a.y;
        return {
            pageX: pageX,
            pageY: pageY,
            x: x,
            y: y
        };
    };
    PageInfo.prototype.getRealPage = function (page) {
        var fixedPage = function (page, realPageLen) {
            var pageIndex = [];
            for (var i = 0; i < realPageLen; i++) {
                pageIndex.push(i);
            }
            pageIndex.unshift(realPageLen - 1);
            pageIndex.push(0);
            return pageIndex[page];
        };
        var currentPage = page
            ? extend({}, page)
            : extend({}, this.currentPage);
        if (this.loopX) {
            currentPage.pageX = fixedPage(currentPage.pageX, this.pagesPos.xLen - 2);
        }
        if (this.loopY) {
            currentPage.pageY = fixedPage(currentPage.pageY, this.pagesPos.yLen - 2);
        }
        return {
            pageX: currentPage.pageX,
            pageY: currentPage.pageY
        };
    };
    PageInfo.prototype.getPageSize = function () {
        return this.pagesPos.getPos(this.currentPage.pageX, this.currentPage.pageY);
    };
    PageInfo.prototype.realPage2Page = function (x, y) {
        if (!this.pagesPos.hasInfo()) {
            return;
        }
        var lastX = this.pagesPos.xLen - 1;
        var lastY = this.pagesPos.yLen - 1;
        var firstX = 0;
        var firstY = 0;
        if (this.loopX) {
            x += 1;
            firstX = firstX + 1;
            lastX = lastX - 1;
        }
        if (this.loopY) {
            y += 1;
            firstY = firstY + 1;
            lastY = lastY - 1;
        }
        x = fixInboundValue(x, firstX, lastX);
        y = fixInboundValue(y, firstY, lastY);
        return {
            realX: x,
            realY: y
        };
    };
    PageInfo.prototype.nextPage = function () {
        return this.changedPageNum("positive" /* Positive */);
    };
    PageInfo.prototype.prevPage = function () {
        return this.changedPageNum("negative" /* Negative */);
    };
    PageInfo.prototype.nearestPage = function (x, y, directionX, directionY) {
        var pageInfo = this.pagesPos.getNearestPage(x, y);
        if (!pageInfo) {
            return {
                x: 0,
                y: 0,
                pageX: 0,
                pageY: 0
            };
        }
        var pageX = pageInfo.pageX;
        var pageY = pageInfo.pageY;
        var newX;
        var newY;
        if (pageX === this.currentPage.pageX) {
            pageX += directionX;
            pageX = fixInboundValue(pageX, 0, this.pagesPos.xLen - 1);
        }
        if (pageY === this.currentPage.pageY) {
            pageY += directionY;
            pageY = fixInboundValue(pageInfo.pageY, 0, this.pagesPos.yLen - 1);
        }
        newX = this.pagesPos.getPos(pageX, 0).x;
        newY = this.pagesPos.getPos(0, pageY).y;
        return {
            x: newX,
            y: newY,
            pageX: pageX,
            pageY: pageY
        };
    };
    PageInfo.prototype.getLoopStage = function () {
        if (!this.needLoop) {
            return "middle" /* Middle */;
        }
        if (this.loopX) {
            if (this.currentPage.pageX === 0) {
                return "head" /* Head */;
            }
            if (this.currentPage.pageX === this.pagesPos.xLen - 1) {
                return "tail" /* Tail */;
            }
        }
        if (this.loopY) {
            if (this.currentPage.pageY === 0) {
                return "head" /* Head */;
            }
            if (this.currentPage.pageY === this.pagesPos.yLen - 1) {
                return "tail" /* Tail */;
            }
        }
        return "middle" /* Middle */;
    };
    PageInfo.prototype.resetLoopPage = function () {
        if (this.loopX) {
            if (this.currentPage.pageX === 0) {
                return {
                    pageX: this.pagesPos.xLen - 2,
                    pageY: this.currentPage.pageY
                };
            }
            if (this.currentPage.pageX === this.pagesPos.xLen - 1) {
                return {
                    pageX: 1,
                    pageY: this.currentPage.pageY
                };
            }
        }
        if (this.loopY) {
            if (this.currentPage.pageY === 0) {
                return {
                    pageX: this.currentPage.pageX,
                    pageY: this.pagesPos.yLen - 2
                };
            }
            if (this.currentPage.pageY === this.pagesPos.yLen - 1) {
                return {
                    pageX: this.currentPage.pageX,
                    pageY: 1
                };
            }
        }
    };
    PageInfo.prototype.changedPageNum = function (direction) {
        var x = this.currentPage.pageX;
        var y = this.currentPage.pageY;
        if (this.slideX) {
            x = direction === "negative" /* Negative */ ? x - 1 : x + 1;
        }
        if (this.slideY) {
            y = direction === "negative" /* Negative */ ? y - 1 : y + 1;
        }
        return {
            pageX: x,
            pageY: y
        };
    };
    PageInfo.prototype.checkSlideLoop = function () {
        this.needLoop = this.slideOpt.loop;
        if (this.pagesPos.xLen > 1) {
            this.slideX = true;
        }
        if (this.pagesPos.pages[0] && this.pagesPos.yLen > 1) {
            this.slideY = true;
        }
        this.loopX = this.needLoop && this.slideX;
        this.loopY = this.needLoop && this.slideY;
        if (this.slideX && this.slideY) {
            warn('slide does not support two direction at the same time.');
        }
    };
    return PageInfo;
}());

var sourcePrefix$2 = 'plugins.slide';
var propertiesMap$2 = [
    {
        key: 'next',
        name: 'next'
    },
    {
        key: 'prev',
        name: 'prev'
    },
    {
        key: 'goToPage',
        name: 'goToPage'
    },
    {
        key: 'getCurrentPage',
        name: 'getCurrentPage'
    }
];
var propertiesConfig$1 = propertiesMap$2.map(function (item) {
    return {
        key: item.key,
        sourceKey: sourcePrefix$2 + "." + item.name
    };
});

var Slide = /** @class */ (function () {
    function Slide(scroll) {
        this.scroll = scroll;
        this.resetLooping = false;
        this.isTouching = false;
        this.scroll.proxy(propertiesConfig$1);
        this.scroll.registerType(['slideWillChange']);
        this.slideOpt = this.scroll.options.slide;
        this.page = new PageInfo(scroll, this.slideOpt);
        this.hooksFn = [];
        this.init();
    }
    Slide.prototype.init = function () {
        var _this = this;
        var slide = this.slideOpt;
        var slideEls = this.scroll.scroller.content;
        var lazyInit2Refresh = false;
        if (slide.loop) {
            var children = slideEls.children;
            if (children.length > 1) {
                this.cloneSlideEleForLoop(slideEls);
                lazyInit2Refresh = true;
            }
            else {
                // Loop does not make any sense if there is only one child.
                slide.loop = false;
            }
        }
        var needRefresh = this.setSlideWidth(slideEls);
        this.page.currentPage = {
            x: 0,
            y: 0,
            pageX: 0,
            pageY: 0
        };
        this.willChangeToPage = {
            pageX: 0,
            pageY: 0
        };
        var scrollHooks = this.scroll.hooks;
        var scrollerHooks = this.scroll.scroller.hooks;
        this.registorHooks(scrollHooks, 'refresh', this.initSlideState);
        this.registorHooks(scrollHooks, 'destroy', this.destroy);
        this.registorHooks(scrollerHooks, 'momentum', this.modifyScrollMetaHandler);
        // scrollEnd handler should be called before customized handlers
        this.registorHooks(this.scroll, 'scrollEnd', this.amendCurrentPage);
        this.registorHooks(scrollerHooks, 'beforeStart', this.setTouchFlag);
        this.registorHooks(scrollerHooks, 'scroll', this.scrollMoving);
        // for mousewheel event
        if (this.scroll.eventTypes.mousewheelMove &&
            this.scroll.eventTypes.mousewheelEnd) {
            this.registorHooks(this.scroll, 'mousewheelMove', function () {
                // prevent default action of mousewheelMove
                return true;
            });
            this.registorHooks(this.scroll, 'mousewheelEnd', function (delta) {
                if (delta.directionX === 1 /* Positive */ ||
                    delta.directionY === 1 /* Positive */) {
                    _this.next();
                }
                if (delta.directionX === -1 /* Negative */ ||
                    delta.directionY === -1 /* Negative */) {
                    _this.prev();
                }
            });
        }
        if (slide.listenFlick !== false) {
            this.registorHooks(scrollerHooks, 'flick', this.flickHandler);
        }
        if (!lazyInit2Refresh && !needRefresh) {
            this.initSlideState();
        }
        else {
            this.scroll.refresh();
        }
    };
    Slide.prototype.next = function (time, easing) {
        var _a = this.page.nextPage(), pageX = _a.pageX, pageY = _a.pageY;
        this.goTo(pageX, pageY, time, easing);
    };
    Slide.prototype.prev = function (time, easing) {
        var _a = this.page.prevPage(), pageX = _a.pageX, pageY = _a.pageY;
        this.goTo(pageX, pageY, time, easing);
    };
    Slide.prototype.goToPage = function (x, y, time, easing) {
        var pageInfo = this.page.realPage2Page(x, y);
        if (!pageInfo) {
            return;
        }
        this.goTo(pageInfo.realX, pageInfo.realY, time, easing);
    };
    Slide.prototype.getCurrentPage = function () {
        return this.page.getRealPage();
    };
    Slide.prototype.nearestPage = function (x, y) {
        var scrollBehaviorX = this.scroll.scroller.scrollBehaviorX;
        var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
        var triggerThreshold = true;
        if (Math.abs(x - scrollBehaviorX.absStartPos) <= this.thresholdX &&
            Math.abs(y - scrollBehaviorY.absStartPos) <= this.thresholdY) {
            triggerThreshold = false;
        }
        if (!triggerThreshold) {
            return this.page.currentPage;
        }
        return this.page.nearestPage(fixInboundValue(x, scrollBehaviorX.maxScrollPos, scrollBehaviorX.minScrollPos), fixInboundValue(y, scrollBehaviorY.maxScrollPos, scrollBehaviorY.minScrollPos), scrollBehaviorX.direction, scrollBehaviorY.direction);
    };
    Slide.prototype.destroy = function () {
        var slideEls = this.scroll.scroller.content;
        if (this.slideOpt.loop) {
            var children = slideEls.children;
            if (children.length > 2) {
                removeChild(slideEls, children[children.length - 1]);
                removeChild(slideEls, children[0]);
            }
        }
        this.hooksFn.forEach(function (item) {
            var hooks = item[0];
            var hooksName = item[1];
            var handlerFn = item[2];
            if (hooks.eventTypes[hooksName]) {
                hooks.off(hooksName, handlerFn);
            }
        });
        this.hooksFn.length = 0;
    };
    Slide.prototype.initSlideState = function () {
        this.page.init();
        this.initThreshold();
        if (this.page.slideX || this.page.slideY) {
            var initPageX = this.page.loopX ? 1 : 0;
            var initPageY = this.page.loopY ? 1 : 0;
            this.goTo(this.page.currentPage.pageX || initPageX, this.page.currentPage.pageY || initPageY, 0);
        }
    };
    Slide.prototype.initThreshold = function () {
        var slideThreshold = this.slideOpt.threshold || 0.1;
        if (slideThreshold % 1 === 0) {
            this.thresholdX = slideThreshold;
            this.thresholdY = slideThreshold;
        }
        else {
            var pageSize = this.page.getPageSize();
            this.thresholdX = Math.round(pageSize.width * slideThreshold);
            this.thresholdY = Math.round(pageSize.height * slideThreshold);
        }
    };
    Slide.prototype.cloneSlideEleForLoop = function (slideEls) {
        var children = slideEls.children;
        prepend(children[children.length - 1].cloneNode(true), slideEls);
        slideEls.appendChild(children[1].cloneNode(true));
    };
    Slide.prototype.amendCurrentPage = function () {
        this.isTouching = false;
        if (!this.slideOpt.loop) {
            return;
        }
        // triggered by resetLoop
        if (this.resetLooping) {
            this.resetLooping = false;
            return;
        }
        // fix bug: scroll two page or even more page at once and fetch the boundary.
        // In this case, momentum won't be trigger, so the pageIndex will be wrong and won't be trigger reset.
        var isScrollToBoundary = false;
        if (this.page.loopX &&
            (this.scroll.x === this.scroll.scroller.scrollBehaviorX.minScrollPos ||
                this.scroll.x === this.scroll.scroller.scrollBehaviorX.maxScrollPos)) {
            isScrollToBoundary = true;
        }
        if (this.page.loopY &&
            (this.scroll.y === this.scroll.scroller.scrollBehaviorY.minScrollPos ||
                this.scroll.y === this.scroll.scroller.scrollBehaviorY.maxScrollPos)) {
            isScrollToBoundary = true;
        }
        if (isScrollToBoundary) {
            var scrollBehaviorX = this.scroll.scroller.scrollBehaviorX;
            var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
            var newPos = this.page.nearestPage(fixInboundValue(this.scroll.x, scrollBehaviorX.maxScrollPos, scrollBehaviorX.minScrollPos), fixInboundValue(this.scroll.y, scrollBehaviorY.maxScrollPos, scrollBehaviorY.minScrollPos), 0, 0);
            var newPage = {
                x: newPos.x,
                y: newPos.y,
                pageX: newPos.pageX,
                pageY: newPos.pageY
            };
            if (newPage.pageX !== this.page.currentPage.pageX ||
                newPage.pageY !== this.page.currentPage.pageY) {
                this.page.currentPage = newPage;
            }
        }
        var changePage = this.page.resetLoopPage();
        if (changePage) {
            this.resetLooping = true;
            this.goTo(changePage.pageX, changePage.pageY, 0);
            return true; // stop trigger chain
        }
        // amend willChangeToPage, because willChangeToPage maybe wrong when sliding quickly
        this.pageWillChangeTo(this.page.currentPage);
    };
    Slide.prototype.setSlideWidth = function (slideEls) {
        if (this.slideOpt.disableSetWidth) {
            return false;
        }
        if (!this.scroll.options.scrollX) {
            return false;
        }
        var children = slideEls.children;
        var slideItemWidth = children[0].clientWidth;
        for (var i = 0; i < children.length; i++) {
            var slideItemDom = children[i];
            slideItemDom.style.width = slideItemWidth + 'px';
        }
        slideEls.style.width = slideItemWidth * children.length + 'px';
        return true;
    };
    Slide.prototype.goTo = function (pageX, pageY, time, easing) {
        if (pageY === void 0) { pageY = 0; }
        var newPageInfo = this.page.change2safePage(pageX, pageY);
        if (!newPageInfo) {
            return;
        }
        var scrollEasing = easing || this.slideOpt.easing || ease.bounce;
        var posX = newPageInfo.x;
        var posY = newPageInfo.y;
        var deltaX = posX - this.scroll.scroller.scrollBehaviorX.currentPos;
        var deltaY = posY - this.scroll.scroller.scrollBehaviorY.currentPos;
        if (!deltaX && !deltaY) {
            return;
        }
        time = time === undefined ? this.getAnimateTime(deltaX, deltaY) : time;
        this.page.currentPage = {
            x: posX,
            y: posY,
            pageX: newPageInfo.pageX,
            pageY: newPageInfo.pageY
        };
        this.pageWillChangeTo(this.page.currentPage);
        this.scroll.scroller.scrollTo(posX, posY, time, scrollEasing);
    };
    Slide.prototype.flickHandler = function () {
        var scrollBehaviorX = this.scroll.scroller.scrollBehaviorX;
        var scrollBehaviorY = this.scroll.scroller.scrollBehaviorY;
        var deltaX = scrollBehaviorX.currentPos - scrollBehaviorX.startPos;
        var deltaY = scrollBehaviorY.currentPos - scrollBehaviorY.startPos;
        var time = this.getAnimateTime(deltaX, deltaY);
        this.goTo(this.page.currentPage.pageX + scrollBehaviorX.direction, this.page.currentPage.pageY + scrollBehaviorY.direction, time);
    };
    Slide.prototype.getAnimateTime = function (deltaX, deltaY) {
        if (this.slideOpt.speed) {
            return this.slideOpt.speed;
        }
        return Math.max(Math.max(Math.min(Math.abs(deltaX), 1000), Math.min(Math.abs(deltaY), 1000)), 300);
    };
    Slide.prototype.modifyScrollMetaHandler = function (scrollMeta) {
        var newPos = this.nearestPage(scrollMeta.newX, scrollMeta.newY);
        scrollMeta.time = this.getAnimateTime(scrollMeta.newX - newPos.x, scrollMeta.newY - newPos.y);
        scrollMeta.newX = newPos.x;
        scrollMeta.newY = newPos.y;
        scrollMeta.easing = this.slideOpt.easing || ease.bounce;
        this.page.currentPage = {
            x: scrollMeta.newX,
            y: scrollMeta.newY,
            pageX: newPos.pageX,
            pageY: newPos.pageY
        };
        this.pageWillChangeTo(this.page.currentPage);
    };
    Slide.prototype.scrollMoving = function (point) {
        if (this.isTouching) {
            var newPos = this.nearestPage(point.x, point.y);
            this.pageWillChangeTo(newPos);
        }
    };
    Slide.prototype.pageWillChangeTo = function (newPage) {
        var changeToPage = this.page.getRealPage(newPage);
        if (changeToPage.pageX === this.willChangeToPage.pageX &&
            changeToPage.pageY === this.willChangeToPage.pageY) {
            return;
        }
        this.willChangeToPage = changeToPage;
        this.scroll.trigger('slideWillChange', this.willChangeToPage);
    };
    Slide.prototype.setTouchFlag = function () {
        this.isTouching = true;
    };
    Slide.prototype.registorHooks = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksFn.push([hooks, name, handler]);
    };
    Slide.pluginName = 'slide';
    return Slide;
}());

var sourcePrefix$3 = 'plugins.wheel';
var propertiesMap$3 = [
    {
        key: 'wheelTo',
        name: 'wheelTo'
    },
    {
        key: 'getSelectedIndex',
        name: 'getSelectedIndex'
    }
];
var propertiesConfig$2 = propertiesMap$3.map(function (item) {
    return {
        key: item.key,
        sourceKey: sourcePrefix$3 + "." + item.name
    };
});

var CONSTANTS = {
    rate: 4
};
var Wheel = /** @class */ (function () {
    function Wheel(scroll) {
        this.scroll = scroll;
        this.options = this.scroll.options.wheel;
        this.init();
    }
    Wheel.prototype.init = function () {
        if (this.options) {
            this.normalizeOptions();
            this.refresh();
            this.tapIntoHooks();
            this.wheelTo(this.selectedIndex);
            this.scroll.proxy(propertiesConfig$2);
        }
    };
    Wheel.prototype.tapIntoHooks = function () {
        var _this = this;
        var scroller = this.scroll.scroller;
        var actionsHandler = scroller.actionsHandler;
        var scrollBehaviorY = scroller.scrollBehaviorY;
        var animater = scroller.animater;
        // BScroll
        this.scroll.on(this.scroll.hooks.eventTypes.refresh, function () {
            _this.refresh();
        });
        // Scroller
        scroller.hooks.on(scroller.hooks.eventTypes.checkClick, function () {
            var index = Array.from(_this.items).indexOf(_this.target);
            if (index === -1)
                return true;
            _this.wheelTo(index, _this.options.adjustTime, ease.swipe);
            return true;
        });
        scroller.hooks.on(scroller.hooks.eventTypes.scrollTo, function (endPoint) {
            endPoint.y = _this.findNearestValidWheel(endPoint.y).y;
        });
        scroller.hooks.on(scroller.hooks.eventTypes.scrollToElement, function (el, pos) {
            if (!hasClass(el, _this.options.wheelItemClass)) {
                return true;
            }
            else {
                pos.top = _this.findNearestValidWheel(pos.top).y;
            }
        });
        scroller.hooks.on(scroller.hooks.eventTypes.ignoreDisMoveForSamePos, function () {
            return true;
        });
        // ActionsHandler
        actionsHandler.hooks.on(actionsHandler.hooks.eventTypes.beforeStart, function (e) {
            _this.target = e.target;
        });
        // ScrollBehaviorY
        scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.momentum, function (momentumInfo, distance) {
            momentumInfo.rate = CONSTANTS.rate;
            momentumInfo.destination = _this.findNearestValidWheel(momentumInfo.destination).y;
            var maxDistance = 1000;
            var minDuration = 800;
            if (distance < maxDistance) {
                momentumInfo.duration = Math.max(minDuration, (distance / maxDistance) * _this.scroll.options.swipeTime);
            }
        });
        scrollBehaviorY.hooks.on(scrollBehaviorY.hooks.eventTypes.end, function (momentumInfo) {
            var validWheel = _this.findNearestValidWheel(scrollBehaviorY.currentPos);
            momentumInfo.destination = validWheel.y;
            momentumInfo.duration = _this.options.adjustTime;
            _this.selectedIndex = validWheel.index;
        });
        // Animater
        animater.hooks.on(animater.hooks.eventTypes.time, function (time) {
            _this.transitionDuration(time);
        });
        animater.hooks.on(animater.hooks.eventTypes.timeFunction, function (easing) {
            _this.timeFunction(easing);
        });
        animater.hooks.on(animater.hooks.eventTypes.beforeForceStop, function (_a) {
            var y = _a.y;
            _this.target = _this.items[_this.findNearestValidWheel(y).index];
            // don't dispatch scrollEnd when it is a click operation
            return true;
        });
        // Translater
        animater.translater.hooks.on(animater.translater.hooks.eventTypes.translate, function (endPoint) {
            _this.rotateX(endPoint.y);
            _this.selectedIndex = _this.findNearestValidWheel(endPoint.y).index;
        });
    };
    Wheel.prototype.refresh = function () {
        var scroller = this.scroll.scroller;
        var scrollBehaviorY = scroller.scrollBehaviorY;
        // adjust contentSize
        var contentRect = getRect(scroller.content);
        scrollBehaviorY.contentSize = contentRect.height;
        this.items = scroller.content.children;
        this.checkWheelAllDisabled();
        this.itemHeight = this.items.length
            ? scrollBehaviorY.contentSize / this.items.length
            : 0;
        if (this.selectedIndex === undefined) {
            this.selectedIndex = this.options.selectedIndex || 0;
        }
        this.scroll.maxScrollX = 0;
        this.scroll.maxScrollY = -this.itemHeight * (this.items.length - 1);
        this.scroll.minScrollX = 0;
        this.scroll.minScrollY = 0;
        scrollBehaviorY.hasScroll =
            scrollBehaviorY.options && this.scroll.maxScrollY < this.scroll.minScrollY;
    };
    Wheel.prototype.getSelectedIndex = function () {
        return this.selectedIndex;
    };
    Wheel.prototype.wheelTo = function (index, time, ease, isSlient) {
        if (index === void 0) { index = 0; }
        if (time === void 0) { time = 0; }
        var y = -index * this.itemHeight;
        this.scroll.scrollTo(0, y, time, ease, isSlient);
    };
    Wheel.prototype.transitionDuration = function (time) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].style[style.transitionDuration] =
                time + 'ms';
        }
    };
    Wheel.prototype.timeFunction = function (easing) {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].style[style.transitionTimingFunction] = easing;
        }
    };
    Wheel.prototype.rotateX = function (y) {
        var _a = this.options.rotate, rotate = _a === void 0 ? 25 : _a;
        for (var i = 0; i < this.items.length; i++) {
            var deg = rotate * (y / this.itemHeight + i);
            this.items[i].style[style.transform] = "rotateX(" + deg + "deg)";
        }
    };
    Wheel.prototype.findNearestValidWheel = function (y) {
        y = y > 0 ? 0 : y < this.scroll.maxScrollY ? this.scroll.maxScrollY : y;
        var currentIndex = Math.abs(Math.round(-y / this.itemHeight));
        var cacheIndex = currentIndex;
        var items = this.items;
        var wheelDisabledItemClassName = this.options
            .wheelDisabledItemClass;
        // Impersonation web native select
        // first, check whether there is a enable item whose index is smaller than currentIndex
        // then, check whether there is a enable item whose index is bigger than currentIndex
        // otherwise, there are all disabled items, just keep currentIndex unchange
        while (currentIndex >= 0) {
            if (!hasClass(items[currentIndex], wheelDisabledItemClassName)) {
                break;
            }
            currentIndex--;
        }
        if (currentIndex < 0) {
            currentIndex = cacheIndex;
            while (currentIndex <= items.length - 1) {
                if (!hasClass(items[currentIndex], wheelDisabledItemClassName)) {
                    break;
                }
                currentIndex++;
            }
        }
        // keep it unchange when all the items are disabled
        if (currentIndex === items.length) {
            currentIndex = cacheIndex;
        }
        // when all the items are disabled, this.selectedIndex should always be -1
        return {
            index: this.wheelItemsAllDisabled ? -1 : currentIndex,
            y: -currentIndex * this.itemHeight
        };
    };
    Wheel.prototype.normalizeOptions = function () {
        var options = (this.options = isPlainObject(this.options)
            ? this.options
            : {});
        if (!options.wheelWrapperClass) {
            options.wheelWrapperClass = 'wheel-scroll';
        }
        if (!options.wheelItemClass) {
            options.wheelItemClass = 'wheel-item';
        }
        if (!options.rotate) {
            options.rotate = 25;
        }
        if (!options.adjustTime) {
            options.adjustTime = 400;
        }
        if (!options.wheelDisabledItemClass) {
            options.wheelDisabledItemClass = 'wheel-disabled-item';
        }
    };
    Wheel.prototype.checkWheelAllDisabled = function () {
        var wheelDisabledItemClassName = this.options
            .wheelDisabledItemClass;
        var items = this.items;
        this.wheelItemsAllDisabled = true;
        for (var i = 0; i < items.length; i++) {
            if (!hasClass(items[i], wheelDisabledItemClassName)) {
                this.wheelItemsAllDisabled = false;
                break;
            }
        }
    };
    Wheel.pluginName = 'wheel';
    return Wheel;
}());

var sourcePrefix$4 = 'plugins.zoom';
var propertiesMap$4 = [
    {
        key: 'zoomTo',
        name: 'zoomTo'
    }
];
var propertiesConfig$3 = propertiesMap$4.map(function (item) {
    return {
        key: item.key,
        sourceKey: sourcePrefix$4 + "." + item.name
    };
});

var Zoom = /** @class */ (function () {
    function Zoom(scroll) {
        this.scroll = scroll;
        this.scale = 1;
        this.scroll.proxy(propertiesConfig$3);
        this.scroll.registerType(['zoomStart', 'zoomEnd']);
        this.zoomOpt = this.scroll.options.zoom;
        this.lastTransformScale = this.scale;
        this.hooksFn = [];
        this.init();
    }
    Zoom.prototype.init = function () {
        var _this = this;
        var scrollerIns = this.scroll.scroller;
        this.wrapper = this.scroll.scroller.wrapper;
        this.scaleElement = this.scroll.scroller.content;
        this.scaleElement.style[style.transformOrigin] = '0 0';
        this.scaleElementInitSize = getRect(this.scaleElement);
        var scrollBehaviorX = scrollerIns.scrollBehaviorX;
        var scrollBehaviorY = scrollerIns.scrollBehaviorY;
        this.initScrollBoundary = {
            x: [scrollBehaviorX.minScrollPos, scrollBehaviorX.maxScrollPos],
            y: [scrollBehaviorY.minScrollPos, scrollBehaviorY.maxScrollPos]
        };
        this.registorHooks(scrollerIns.actions.hooks, 'start', function (e) {
            if (e.touches && e.touches.length > 1) {
                _this.zoomStart(e);
            }
        });
        this.registorHooks(scrollerIns.actions.hooks, 'beforeMove', function (e) {
            if (!e.touches || e.touches.length < 2) {
                return false;
            }
            _this.zoom(e);
            return true;
        });
        this.registorHooks(scrollerIns.actions.hooks, 'beforeEnd', function (e) {
            if (!_this.zooming) {
                return false;
            }
            _this.zoomEnd();
            return true;
        });
        this.registorHooks(scrollerIns.translater.hooks, 'beforeTranslate', function (transformStyle, point) {
            var scale = point.scale ? point.scale : _this.lastTransformScale;
            _this.lastTransformScale = scale;
            transformStyle.push("scale(" + scale + ")");
        });
        this.registorHooks(scrollerIns.hooks, 'ignoreDisMoveForSamePos', function () {
            return true;
        });
        this.registorHooks(this.scroll.hooks, 'destroy', this.destroy);
    };
    Zoom.prototype.zoomTo = function (scale, x, y) {
        var _a = offsetToBody(this.wrapper), left = _a.left, top = _a.top;
        var originX = x + left - this.scroll.x;
        var originY = y + top - this.scroll.y;
        this.zooming = true;
        this._zoomTo(scale, { x: originX, y: originY }, this.scale);
        this.zooming = false;
    };
    Zoom.prototype.zoomStart = function (e) {
        this.zooming = true;
        var firstFinger = e.touches[0];
        var secondFinger = e.touches[1];
        this.startDistance = this.getFingerDistance(e);
        this.startScale = this.scale;
        var _a = offsetToBody(this.wrapper), left = _a.left, top = _a.top;
        this.origin = {
            x: Math.abs(firstFinger.pageX + secondFinger.pageX) / 2 +
                left -
                this.scroll.x,
            y: Math.abs(firstFinger.pageY + secondFinger.pageY) / 2 +
                top -
                this.scroll.y
        };
        this.scroll.trigger(this.scroll.eventTypes.zoomStart);
    };
    Zoom.prototype.zoom = function (e) {
        var scrollerIns = this.scroll.scroller;
        var currentDistance = this.getFingerDistance(e);
        var currentScale = (currentDistance / this.startDistance) * this.startScale;
        this.scale = this.scaleCure(currentScale);
        var lastScale = this.scale / this.startScale;
        var scrollBehaviorX = scrollerIns.scrollBehaviorX;
        var scrollBehaviorY = scrollerIns.scrollBehaviorY;
        var x = this.getNewPos(this.origin.x, lastScale, scrollBehaviorX);
        var y = this.getNewPos(this.origin.y, lastScale, scrollBehaviorY);
        this.resetBoundaries(this.scale, scrollBehaviorX, 'x', x);
        this.resetBoundaries(this.scale, scrollBehaviorY, 'y', y);
        scrollerIns.scrollTo(x, y, 0, undefined, {
            start: {
                scale: this.lastTransformScale
            },
            end: {
                scale: this.scale
            }
        });
    };
    Zoom.prototype.getFingerDistance = function (e) {
        var firstFinger = e.touches[0];
        var secondFinger = e.touches[1];
        var deltaX = Math.abs(firstFinger.pageX - secondFinger.pageX);
        var deltaY = Math.abs(firstFinger.pageY - secondFinger.pageY);
        return getDistance(deltaX, deltaY);
    };
    Zoom.prototype.zoomEnd = function () {
        this._zoomTo(this.scale, this.origin, this.startScale || this.scale);
        this.zooming = false;
        this.scroll.trigger(this.scroll.eventTypes.zoomEnd);
    };
    Zoom.prototype.destroy = function () {
        this.hooksFn.forEach(function (item) {
            var hooks = item[0];
            var hooksName = item[1];
            var handlerFn = item[2];
            hooks.off(hooksName, handlerFn);
        });
        this.hooksFn.length = 0;
    };
    Zoom.prototype._zoomTo = function (scale, origin, startScale) {
        this.scale = this.fixInScaleLimit(scale);
        var lastScale = this.scale / startScale;
        var scrollerIns = this.scroll.scroller;
        var scrollBehaviorX = scrollerIns.scrollBehaviorX;
        var scrollBehaviorY = scrollerIns.scrollBehaviorY;
        this.resetBoundaries(this.scale, scrollBehaviorX, 'x');
        this.resetBoundaries(this.scale, scrollBehaviorY, 'y');
        // resetPosition
        var newX = this.getNewPos(origin.x, lastScale, scrollBehaviorX, true);
        var newY = this.getNewPos(origin.y, lastScale, scrollBehaviorY, true);
        if (scrollBehaviorX.currentPos !== Math.round(newX) ||
            scrollBehaviorY.currentPos !== Math.round(newY) ||
            this.scale !== this.lastTransformScale) {
            scrollerIns.scrollTo(newX, newY, this.scroll.options.bounceTime, undefined, {
                start: {
                    scale: this.lastTransformScale
                },
                end: {
                    scale: this.scale
                }
            });
        }
    };
    Zoom.prototype.resetBoundaries = function (scale, scrollBehavior, direction, extendValue) {
        var min = this.initScrollBoundary[direction][0];
        var max = this.initScrollBoundary[direction][1];
        var hasScroll = false;
        if (scale > 1) {
            var sideName = direction === 'x' ? 'width' : 'height';
            max =
                -this.scaleElementInitSize[sideName] * (scale - 1) -
                    this.initScrollBoundary[direction][1];
            hasScroll = true;
        }
        if (!isUndef(extendValue)) {
            max = Math.min(extendValue, max);
            min = Math.max(extendValue, min); // max & min & curValue is negative value
            hasScroll = !!(min || max);
        }
        scrollBehavior.minScrollPos = Math.floor(min);
        scrollBehavior.maxScrollPos = Math.floor(max);
        scrollBehavior.hasScroll = hasScroll;
    };
    Zoom.prototype.getNewPos = function (origin, lastScale, scrollBehavior, fixInBound) {
        var newPos = origin - origin * lastScale + scrollBehavior.startPos;
        if (fixInBound) {
            newPos = fixInboundValue(newPos, scrollBehavior.maxScrollPos, 0);
        }
        return Math.floor(newPos);
    };
    Zoom.prototype.scaleCure = function (scale) {
        var _a = this.zoomOpt, _b = _a.min, min = _b === void 0 ? 1 : _b, _c = _a.max, max = _c === void 0 ? 4 : _c;
        if (scale < min) {
            scale = 0.5 * min * Math.pow(2.0, scale / min);
        }
        else if (scale > max) {
            scale = 2.0 * max * Math.pow(0.5, max / scale);
        }
        return scale;
    };
    Zoom.prototype.fixInScaleLimit = function (scale) {
        var _a = this.zoomOpt, _b = _a.min, min = _b === void 0 ? 1 : _b, _c = _a.max, max = _c === void 0 ? 4 : _c;
        if (scale > max) {
            scale = max;
        }
        else if (scale < min) {
            scale = min;
        }
        return scale;
    };
    Zoom.prototype.registorHooks = function (hooks, name, handler) {
        hooks.on(name, handler, this);
        this.hooksFn.push([hooks, name, handler]);
    };
    Zoom.pluginName = 'zoom';
    return Zoom;
}());

var compatibleFeatures = {
    duplicateClick: function (_a) {
        var parentScroll = _a[0], childScroll = _a[1];
        // no need to make childScroll's click true
        if (parentScroll.options.click && childScroll.options.click) {
            childScroll.options.click = false;
        }
    },
    nestedScroll: function (scrollsPair) {
        var parentScroll = scrollsPair[0], childScroll = scrollsPair[1];
        var parentScrollX = parentScroll.options.scrollX;
        var parentScrollY = parentScroll.options.scrollY;
        var childScrollX = childScroll.options.scrollX;
        var childScrollY = childScroll.options.scrollY;
        // vertical nested in vertical scroll and horizontal nested in horizontal
        // otherwise, no need to handle.
        if (parentScrollX === childScrollX || parentScrollY === childScrollY) {
            scrollsPair.forEach(function (scroll, index) {
                var oppositeScroll = scrollsPair[(index + 1) % 2];
                scroll.on('beforeScrollStart', function () {
                    if (oppositeScroll.pending) {
                        oppositeScroll.stop();
                        oppositeScroll.resetPosition();
                    }
                    setupData(oppositeScroll);
                    oppositeScroll.disable();
                });
                scroll.on('touchEnd', function () {
                    oppositeScroll.enable();
                });
            });
            childScroll.on('scrollStart', function () {
                if (checkBeyondBoundary(childScroll)) {
                    childScroll.disable();
                    parentScroll.enable();
                }
            });
        }
    }
};
var NestedScroll = /** @class */ (function () {
    function NestedScroll(scroll) {
        var singleton = NestedScroll.nestedScroll;
        if (!(singleton instanceof NestedScroll)) {
            singleton = NestedScroll.nestedScroll = this;
            singleton.stores = [];
        }
        singleton.setup(scroll);
        singleton.addHooks(scroll);
        return singleton;
    }
    NestedScroll.prototype.setup = function (scroll) {
        this.appendBScroll(scroll);
        this.handleContainRelationship();
        this.handleCompatible();
    };
    NestedScroll.prototype.addHooks = function (scroll) {
        var _this = this;
        scroll.on('destroy', function () {
            _this.teardown(scroll);
        });
    };
    NestedScroll.prototype.teardown = function (scroll) {
        this.removeBScroll(scroll);
        this.handleContainRelationship();
        this.handleCompatible();
    };
    NestedScroll.prototype.appendBScroll = function (scroll) {
        this.stores.push(scroll);
    };
    NestedScroll.prototype.removeBScroll = function (scroll) {
        var index = this.stores.indexOf(scroll);
        if (index === -1)
            return;
        scroll.wrapper.isBScrollContainer = undefined;
        this.stores.splice(index, 1);
    };
    NestedScroll.prototype.handleContainRelationship = function () {
        // bs's length <= 1
        var stores = this.stores;
        if (stores.length <= 1) {
            // there is only a childBScroll left.
            if (stores[0] && stores[0].__parentInfo) {
                stores[0].__parentInfo = undefined;
            }
            return;
        }
        var outerBS;
        var outerBSWrapper;
        var innerBS;
        var innerBSWrapper;
        // Need two layers of "For loop" to calculate parent-child relationship
        for (var i = 0; i < stores.length; i++) {
            outerBS = stores[i];
            outerBSWrapper = outerBS.wrapper;
            for (var j = 0; j < stores.length; j++) {
                innerBS = stores[j];
                innerBSWrapper = innerBS.wrapper;
                // same bs
                if (outerBS === innerBS)
                    continue;
                // now start calculating
                if (!innerBSWrapper.contains(outerBSWrapper))
                    continue;
                // now innerBS contains outerBS
                // no parentInfo yet
                if (!outerBS.__parentInfo) {
                    outerBS.__parentInfo = {
                        parent: innerBS,
                        depth: calculateDepths(outerBSWrapper, innerBSWrapper)
                    };
                }
                else {
                    // has parentInfo already!
                    // just judge the "true" parent by depth
                    // we regard the latest node as parent, not the furthest
                    var currentDepths = calculateDepths(outerBSWrapper, innerBSWrapper);
                    var prevDepths = outerBS.__parentInfo.depth;
                    // refresh currentBS as parentScroll
                    if (prevDepths > currentDepths) {
                        outerBS.__parentInfo = {
                            parent: innerBS,
                            depth: currentDepths
                        };
                    }
                }
            }
        }
    };
    NestedScroll.prototype.handleCompatible = function () {
        var pairs = this.availableBScrolls();
        var keys = ['duplicateClick', 'nestedScroll'];
        pairs.forEach(function (pair) {
            keys.forEach(function (key) {
                compatibleFeatures[key](pair);
            });
        });
    };
    NestedScroll.prototype.availableBScrolls = function () {
        var ret = [];
        ret = this.stores
            .filter(function (bs) { return !!bs.__parentInfo; })
            .map(function (bs) { return [bs.__parentInfo.parent, bs]; });
        return ret;
    };
    NestedScroll.pluginName = 'nestedScroll';
    return NestedScroll;
}());
function calculateDepths(childNode, parentNode) {
    var depth = 0;
    var parent = childNode.parentNode;
    while (parent && parent !== parentNode) {
        depth++;
        parent = parent.parentNode;
    }
    return depth;
}
function checkBeyondBoundary(scroll) {
    var _a = hasScroll(scroll), hasHorizontalScroll = _a.hasHorizontalScroll, hasVerticalScroll = _a.hasVerticalScroll;
    var _b = scroll.scroller, scrollBehaviorX = _b.scrollBehaviorX, scrollBehaviorY = _b.scrollBehaviorY;
    var hasReachLeft = scroll.x >= scroll.minScrollX && scrollBehaviorX.movingDirection === -1;
    var hasReachRight = scroll.x <= scroll.maxScrollX && scrollBehaviorX.movingDirection === 1;
    var hasReachTop = scroll.y >= scroll.minScrollY && scrollBehaviorY.movingDirection === -1;
    var hasReachBottom = scroll.y <= scroll.maxScrollY && scrollBehaviorY.movingDirection === 1;
    if (hasVerticalScroll) {
        return hasReachTop || hasReachBottom;
    }
    else if (hasHorizontalScroll) {
        return hasReachLeft || hasReachRight;
    }
    return false;
}
function setupData(scroll) {
    var _a = hasScroll(scroll), hasHorizontalScroll = _a.hasHorizontalScroll, hasVerticalScroll = _a.hasVerticalScroll;
    var _b = scroll.scroller, actions = _b.actions, scrollBehaviorX = _b.scrollBehaviorX, scrollBehaviorY = _b.scrollBehaviorY;
    actions.startTime = +new Date();
    if (hasVerticalScroll) {
        scrollBehaviorY.startPos = scrollBehaviorY.currentPos;
    }
    else if (hasHorizontalScroll) {
        scrollBehaviorX.startPos = scrollBehaviorX.currentPos;
    }
}
function hasScroll(scroll) {
    return {
        hasHorizontalScroll: scroll.scroller.scrollBehaviorX.hasScroll,
        hasVerticalScroll: scroll.scroller.scrollBehaviorY.hasScroll
    };
}

var PRE_NUM = 10;
var POST_NUM = 30;
var IndexCalculator = /** @class */ (function () {
    function IndexCalculator(wrapperHeight, tombstoneHeight) {
        this.wrapperHeight = wrapperHeight;
        this.tombstoneHeight = tombstoneHeight;
        this.lastDirection = 1 /* DOWN */;
        this.lastPos = 0;
    }
    IndexCalculator.prototype.calculate = function (pos, list) {
        var offset = pos - this.lastPos;
        this.lastPos = pos;
        var direction = this.getDirection(offset);
        // important! start index is much more important than end index.
        var start = this.calculateIndex(0, pos, list);
        var end = this.calculateIndex(start, pos + this.wrapperHeight, list);
        if (direction === 1 /* DOWN */) {
            start -= PRE_NUM;
            end += POST_NUM;
        }
        else {
            start -= POST_NUM;
            end += PRE_NUM;
        }
        if (start < 0) {
            start = 0;
        }
        return {
            start: start,
            end: end
        };
    };
    IndexCalculator.prototype.getDirection = function (offset) {
        var direction;
        if (offset > 0) {
            direction = 1 /* DOWN */;
        }
        else if (offset < 0) {
            direction = 0 /* UP */;
        }
        else {
            return this.lastDirection;
        }
        this.lastDirection = direction;
        return direction;
    };
    IndexCalculator.prototype.calculateIndex = function (start, offset, list) {
        if (offset <= 0) {
            return start;
        }
        var i = start;
        var startPos = list[i] && list[i].pos !== -1 ? list[i].pos : 0;
        var lastPos = startPos;
        var tombstone = 0;
        while (i < list.length && list[i].pos < offset) {
            lastPos = list[i].pos;
            i++;
        }
        if (i === list.length) {
            tombstone = Math.floor((offset - lastPos) / this.tombstoneHeight);
        }
        i += tombstone;
        return i;
    };
    return IndexCalculator;
}());

var ListItem = /** @class */ (function () {
    function ListItem() {
        this.data = null;
        this.dom = null;
        this.tombstone = null;
        this.width = 0;
        this.height = 0;
        this.pos = 0;
    }
    return ListItem;
}());
var DataManager = /** @class */ (function () {
    function DataManager(list, fetchFn, onFetchFinish) {
        this.fetchFn = fetchFn;
        this.onFetchFinish = onFetchFinish;
        this.loadedNum = 0;
        this.fetching = false;
        this.hasMore = true;
        this.list = list || [];
    }
    DataManager.prototype.update = function (end) {
        return __awaiter(this, void 0, void 0, function () {
            var len;
            return __generator(this, function (_a) {
                if (!this.hasMore) {
                    end = Math.min(end, this.list.length);
                }
                // add data placeholder
                if (end > this.list.length) {
                    len = end - this.list.length;
                    this.addEmptyData(len);
                }
                // tslint:disable-next-line: no-floating-promises
                return [2 /*return*/, this.checkToFetch(end)];
            });
        });
    };
    DataManager.prototype.add = function (data) {
        for (var i = 0; i < data.length; i++) {
            if (!this.list[this.loadedNum]) {
                this.list[this.loadedNum] = { data: data[i] };
            }
            else {
                this.list[this.loadedNum] = __assign({}, this.list[this.loadedNum], { data: data[i] });
            }
            this.loadedNum++;
        }
        return this.list;
    };
    DataManager.prototype.addEmptyData = function (len) {
        for (var i = 0; i < len; i++) {
            this.list.push(new ListItem());
        }
        return this.list;
    };
    DataManager.prototype.fetch = function (len) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.fetching) {
                            return [2 /*return*/, []];
                        }
                        this.fetching = true;
                        return [4 /*yield*/, this.fetchFn(len)];
                    case 1:
                        data = _a.sent();
                        this.fetching = false;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    DataManager.prototype.checkToFetch = function (end) {
        return __awaiter(this, void 0, void 0, function () {
            var min, newData, currentEnd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasMore) {
                            return [2 /*return*/];
                        }
                        if (end <= this.loadedNum) {
                            return [2 /*return*/];
                        }
                        min = end - this.loadedNum;
                        return [4 /*yield*/, this.fetch(min)];
                    case 1:
                        newData = _a.sent();
                        if (newData instanceof Array && newData.length) {
                            this.add(newData);
                            currentEnd = this.onFetchFinish(this.list, true);
                            return [2 /*return*/, this.checkToFetch(currentEnd)];
                        }
                        else if (typeof newData === 'boolean' && newData === false) {
                            this.hasMore = false;
                            this.list.splice(this.loadedNum);
                            this.onFetchFinish(this.list, false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DataManager.prototype.getList = function () {
        return this.list;
    };
    return DataManager;
}());

var Tombstone = /** @class */ (function () {
    function Tombstone(create) {
        this.create = create;
        this.cached = [];
        this.width = 0;
        this.height = 0;
        this.initialed = false;
        this.getSize();
    }
    Tombstone.isTombstone = function (el) {
        if (el && el.classList) {
            return el.classList.contains('tombstone');
        }
        return false;
    };
    Tombstone.prototype.getSize = function () {
        if (!this.initialed) {
            var tombstone = this.create();
            tombstone.style.position = 'absolute';
            document.body.appendChild(tombstone);
            tombstone.style.display = '';
            this.height = tombstone.offsetHeight;
            this.width = tombstone.offsetWidth;
            document.body.removeChild(tombstone);
            this.cached.push(tombstone);
        }
    };
    Tombstone.prototype.getOne = function () {
        var tombstone = this.cached.pop();
        if (tombstone) {
            var tombstoneStyle = tombstone.style;
            tombstoneStyle.display = '';
            tombstoneStyle.opacity = '1';
            tombstoneStyle[style.transform] = '';
            tombstoneStyle[style.transition] = '';
            return tombstone;
        }
        return this.create();
    };
    Tombstone.prototype.recycle = function (tombstones) {
        for (var _i = 0, tombstones_1 = tombstones; _i < tombstones_1.length; _i++) {
            var tombstone = tombstones_1[_i];
            tombstone.style.display = 'none';
            this.cached.push(tombstone);
        }
        return this.cached;
    };
    Tombstone.prototype.recycleOne = function (tombstone) {
        this.cached.push(tombstone);
        return this.cached;
    };
    return Tombstone;
}());

var ANIMATION_DURATION_MS = 200;
var DomManager = /** @class */ (function () {
    function DomManager(content, renderFn, tombstone) {
        this.content = content;
        this.renderFn = renderFn;
        this.tombstone = tombstone;
        this.unusedDom = [];
        this.timers = [];
    }
    DomManager.prototype.update = function (list, start, end) {
        if (start >= list.length) {
            start = list.length - 1;
        }
        if (end > list.length) {
            end = list.length;
        }
        this.collectUnusedDom(list, start, end);
        this.createDom(list, start, end);
        this.cacheHeight(list, start, end);
        var _a = this.positionDom(list, start, end), startPos = _a.startPos, startDelta = _a.startDelta, endPos = _a.endPos;
        return {
            start: start,
            startPos: startPos,
            startDelta: startDelta,
            end: end,
            endPos: endPos
        };
    };
    DomManager.prototype.collectUnusedDom = function (list, start, end) {
        // TODO optimise
        for (var i = 0; i < list.length; i++) {
            if (i === start) {
                i = end - 1;
                continue;
            }
            if (list[i].dom) {
                var dom = list[i].dom;
                if (Tombstone.isTombstone(dom)) {
                    this.tombstone.recycleOne(dom);
                    dom.style.display = 'none';
                }
                else {
                    this.unusedDom.push(dom);
                }
                list[i].dom = null;
            }
        }
        return list;
    };
    DomManager.prototype.createDom = function (list, start, end) {
        for (var i = start; i < end; i++) {
            var dom = list[i].dom;
            var data = list[i].data;
            if (dom) {
                if (Tombstone.isTombstone(dom) && data) {
                    list[i].tombstone = dom;
                    list[i].dom = null;
                }
                else {
                    continue;
                }
            }
            dom = data
                ? this.renderFn(data, this.unusedDom.pop())
                : this.tombstone.getOne();
            dom.style.position = 'absolute';
            list[i].dom = dom;
            list[i].pos = -1;
            this.content.appendChild(dom);
        }
    };
    DomManager.prototype.cacheHeight = function (list, start, end) {
        for (var i = start; i < end; i++) {
            if (list[i].data && !list[i].height) {
                list[i].height = list[i].dom.offsetHeight;
            }
        }
    };
    DomManager.prototype.positionDom = function (list, start, end) {
        var _this = this;
        var tombstoneEles = [];
        var _a = this.getStartPos(list, start, end), startPos = _a.start, startDelta = _a.delta;
        var pos = startPos;
        // TODO transition
        for (var i = start; i < end; i++) {
            var tombstone = list[i].tombstone;
            if (tombstone) {
                var tombstoneStyle = tombstone.style;
                tombstoneStyle[style.transition] = cssVendor + "transform " + ANIMATION_DURATION_MS + "ms, opacity " + ANIMATION_DURATION_MS + "ms";
                tombstoneStyle[style.transform] = "translateY(" + pos + "px)";
                tombstoneStyle.opacity = '0';
                list[i].tombstone = null;
                tombstoneEles.push(tombstone);
            }
            if (list[i].dom && list[i].pos !== pos) {
                list[i].dom.style[style.transform] = "translateY(" + pos + "px)";
                list[i].pos = pos;
            }
            pos += list[i].height || this.tombstone.height;
        }
        var timerId = window.setTimeout(function () {
            _this.tombstone.recycle(tombstoneEles);
        }, ANIMATION_DURATION_MS);
        this.timers.push(timerId);
        return {
            startPos: startPos,
            startDelta: startDelta,
            endPos: pos
        };
    };
    DomManager.prototype.getStartPos = function (list, start, end) {
        if (list[start] && list[start].pos !== -1) {
            return {
                start: list[start].pos,
                delta: 0
            };
        }
        // TODO optimise
        var pos = list[0].pos === -1 ? 0 : list[0].pos;
        for (var i_1 = 0; i_1 < start; i_1++) {
            pos += list[i_1].height || this.tombstone.height;
        }
        var originPos = pos;
        var i;
        for (i = start; i < end; i++) {
            if (!Tombstone.isTombstone(list[i].dom) && list[i].pos !== -1) {
                pos = list[i].pos;
                break;
            }
        }
        var x = i;
        if (x < end) {
            while (x > start) {
                pos -= list[x - 1].height;
                x--;
            }
        }
        var delta = originPos - pos;
        return {
            start: pos,
            delta: delta
        };
    };
    DomManager.prototype.removeTombstone = function () {
        var tombstones = this.content.querySelectorAll('.tombstone');
        for (var i = tombstones.length - 1; i >= 0; i--) {
            this.content.removeChild(tombstones[i]);
        }
    };
    DomManager.prototype.destroy = function () {
        this.removeTombstone();
        this.timers.forEach(function (id) {
            clearTimeout(id);
        });
    };
    return DomManager;
}());

var EXTRA_SCROLL_Y = -2000;
var InfinityScroll = /** @class */ (function () {
    function InfinityScroll(bscroll) {
        this.bscroll = bscroll;
        this.start = 0;
        this.end = 0;
        if (bscroll.options.infinity) {
            this.bscroll.options.probeType = 3 /* Realtime */;
            this.bscroll.scroller.scrollBehaviorY.hasScroll = true;
            this.bscroll.scroller.scrollBehaviorY.maxScrollPos = EXTRA_SCROLL_Y;
            this.init(bscroll.options.infinity);
        }
    }
    InfinityScroll.prototype.init = function (options) {
        var fetchFn = options.fetch, renderFn = options.render, createTombstoneFn = options.createTombstone;
        this.tombstone = new Tombstone(createTombstoneFn);
        this.indexCalculator = new IndexCalculator(this.bscroll.scroller.scrollBehaviorY.wrapperSize, this.tombstone.height);
        this.domManager = new DomManager(this.bscroll.scroller.content, renderFn, this.tombstone);
        this.dataManager = new DataManager([], fetchFn, this.onFetchFinish.bind(this));
        this.bscroll.on('destroy', this.destroy, this);
        this.bscroll.on('scroll', this.update, this);
        this.update({ y: 0 });
    };
    InfinityScroll.prototype.update = function (pos) {
        var position = Math.round(-pos.y);
        // important! calculate start/end index to render
        var _a = this.indexCalculator.calculate(position, this.dataManager.getList()), start = _a.start, end = _a.end;
        this.start = start;
        this.end = end;
        // tslint:disable-next-line: no-floating-promises
        this.dataManager.update(end);
        this.updateDom(this.dataManager.getList());
    };
    InfinityScroll.prototype.onFetchFinish = function (list, hasMore) {
        var end = this.updateDom(list).end;
        if (!hasMore) {
            this.domManager.removeTombstone();
            this.bscroll.scroller.animater.stop();
            this.bscroll.resetPosition();
        }
        // tslint:disable-next-line: no-floating-promises
        return end;
    };
    InfinityScroll.prototype.updateDom = function (list) {
        var _a = this.domManager.update(list, this.start, this.end), end = _a.end, startPos = _a.startPos, endPos = _a.endPos, startDelta = _a.startDelta;
        if (startDelta) {
            this.bscroll.minScrollY = startDelta;
        }
        if (endPos > this.bscroll.maxScrollY) {
            this.bscroll.maxScrollY = -(endPos - this.bscroll.scroller.scrollBehaviorY.wrapperSize);
        }
        return {
            end: end,
            startPos: startPos,
            endPos: endPos
        };
    };
    InfinityScroll.prototype.destroy = function () {
        var content = this.bscroll.scroller.content;
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
        this.domManager.destroy();
        this.bscroll.off('scroll', this.update);
        this.bscroll.off('destroy', this.destroy);
    };
    InfinityScroll.pluginName = 'infinity';
    return InfinityScroll;
}());

BScroll.use(MouseWheel)
    .use(ObserveDOM)
    .use(PullDown)
    .use(PullUp)
    .use(ScrollBar)
    .use(Slide)
    .use(Wheel)
    .use(Zoom)
    .use(NestedScroll)
    .use(InfinityScroll);

export default BScroll;
