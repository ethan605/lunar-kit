import LunarDate from './src/LunarDate';
import SolarDate from './src/SolarDate';

declare module '@lunar-kit/converters' {
  export { LunarDate, SolarDate };
}
