"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SolarDate_1 = __importDefault(require("./SolarDate"));
var Astronomy = /** @class */ (function () {
    function Astronomy(timeZone) {
        this.timeZone = timeZone;
    }
    /**
     * Compute the Julian days value of new moon at the given order.
     * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
     */
    Astronomy.prototype.getNewMoonDay = function (order) {
        var T = order / 1236.85; // Time in Julian centuries from 1900 January 0.5
        var T2 = T * T;
        var T3 = T2 * T;
        var radian = Math.PI / 180;
        // Mean new moon days
        var julianDays = 2415020.75933 +
            29.53058868 * order +
            0.0001178 * T2 -
            0.000000155 * T3 +
            0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * radian);
        // Sun's mean anomaly
        var M = 359.2242 + 29.10535608 * order - 0.0000333 * T2 - 0.00000347 * T3;
        // Moon's mean anomaly
        var Mpr = 306.0253 + 385.81691806 * order + 0.0107306 * T2 + 0.00001236 * T3;
        // Moon's argument of latitude
        var F = 21.2964 + 390.67050646 * order - 0.0016528 * T2 - 0.00000239 * T3;
        var C = (0.1734 - 0.000393 * T) * Math.sin(radian * M) +
            0.0021 * Math.sin(radian * 2 * M) -
            0.4068 * Math.sin(radian * Mpr) +
            0.0161 * Math.sin(radian * 2 * Mpr) -
            0.0004 * Math.sin(radian * 3 * Mpr) +
            0.0104 * Math.sin(radian * 2 * F) -
            0.0051 * Math.sin(radian * (M + Mpr)) -
            0.0074 * Math.sin(radian * (M - Mpr)) +
            0.0004 * Math.sin(radian * (2 * F + M)) -
            0.0004 * Math.sin(radian * (2 * F - M)) -
            0.0006 * Math.sin(radian * (2 * F + Mpr)) +
            0.001 * Math.sin(radian * (2 * F - Mpr)) +
            0.0005 * Math.sin(radian * (2 * Mpr + M));
        var delta = T < -11
            ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
            : -0.000278 + 0.000265 * T + 0.000262 * T2;
        return Math.floor(julianDays + C - delta + 0.5 + this.timeZone / 24);
    };
    /**
     * Compute sun position at midnight of the day with the given Julian day number.
     * The function returns a number between 0 and 11.
     * From the day after March equinox and the 1st major term after March equinox, 0 is returned.
     * After that, return 1, 2, 3 ...
     */
    Astronomy.prototype.getSunLongitude = function (dayNumber) {
        // Time in Julian centuries from 2000-01-01 12:00:00 GMT
        var T = (dayNumber - 0.5 - this.timeZone / 24 - 2451545.0) / 36525;
        var T2 = T * T;
        var radian = Math.PI / 180;
        // Mean anomaly in degree
        var M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
        // Mean longitude, degree
        var L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
        var DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(radian * M) +
            (0.019993 - 0.000101 * T) * Math.sin(radian * 2 * M) +
            0.00029 * Math.sin(radian * 3 * M);
        // True longitude in degree
        var L1 = (L0 + DL) * radian;
        // Normalize to (0, 2*PI)
        var L = L1 - Math.PI * 2 * Math.floor(L1 / (Math.PI * 2));
        return Math.floor((L / Math.PI) * 6);
    };
    /**
     * Find the day that starts the luner month 11 of the given year for the given time zone
     */
    Astronomy.prototype.getLunarMonth11 = function (year) {
        var solarDate = new SolarDate_1.default(31, 12, year);
        var off = solarDate.toJulianDays() - 2415021.076998695;
        var order = Math.floor(off / 29.530588853);
        var newMoonDay = this.getNewMoonDay(order);
        var sunLong = this.getSunLongitude(newMoonDay);
        if (sunLong >= 9)
            return this.getNewMoonDay(order - 1);
        return newMoonDay;
    };
    /**
     * Find the index of the leap month after the month starting on the day of 11th lunar month.
     */
    Astronomy.prototype.getLeapMonthOffset = function (lunarMonth11) {
        var order = Math.floor((lunarMonth11 - 2415021.076998695) / 29.530588853 + 0.5);
        // We start with the month following lunar month 11
        var last = 0;
        var counter = 1;
        var arc = 0;
        do {
            last = arc;
            counter += 1;
            arc = this.getSunLongitude(this.getNewMoonDay(order + counter));
        } while (arc != last && counter < 14);
        return counter - 1;
    };
    return Astronomy;
}());
exports.default = Astronomy;
