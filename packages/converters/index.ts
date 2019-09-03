/**
 * Copyright (c) 2006 Ho Ngoc Duc. All Rights Reserved.
 * Astronomical algorithms from the book "Astronomical Algorithms" by Jean Meeus, 1998
 * https://informatik.uni-leipzig.de/~duc/amlich/calrules_en.html
 *
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice and appropriate documentation appears in all copies.
 *
 * Ethan N. converts to TypeScript based on original codebase here:
 * https://informatik.uni-leipzig.de/~duc/amlich/amlich-aa98.js
 */

interface BaseDate {
  day: number;
  month: number;
  year: number;
}

interface SolarDateTime extends BaseDate {
  hour: number;
  timeZone: number;
}

interface LunarDateTime extends BaseDate {
  hour: number;
  isLeapMonth: boolean;
}

enum Branch {
  Rat = 0,
  Ox,
  Tiger,
  Rabbit,
  Dragon,
  Snake,
  Horse,
  Goat,
  Monkey,
  Rooster,
  Dog,
  Pig,
}

enum Stem {
  Jia = 0,
  Yi,
  Bing,
  Ding,
  Wu,
  Ji,
  Geng,
  Xin,
  Ren,
  Gui,
}

interface SexagenaryPair {
  branch: Branch;
  stem: Stem;
}

export const BRANCHES_MAPPING = [
  "tys",
  "suu",
  "dan",
  "mao",
  "thin",
  "tyj",
  "ngo",
  "mui",
  "than",
  "dau",
  "tuat",
  "hoi",
];

export const STEMS_MAPPING = [
  "giap",
  "at",
  "binh",
  "dinh",
  "mau",
  "ky",
  "canh",
  "tan",
  "nham",
  "quy",
];

const JULIUS_DAY_EPOCH = 2299160;

/**
 * Compute the (integral) Julian day number of day dd/mm/yyyy, i.e., the number
 * of days between 1/1/4713 BC (Julian calendar) and dd/mm/yyyy.
 * Formula from http://www.tondering.dk/claus/calendar.html
 */
function calculateJuliusDayFromDate({ day, month, year }: BaseDate): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  let jd =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  if (jd < JULIUS_DAY_EPOCH + 1) jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  return jd;
}

/**
 * Convert a Julian day number to day/month/year. Parameter jd is an integer
 */
function convertJuliusDayToDate(jd: number): BaseDate {
  let a = 0;
  let b = 0;
  let c = 0;

  if (jd > JULIUS_DAY_EPOCH) {
    // After 5/10/1582, Gregorian calendar
    a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }

  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = b * 100 + d - 4800 + Math.floor(m / 10);
  return { day, month, year };
}

/**
 * Compute the time of the k-th new moon after the new moon of 1/1/1900 13:52 UCT
 * (measured as the number of days since 1/1/4713 BC noon UCT,
 * e.g., 2451545.125 is 1/1/2000 15:00 UTC).
 * Returns a floating number, e.g., 2415079.9758617813 for k=2 or 2414961.935157746 for k=-2
 * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
 *
 * Then compute the day of the k-th new moon in the given time zone.
 * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00
 */
