"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Astronomy_1 = __importDefault(require("./Astronomy"));
var BaseDate_1 = __importDefault(require("./BaseDate"));
var SolarDate_1 = __importDefault(require("./SolarDate"));
var Sexagenary_1 = __importDefault(require("./Sexagenary"));
var LunarDate = /** @class */ (function (_super) {
    __extends(LunarDate, _super);
    function LunarDate(day, month, year, isLeapMonth) {
        var _this = _super.call(this, day, month, year) || this;
        _this._isLeapMonth = isLeapMonth;
        return _this;
    }
    Object.defineProperty(LunarDate.prototype, "isLeapMonth", {
        get: function () {
            return this._isLeapMonth;
        },
        enumerable: true,
        configurable: true
    });
    LunarDate.prototype.toSolarDate = function (timeZone) {
        var astronomy = new Astronomy_1.default(timeZone);
        var a11 = 0;
        var b11 = 0;
        var offset = 0;
        if (this._month < 11) {
            a11 = astronomy.getLunarMonth11(this._year - 1);
            b11 = astronomy.getLunarMonth11(this._year);
            offset = this._month + 1;
        }
        else {
            a11 = astronomy.getLunarMonth11(this._year);
            b11 = astronomy.getLunarMonth11(this._year + 1);
            offset = this._month - 11;
        }
        var newMoonOrder = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
        var leapOffset = 0;
        var leapMonth = 0;
        if (b11 - a11 > 365) {
            leapOffset = astronomy.getLeapMonthOffset(a11);
            leapMonth = leapOffset - 2;
            if (leapMonth < 0)
                leapMonth += 12;
            if (this._isLeapMonth && this._month != leapMonth)
                return new SolarDate_1.default(0, 0, 0);
            if (this._isLeapMonth || offset >= leapOffset)
                offset += 1;
        }
        var monthStart = astronomy.getNewMoonDay(newMoonOrder + offset);
        return SolarDate_1.default.fromJulianDays(monthStart + this._day - 1);
    };
    LunarDate.prototype.toSexagenaries = function (timeZone, solarTime) {
        var julianDays = this.toSolarDate(timeZone).toJulianDays();
        var year = new Sexagenary_1.default({
            stem: (this._year + 6) % 10,
            branch: (this._year + 8) % 12,
        });
        var month = new Sexagenary_1.default({
            stem: (this._year * 12 + this._month + 3) % 10,
            branch: (this._month + 1) % 12,
        });
        var day = new Sexagenary_1.default({
            stem: (julianDays + 9) % 10,
            branch: (julianDays + 1) % 12,
        });
        var solarHour = solarTime[0], solarMinute = solarTime[1];
        var lunarHour = Math.floor(((solarHour + solarMinute / 60 + 1) % 24) / 2);
        var hour = new Sexagenary_1.default({
            stem: (((julianDays + 9) % 5) * 2 + lunarHour) % 10,
            branch: lunarHour,
        });
        return { hour: hour, day: day, month: month, year: year };
    };
    return LunarDate;
}(BaseDate_1.default));
exports.default = LunarDate;
