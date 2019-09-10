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

  static SpringCommences: SolarTerm; // = SolarTerm(SOLAR_TERMS[0]);
  static SpringShowers: SolarTerm; // = new SolarTerm(SOLAR_TERMS[1]);
  static InsectsWaken: SolarTerm; // = new SolarTerm(SOLAR_TERMS[2]);
  static VernalEquinox: SolarTerm; // = new SolarTerm(SOLAR_TERMS[3]);
  static BrightAndClear: SolarTerm; // = new SolarTerm(SOLAR_TERMS[4]);
  static CornRain: SolarTerm; // = new SolarTerm(SOLAR_TERMS[5]);
  static SummerCommences: SolarTerm; // = new SolarTerm(SOLAR_TERMS[6]);
  static CornForms: SolarTerm; // = new SolarTerm(SOLAR_TERMS[7]);
  static SeedingMillet: SolarTerm; // = new SolarTerm(SOLAR_TERMS[8]);
  static SummerSolstice: SolarTerm; // = new SolarTerm(SOLAR_TERMS[9]);
  static ModerateHeat: SolarTerm; // = new SolarTerm(SOLAR_TERMS[10]);
  static GreatHeat: SolarTerm; // = new SolarTerm(SOLAR_TERMS[11]);
  static AutumnCommences: SolarTerm; // = new SolarTerm(SOLAR_TERMS[12]);
  static EndOfHeat: SolarTerm; // = new SolarTerm(SOLAR_TERMS[13]);
  static WhiteDew: SolarTerm; // = new SolarTerm(SOLAR_TERMS[14]);
  static AutumnEquinox: SolarTerm; // = new SolarTerm(SOLAR_TERMS[15]);
  static ColdDew: SolarTerm; // = new SolarTerm(SOLAR_TERMS[16]);
  static FrostBegins: SolarTerm; // = new SolarTerm(SOLAR_TERMS[17]);
  static WinterCommences: SolarTerm; // = new SolarTerm(SOLAR_TERMS[18]);
  static LightSnow: SolarTerm; // = new SolarTerm(SOLAR_TERMS[19]);
  static HeavySnow: SolarTerm; // = new SolarTerm(SOLAR_TERMS[20]);
  static WinterSolstice: SolarTerm; // = new SolarTerm(SOLAR_TERMS[21]);
  static ModerateCold: SolarTerm; // = new SolarTerm(SOLAR_TERMS[22]);
  static SevereCold: SolarTerm; // = new SolarTerm(SOLAR_TERMS[23]);

  static allTerms: SolarTerm[];

  static setupTerms(): void {
    SolarTerm.SpringCommences = new SolarTerm(SOLAR_TERMS[0]);
    SolarTerm.SpringShowers = new SolarTerm(SOLAR_TERMS[1]);
    SolarTerm.InsectsWaken = new SolarTerm(SOLAR_TERMS[2]);
    SolarTerm.VernalEquinox = new SolarTerm(SOLAR_TERMS[3]);
    SolarTerm.BrightAndClear = new SolarTerm(SOLAR_TERMS[4]);
    SolarTerm.CornRain = new SolarTerm(SOLAR_TERMS[5]);
    SolarTerm.SummerCommences = new SolarTerm(SOLAR_TERMS[6]);
    SolarTerm.CornForms = new SolarTerm(SOLAR_TERMS[7]);
    SolarTerm.SeedingMillet = new SolarTerm(SOLAR_TERMS[8]);
    SolarTerm.SummerSolstice = new SolarTerm(SOLAR_TERMS[9]);
    SolarTerm.ModerateHeat = new SolarTerm(SOLAR_TERMS[10]);
    SolarTerm.GreatHeat = new SolarTerm(SOLAR_TERMS[11]);
    SolarTerm.AutumnCommences = new SolarTerm(SOLAR_TERMS[12]);
    SolarTerm.EndOfHeat = new SolarTerm(SOLAR_TERMS[13]);
    SolarTerm.WhiteDew = new SolarTerm(SOLAR_TERMS[14]);
    SolarTerm.AutumnEquinox = new SolarTerm(SOLAR_TERMS[15]);
    SolarTerm.ColdDew = new SolarTerm(SOLAR_TERMS[16]);
    SolarTerm.FrostBegins = new SolarTerm(SOLAR_TERMS[17]);
    SolarTerm.WinterCommences = new SolarTerm(SOLAR_TERMS[18]);
    SolarTerm.LightSnow = new SolarTerm(SOLAR_TERMS[19]);
    SolarTerm.HeavySnow = new SolarTerm(SOLAR_TERMS[20]);
    SolarTerm.WinterSolstice = new SolarTerm(SOLAR_TERMS[21]);
    SolarTerm.ModerateCold = new SolarTerm(SOLAR_TERMS[22]);
    SolarTerm.SevereCold = new SolarTerm(SOLAR_TERMS[23]);

    SolarTerm.allTerms = [
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
  }

  toString(locale: Locales = Locales.Default): string {
    return this.locales[locale];
  }
}

SolarTerm.setupTerms();
