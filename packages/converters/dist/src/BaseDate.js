"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateComparison;
(function (DateComparison) {
    DateComparison[DateComparison["Before"] = -1] = "Before";
    DateComparison[DateComparison["Equal"] = 0] = "Equal";
    DateComparison[DateComparison["After"] = 1] = "After";
})(DateComparison = exports.DateComparison || (exports.DateComparison = {}));
var BaseDate = /** @class */ (function () {
    function BaseDate(day, month, year) {
        this._day = day;
        this._month = month;
        this._year = year;
    }
    BaseDate.prototype.compareDate = function (day, month, year) {
        if (this._year > year)
            return DateComparison.After;
        if (this._year < year)
            return DateComparison.Before;
        // Same years
        if (this._month > month)
            return DateComparison.After;
        if (this._month < month)
            return DateComparison.Before;
        // Same months
        if (this._day > day)
            return DateComparison.After;
        if (this._day < day)
            return DateComparison.Before;
        return DateComparison.Equal;
    };
    BaseDate.prototype.isEqualDate = function (day, month, year) {
        return this.compareDate(day, month, year) === DateComparison.Equal;
    };
    BaseDate.prototype.toArray = function () {
        return [this._day, this._month, this._year];
    };
    return BaseDate;
}());
exports.default = BaseDate;
