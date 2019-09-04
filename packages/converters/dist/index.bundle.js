parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"wkDH":[function(require,module,exports) {
"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),function(t){t[t.Before=-1]="Before",t[t.Equal=0]="Equal",t[t.After=1]="After"}(t=exports.DateComparison||(exports.DateComparison={}));var e=function(){function e(t,e,r){this._day=t,this._month=e,this._year=r}return e.prototype.compareDate=function(e,r,o){return this._year>o?t.After:this._year<o?t.Before:this._month>r?t.After:this._month<r?t.Before:this._day>e?t.After:this._day<e?t.Before:t.Equal},e.prototype.isEqualDate=function(e,r,o){return this.compareDate(e,r,o)===t.Equal},e.prototype.toArray=function(){return[this._day,this._month,this._year]},e}();exports.default=e;
},{}],"0DZf":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(o,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,o){t.__proto__=o}||function(t,o){for(var r in o)o.hasOwnProperty(r)&&(t[r]=o[r])})(o,r)};return function(o,r){function e(){this.constructor=o}t(o,r),o.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}}(),o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var r=o(require("./Astronomy")),e=o(require("./BaseDate")),a=o(require("./LunarDate")),n=2299160,u=function(o){function e(){return null!==o&&o.apply(this,arguments)||this}return t(e,o),e.fromJulianDays=function(t){var o=0,r=0;if(t>n){var a=t+32044;o=Math.floor((4*a+3)/146097),r=a-Math.floor(146097*o/4)}else r=t+32082;var u=Math.floor((4*r+3)/1461),i=r-Math.floor(1461*u/4),f=Math.floor((5*i+2)/153);return new e(i-Math.floor((153*f+2)/5)+1,f+3-12*Math.floor(f/10),100*o+u-4800+Math.floor(f/10))},e.prototype.toJulianDays=function(){var t=Math.floor((14-this._month)/12),o=this._year+4800-t,r=this._month+12*t-3,e=this._day+Math.floor((153*r+2)/5)+365*o+Math.floor(o/4),a=e-Math.floor(o/100)+Math.floor(o/400)-32045;return a>n?a:e-32083},e.prototype.toLunarDate=function(t){var o=this.toJulianDays(),e=new r.default(t),n=Math.floor((o-2415021.076998695)/29.530588853),u=e.getNewMoonDay(n+1);u>o&&(u=e.getNewMoonDay(n));var i=e.getLunarMonth11(this._year),f=i,h=this._year;i>=u?i=e.getLunarMonth11(this._year-1):(h=this._year+1,f=e.getLunarMonth11(this._year+1));var s=o-u+1,l=Math.floor((u-i)/29),y=!1,_=l+11;if(f-i>365){var p=e.getLeapMonthOffset(i);l>=p&&(_=l+10,l==p&&(y=!0))}return _>12&&(_-=12),_>=11&&l<4&&(h-=1),new a.default(s,_,h,y)},e.prototype.toSexagenaryDateTime=function(t,o){return this.toLunarDate(t).toSexagenaryDateTime(t,o)},e}(e.default);exports.default=u;
},{"./Astronomy":"6txX","./BaseDate":"wkDH","./LunarDate":"cSkH"}],"6txX":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e=t(require("./SolarDate")),n=function(){function t(t){this.timeZone=t}return t.prototype.getNewMoonDay=function(t){var e=t/1236.85,n=e*e,o=n*e,a=Math.PI/180,i=2415020.75933+29.53058868*t+1178e-7*n-1.55e-7*o+33e-5*Math.sin((166.56+132.87*e-.009173*n)*a),h=359.2242+29.10535608*t-333e-7*n-347e-8*o,r=306.0253+385.81691806*t+.0107306*n+1236e-8*o,s=21.2964+390.67050646*t-.0016528*n-239e-8*o,M=(.1734-393e-6*e)*Math.sin(a*h)+.0021*Math.sin(2*a*h)-.4068*Math.sin(a*r)+.0161*Math.sin(2*a*r)-4e-4*Math.sin(3*a*r)+.0104*Math.sin(2*a*s)-.0051*Math.sin(a*(h+r))-.0074*Math.sin(a*(h-r))+4e-4*Math.sin(a*(2*s+h))-4e-4*Math.sin(a*(2*s-h))-6e-4*Math.sin(a*(2*s+r))+.001*Math.sin(a*(2*s-r))+5e-4*Math.sin(a*(2*r+h)),u=e<-11?.001+839e-6*e+2261e-7*n-845e-8*o-8.1e-8*e*o:265e-6*e-278e-6+262e-6*n;return Math.floor(i+M-u+.5+this.timeZone/24)},t.prototype.getSunLongitude=function(t){var e=(t-.5-this.timeZone/24-2451545)/36525,n=e*e,o=Math.PI/180,a=357.5291+35999.0503*e-1559e-7*n-4.8e-7*e*n,i=(280.46645+36000.76983*e+3032e-7*n+((1.9146-.004817*e-14e-6*n)*Math.sin(o*a)+(.019993-101e-6*e)*Math.sin(2*o*a)+29e-5*Math.sin(3*o*a)))*o,h=i-2*Math.PI*Math.floor(i/(2*Math.PI));return Math.floor(h/Math.PI*6)},t.prototype.getLunarMonth11=function(t){var n=new e.default(31,12,t).toJulianDays()-2415021.076998695,o=Math.floor(n/29.530588853),a=this.getNewMoonDay(o);return this.getSunLongitude(a)>=9?this.getNewMoonDay(o-1):a},t.prototype.getLeapMonthOffset=function(t){var e=Math.floor((t-2415021.076998695)/29.530588853+.5),n=0,o=1,a=0;do{n=a,o+=1,a=this.getSunLongitude(this.getNewMoonDay(e+o))}while(a!=n&&o<14);return o-1},t}();exports.default=n;
},{"./SolarDate":"0DZf"}],"9H7P":[function(require,module,exports) {
module.exports={default:{stems:["jia","yi","bing","ding","wu","ji","geng","xin","ren","gui"],branches:["rat","ox","tiger","rabbit","dragon","snake","horse","goat","monkey","rooster","dog","pig"]},ko:{stems:["갑","을","병","정","무","기","경","신","임","계"],branches:["자","축","인","묘","진","사","오","미","신","유","술","해"]},vi:{stems:["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"],branches:["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"]},zh:{stems:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],branches:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]}};
},{}],"X51N":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var e,n,o,i=t(require("./locales.json"));!function(t){t[t.Jia=0]="Jia",t[t.Yi=1]="Yi",t[t.Bing=2]="Bing",t[t.Ding=3]="Ding",t[t.Wu=4]="Wu",t[t.Ji=5]="Ji",t[t.Geng=6]="Geng",t[t.Xin=7]="Xin",t[t.Ren=8]="Ren",t[t.Gui=9]="Gui"}(e=exports.Stem||(exports.Stem={})),function(t){t[t.Rat=0]="Rat",t[t.Ox=1]="Ox",t[t.Tiger=2]="Tiger",t[t.Rabbit=3]="Rabbit",t[t.Dragon=4]="Dragon",t[t.Snake=5]="Snake",t[t.Horse=6]="Horse",t[t.Goat=7]="Goat",t[t.Monkey=8]="Monkey",t[t.Rooster=9]="Rooster",t[t.Dog=10]="Dog",t[t.Pig=11]="Pig"}(n=exports.Branch||(exports.Branch={})),function(t){t.Default="default",t.Ko="ko",t.Vi="vi",t.Zh="zh"}(o=exports.Locales||(exports.Locales={}));var r=function(){function t(t){var e=t.stem,n=t.branch;this._stem=e,this._branch=n}return t.prototype.toObject=function(){return{stem:this._stem,branch:this._branch}},t.prototype.toString=function(t){void 0===t&&(t=o.Default);var e=i.default[t]||{},n=e.stems,r=void 0===n?null:n,a=e.branches,s=void 0===a?null:a;if(null==r||null==s)return"";var u=r[this._stem],l=s[this._branch];return t===o.Default?[u,l].join("-"):[u,l].join(" ")},t}();exports.default=r;
},{"./locales.json":"9H7P"}],"/I3v":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./Sexagenary"),r=function(){function r(t,r,o,e){this._hour=t,this._day=r,this._month=o,this._year=e}return r.prototype.toObject=function(){return{hour:this._hour,day:this._day,month:this._month,year:this._year}},r.prototype.toStringsObject=function(r){return void 0===r&&(r=t.Locales.Default),{hour:this._hour.toString(r),day:this._day.toString(r),month:this._month.toString(r),year:this._year.toString(r)}},r}();exports.default=r;
},{"./Sexagenary":"X51N"}],"SfeM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./Sexagenary");exports.Sexagenary=e.default,exports.Locales=e.Locales;var a=require("./SexagenaryDateTime");exports.SexagenaryDateTime=a.default;
},{"./Sexagenary":"X51N","./SexagenaryDateTime":"/I3v"}],"cSkH":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),e=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("./Astronomy")),n=e(require("./BaseDate")),a=e(require("./SolarDate")),o=require("./Sexagenary"),i=function(e){function n(t,r,n,a){var o=e.call(this,t,r,n)||this;return o._isLeapMonth=a,o}return t(n,e),Object.defineProperty(n.prototype,"isLeapMonth",{get:function(){return this._isLeapMonth},enumerable:!0,configurable:!0}),n.prototype.toSolarDate=function(t){var e=new r.default(t),n=0,o=0,i=0;this._month<11?(n=e.getLunarMonth11(this._year-1),o=e.getLunarMonth11(this._year),i=this._month+1):(n=e.getLunarMonth11(this._year),o=e.getLunarMonth11(this._year+1),i=this._month-11);var s=Math.floor(.5+(n-2415021.076998695)/29.530588853),h=0,u=0;if(o-n>365){if((u=(h=e.getLeapMonthOffset(n))-2)<0&&(u+=12),this._isLeapMonth&&this._month!=u)return new a.default(0,0,0);(this._isLeapMonth||i>=h)&&(i+=1)}var _=e.getNewMoonDay(s+i);return a.default.fromJulianDays(_+this._day-1)},n.prototype.toSexagenaryDateTime=function(t,e){var r=this.toSolarDate(t).toJulianDays(),n=new o.Sexagenary({stem:(this._year+6)%10,branch:(this._year+8)%12}),a=new o.Sexagenary({stem:(12*this._year+this._month+3)%10,branch:(this._month+1)%12}),i=new o.Sexagenary({stem:(r+9)%10,branch:(r+1)%12}),s=e[0],h=e[1],u=Math.floor((s+h/60+1)%24/2),_=new o.Sexagenary({stem:((r+9)%5*2+u)%10,branch:u});return new o.SexagenaryDateTime(_,i,a,n)},n}(n.default);exports.default=i;
},{"./Astronomy":"6txX","./BaseDate":"wkDH","./SolarDate":"0DZf","./Sexagenary":"SfeM"}],"Focm":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=e(require("./src/LunarDate"));exports.LunarDate=r.default;var a=require("./src/Sexagenary");exports.Sexagenary=a.Sexagenary,exports.SexagenaryDateTime=a.SexagenaryDateTime;var t=e(require("./src/SolarDate"));exports.SolarDate=t.default;
},{"./src/LunarDate":"cSkH","./src/Sexagenary":"SfeM","./src/SolarDate":"0DZf"}]},{},["Focm"], null)
//# sourceMappingURL=/index.bundle.js.map