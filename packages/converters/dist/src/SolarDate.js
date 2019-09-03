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
var LunarDate_1 = __importDefault(require("./LunarDate"));
var JULIAN_CALENDAR_EPOCH = 2299160; // Oct 14, 1582 AD
var SolarDate = /** @class */ (function (_super) {
    __extends(SolarDate, _super);
    function SolarDate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Convert Julian days number into a SolarDate
     * Formula at: https://www.tondering.dk/claus/cal/julperiod.php#formula
     */
    SolarDate.fromJulianDays = function (julianDays) {
        var b = 0;
        var c = 0;
        if (julianDays > JULIAN_CALENDAR_EPOCH) {
            // The day is in Gregorian Calendar
            var a = julianDays + 32044;
            b = Math.floor((4 * a + 3) / 146097);
            c = a - Math.floor((b * 146097) / 4);
        }
        else {
            // The day is in Julian Calendar
            c = julianDays + 32082;
        }
        var d = Math.floor((4 * c + 3) / 1461);
        var e = c - Math.floor((1461 * d) / 4);
        var m = Math.floor((5 * e + 2) / 153);
        var day = e - Math.floor((153 * m + 2) / 5) + 1;
        var month = m + 3 - 12 * Math.floor(m / 10);
        var year = b * 100 + d - 4800 + Math.floor(m / 10);
        return new SolarDate(day, month, year);
    };
    /**
     * Calculate Julian days number of self
     * i.e., the number of days between 01/01/4713 BC (Julian calendar) and dd/mm/yyyy.
     * Formula at: https://www.tondering.dk/claus/cal/julperiod.php#formula
     */
    SolarDate.prototype.toJulianDays = function () {
        var a = Math.floor((14 - this._month) / 12);
        var y = this._year + 4800 - a;
        var m = this._month + 12 * a - 3;
        var cached = this._day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4);
        var julianDays = cached - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        // Date in Gregorian calendar
        if (julianDays > JULIAN_CALENDAR_EPOCH)
            return julianDays;
        // Date in Julian calendar
        return cached - 32083;
    };
    SolarDate.prototype.toLunarDate = function (timeZone) {
        var julianDays = this.toJulianDays();
        var astronomy = new Astronomy_1.default(timeZone);
        var newMoon = Math.floor((julianDays - 2415021.076998695) / 29.530588853);
        var monthStart = astronomy.getNewMoonDay(newMoon + 1);
        if (monthStart > julianDays)
            monthStart = astronomy.getNewMoonDay(newMoon);
        var a11 = astronomy.getLunarMonth11(this._year);
        var b11 = a11;
        var lunarYear = this._year;
        if (a11 >= monthStart) {
            a11 = astronomy.getLunarMonth11(this._year - 1);
        }
        else {
            lunarYear = this._year + 1;
            b11 = astronomy.getLunarMonth11(this._year + 1);
        }
        var lunarDay = julianDays - monthStart + 1;
        var diff = Math.floor((monthStart - a11) / 29);
        var isLeapMonth = false;
        var lunarMonth = diff + 11;
        if (b11 - a11 > 365) {
            var leapMonthDiff = astronomy.getLeapMonthOffset(a11);
            if (diff >= leapMonthDiff) {
                lunarMonth = diff + 10;
                if (diff == leapMonthDiff)
                    isLeapMonth = true;
            }
        }
        if (lunarMonth > 12)
            lunarMonth = lunarMonth - 12;
        if (lunarMonth >= 11 && diff < 4)
            lunarYear -= 1;
        return new LunarDate_1.default(lunarDay, lunarMonth, lunarYear, isLeapMonth);
    };
    SolarDate.prototype.toSexagenaries = function (timeZone, solarTime) {
        var lunarDate = this.toLunarDate(timeZone);
        return lunarDate.toSexagenaries(timeZone, solarTime);
    };
    return SolarDate;
}(BaseDate_1.default));
exports.default = SolarDate;
