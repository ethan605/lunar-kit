import _ from 'lodash';
import { Locales, LocaleParams } from '../utils';

import SOLAR_TERMS from './solar_terms.json';

type SolarTermParams = typeof SOLAR_TERMS[0];

interface PossibleDate {
  day: number;
  month: number;
}

export default class SolarTerm {
  readonly locales: LocaleParams;
  readonly lunarMonth: number;
  readonly possibleDates: PossibleDate[];
  readonly sunLongitude: number;

  private constructor({ lunarMonth, locales, possibleDates, sunLongitude }: SolarTermParams) {
    this.lunarMonth = lunarMonth;
    this.locales = locales;
    this.possibleDates = possibleDates;
    this.sunLongitude = sunLongitude;
  }

  static readonly SpringCommences = new SolarTerm(SOLAR_TERMS[0]);
  static readonly SpringShowers = new SolarTerm(SOLAR_TERMS[1]);
  static readonly InsectsWaken = new SolarTerm(SOLAR_TERMS[2]);
  static readonly VernalEquinox = new SolarTerm(SOLAR_TERMS[3]);
  static readonly BrightAndClear = new SolarTerm(SOLAR_TERMS[4]);
  static readonly CornRain = new SolarTerm(SOLAR_TERMS[5]);
  static readonly SummerCommences = new SolarTerm(SOLAR_TERMS[6]);
  static readonly CornForms = new SolarTerm(SOLAR_TERMS[7]);
  static readonly SeedingMillet = new SolarTerm(SOLAR_TERMS[8]);
  static readonly SummerSolstice = new SolarTerm(SOLAR_TERMS[9]);
  static readonly ModerateHeat = new SolarTerm(SOLAR_TERMS[10]);
  static readonly GreatHeat = new SolarTerm(SOLAR_TERMS[11]);
  static readonly AutumnCommences = new SolarTerm(SOLAR_TERMS[12]);
  static readonly EndOfHeat = new SolarTerm(SOLAR_TERMS[13]);
  static readonly WhiteDew = new SolarTerm(SOLAR_TERMS[14]);
  static readonly AutumnEquinox = new SolarTerm(SOLAR_TERMS[15]);
  static readonly ColdDew = new SolarTerm(SOLAR_TERMS[16]);
  static readonly FrostBegins = new SolarTerm(SOLAR_TERMS[17]);
  static readonly WinterCommences = new SolarTerm(SOLAR_TERMS[18]);
  static readonly LightSnow = new SolarTerm(SOLAR_TERMS[19]);
  static readonly HeavySnow = new SolarTerm(SOLAR_TERMS[20]);
  static readonly WinterSolstice = new SolarTerm(SOLAR_TERMS[21]);
  static readonly ModerateCold = new SolarTerm(SOLAR_TERMS[22]);
  static readonly SevereCold = new SolarTerm(SOLAR_TERMS[23]);

  static readonly allTerms = [
    SolarTerm.SpringCommences,
    SolarTerm.SpringShowers,
    SolarTerm.InsectsWaken,
    SolarTerm.VernalEquinox,
    SolarTerm.BrightAndClear,
    SolarTerm.CornRain,
    SolarTerm.SummerCommences,
    SolarTerm.CornForms,
    SolarTerm.SeedingMillet,
    SolarTerm.SummerSolstice,
    SolarTerm.ModerateHeat,
    SolarTerm.GreatHeat,
    SolarTerm.AutumnCommences,
    SolarTerm.EndOfHeat,
    SolarTerm.WhiteDew,
    SolarTerm.AutumnEquinox,
    SolarTerm.ColdDew,
    SolarTerm.FrostBegins,
    SolarTerm.WinterCommences,
    SolarTerm.LightSnow,
    SolarTerm.HeavySnow,
    SolarTerm.WinterSolstice,
    SolarTerm.ModerateCold,
    SolarTerm.SevereCold,
  ];

  toString(locale: Locales = Locales.Default): string {
    return this.locales[locale];
  }
}