function computeNewMoonDay(k: number, timeZone: number): number {
  const T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = Math.PI / 180;

  // Mean new moon
  const Jd1 =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T2 -
    0.000000155 * T3 +
    0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

  // Sun's mean anomaly
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;

  // Moon's mean anomaly
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;

  // Moon's argument of latitude
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 =
    (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 =
    C1 -
    0.0074 * Math.sin(dr * (M - Mpr)) +
    0.0004 * Math.sin(dr * (2 * F + M));
  C1 =
    C1 -
    0.0004 * Math.sin(dr * (2 * F - M)) -
    0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 =
    C1 +
    0.001 * Math.sin(dr * (2 * F - Mpr)) +
    0.0005 * Math.sin(dr * (2 * Mpr + M));

  let deltaT = 0;
  if (T < -11)
    deltaT =
      0.001 +
      0.000839 * T +
      0.0002261 * T2 -
      0.00000845 * T3 -
      0.000000081 * T * T3;
  else deltaT = -0.000278 + 0.000265 * T + 0.000262 * T2;

  return Math.floor(Jd1 + C1 - deltaT + 0.5 + timeZone / 24);
}

/**
 * Compute the longitude of the sun at any time.
 * Parameter: floating number jdn, the number of days since 1/1/4713 BC noon
 * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
 *
 * Then compute sun position at midnight of the day with the given Julian day number.
 * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00.
 * The function returns a number between 0 and 11.
 * From the day after March equinox and the 1st major term after March equinox, 0 is returned.
 * After that, return 1, 2, 3 ...
 */
function computeSunLongitude(dayNumber: number, timeZone: number): number {
  const jdn = dayNumber - 0.5 - timeZone / 24;
  const T = (jdn - 2451545) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
  const T2 = T * T;
  const dr = Math.PI / 180; // degree to radian

  // mean anomaly, degree
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL +=
    (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) +
    0.00029 * Math.sin(dr * 3 * M);

  let L = L0 + DL; // true longitude, degree
  L *= dr;
  L -= Math.PI * 2 * Math.floor(L / (Math.PI * 2)); // Normalize to (0, 2*Math.PI)
  return Math.floor((L / Math.PI) * 6);
}

/* Find the day that starts the luner month 11 of the given year for the given time zone */
function getLunarMonth11(year: number, timeZone: number): number {
  // const off =
  //   calculateJuliusDayFromDate({ day: 31, month: 12, year: year }) -
  //   2415021.076998695;
  const off =
    calculateJuliusDayFromDate({ day: 31, month: 12, year: year }) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = computeNewMoonDay(k, timeZone);
  const sunLong = computeSunLongitude(nm, timeZone); // sun longitude at local midnight
  if (sunLong >= 9) nm = computeNewMoonDay(k - 1, timeZone);
  return nm;
}

/* Find the index of the leap month after the month starting on the day a11. */
function computeLeapMonthOffset(a11: number, timeZone: number): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1; // We start with the month following lunar month 11
  let arc = computeSunLongitude(computeNewMoonDay(k + i, timeZone), timeZone);

  do {
    last = arc;
    i += 1;
    arc = computeSunLongitude(computeNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);

  return i - 1;
}

/**
 * Convert solar time hh/dd/mm/yyyy to the corresponding lunar date
 */
export function convertSolarToLunar(
  solarDateTime: SolarDateTime
): LunarDateTime {
  const { day, hour, month, year, timeZone } = solarDateTime;
  const dayNumber = calculateJuliusDayFromDate({ day, month, year });
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = computeNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) monthStart = computeNewMoonDay(k, timeZone);

  let a11 = getLunarMonth11(year, timeZone);
  let b11 = a11;
  let lunarYear = 0;

  if (a11 >= monthStart) {
    lunarYear = year;
    a11 = getLunarMonth11(year - 1, timeZone);
  } else {
    lunarYear = year + 1;
    b11 = getLunarMonth11(year + 1, timeZone);
  }

  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let lunarLeap = false;
  let lunarMonth = diff + 11;

  if (b11 - a11 > 365) {
    const leapMonthDiff = computeLeapMonthOffset(a11, timeZone);

    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = true;
    }
  }

  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

  const lunarHour = Math.floor(((hour + 1) % 24) / 2);

  return {
    day: lunarDay,
    hour: lunarHour,
    isLeapMonth: lunarLeap,
    month: lunarMonth,
    year: lunarYear,
  };
}

export function convertSolarToSexagenary(solar: SolarDateTime) {
  const dayNumber = calculateJuliusDayFromDate(solar);
  const lunar = convertSolarToLunar(solar);

  const year: SexagenaryPair = {
    branch: (lunar.year + 8) % 12,
    stem: (lunar.year + 6) % 10,
  };

  const month: SexagenaryPair = {
    branch: (lunar.month + 1) % 12,
    stem: (lunar.year * 12 + lunar.month + 3) % 10,
  };

  const day: SexagenaryPair = {
    branch: (dayNumber + 1) % 12,
    stem: (dayNumber + 9) % 10,
  };

  const hour: SexagenaryPair = {
    branch: lunar.hour,
    stem: (((dayNumber + 9) % 5) * 2 + lunar.hour) % 10,
  };

  return { hour, day, month, year };
}

/* Convert a lunar date to the corresponding solar date */
export function convertLunarToSolar(lunar: LunarDateTime, timeZone: number) {
  let a11 = 0;
  let b11 = 0;

  if (lunar.month < 11) {
    a11 = getLunarMonth11(lunar.year - 1, timeZone);
    b11 = getLunarMonth11(lunar.year, timeZone);
  } else {
    a11 = getLunarMonth11(lunar.year, timeZone);
    b11 = getLunarMonth11(lunar.year + 1, timeZone);
  }

  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  let off = lunar.month - 11;
  if (off < 0) off += 12;

  if (b11 - a11 > 365) {
    const leapOff = computeLeapMonthOffset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (lunar.isLeapMonth && lunar.month !== leapMonth) return [0, 0, 0];
    if (lunar.isLeapMonth || off >= leapOff) off += 1;
  }

  const monthStart = computeNewMoonDay(k + off, timeZone);
  return convertJuliusDayToDate(monthStart + lunar.day - 1);
}
