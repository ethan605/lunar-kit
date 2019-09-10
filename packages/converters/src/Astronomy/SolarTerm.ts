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

  static SpringCommences = new SolarTerm(SOLAR_TERMS[0]);
  static SpringShowers = new SolarTerm(SOLAR_TERMS[1]);
  static InsectsWaken = new SolarTerm(SOLAR_TERMS[2]);
  static VernalEquinox = new SolarTerm(SOLAR_TERMS[3]);
  static BrightAndClear = new SolarTerm(SOLAR_TERMS[4]);
  static CornRain = new SolarTerm(SOLAR_TERMS[5]);
  static SummerCommences = new SolarTerm(SOLAR_TERMS[6]);
  static CornForms = new SolarTerm(SOLAR_TERMS[7]);
  static SeedingMillet = new SolarTerm(SOLAR_TERMS[8]);
  static SummerSolstice = new SolarTerm(SOLAR_TERMS[9]);
  static ModerateHeat = new SolarTerm(SOLAR_TERMS[10]);
  static GreatHeat = new SolarTerm(SOLAR_TERMS[11]);
  static AutumnCommences = new SolarTerm(SOLAR_TERMS[12]);
  static EndOfHeat = new SolarTerm(SOLAR_TERMS[13]);
  static WhiteDew = new SolarTerm(SOLAR_TERMS[14]);
  static AutumnEquinox = new SolarTerm(SOLAR_TERMS[15]);
  static ColdDew = new SolarTerm(SOLAR_TERMS[16]);
  static FrostBegins = new SolarTerm(SOLAR_TERMS[17]);
  static WinterCommences = new SolarTerm(SOLAR_TERMS[18]);
  static LightSnow = new SolarTerm(SOLAR_TERMS[19]);
  static HeavySnow = new SolarTerm(SOLAR_TERMS[20]);
  static WinterSolstice = new SolarTerm(SOLAR_TERMS[21]);
  static ModerateCold = new SolarTerm(SOLAR_TERMS[22]);
  static SevereCold = new SolarTerm(SOLAR_TERMS[23]);

  static allTerms = [
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
