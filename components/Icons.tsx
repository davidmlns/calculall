import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export type IconType = {
  library: 'MaterialIcons' | 'MaterialCommunityIcons';
  name: string;
};

interface IconProps {
  size: number;
  color: string;
}

// Función helper para reconstruir los íconos
export const getIconComponent = (icon: IconType, size: number, color: string) => {
  if (icon.library === 'MaterialIcons') {
    return <MaterialIcons name={icon.name as any} size={size} color={color} />;
  }
  return <MaterialCommunityIcons name={icon.name as any} size={size} color={color} />;
};

// Todos los íconos convertidos a objetos serializables
export const icons = {
  SettingIcon: { library: 'MaterialIcons', name: 'settings' },
  SearchIcon: { library: 'MaterialIcons', name: 'search' },
  CloseIcon: { library: 'MaterialIcons', name: 'close' },
  CalculateIcon: { library: 'MaterialIcons', name: 'calculate' },
  DeleteIcon: { library: 'MaterialCommunityIcons', name: 'delete-empty' },
  FromIcon: { library: 'MaterialCommunityIcons', name: 'ray-start-arrow' },
  UptoIcon: { library: 'MaterialCommunityIcons', name: 'ray-start-end' },
  VerifyIcon: { library: 'MaterialCommunityIcons', name: 'check-outline' },
  ConvertIcon: { library: 'MaterialIcons', name: 'change-circle' },
  HomeIcon: { library: 'MaterialIcons', name: 'home' },
  BackSpaceIcon: { library: 'MaterialIcons', name: 'backspace' },
  ArrowDownIcon: { library: 'MaterialCommunityIcons', name: 'chevron-down' },
  GenerateIcon: { library: 'MaterialCommunityIcons', name: 'autorenew' },
  BackIcon: { library: 'MaterialIcons', name: 'arrow-back' },
  StarIcon: { library: 'MaterialIcons', name: 'star-border' },
  StarFilledIcon: { library: 'MaterialIcons', name: 'star' },
  AngleIcon: { library: 'MaterialCommunityIcons', name: 'angle-acute' },
  AverageIcon: { library: 'MaterialIcons', name: 'stacked-bar-chart' },
  BaseNumericIcon: { library: 'MaterialCommunityIcons', name: 'numeric-10' },
  EquationIcon: { library: 'MaterialIcons', name: 'superscript' },
  FractionIcon: { library: 'MaterialCommunityIcons', name: 'fraction-one-half' },
  MCMMCDIcon: { library: 'MaterialCommunityIcons', name: 'window-minimize' },
  LengthIcon: { library: 'MaterialCommunityIcons', name: 'ruler' },
  NumberGeneratorIcon: { library: 'MaterialIcons', name: '123' },
  PrimeNumberIcon: { library: 'MaterialIcons', name: 'numbers' },
  ProbabilityIcon: { library: 'MaterialIcons', name: 'question-mark' },
  RomanNumberIcon: { library: 'MaterialCommunityIcons', name: 'roman-numeral-4' },
  ShapeIcon: { library: 'MaterialCommunityIcons', name: 'shape' },
  StatisticsIcon: { library: 'MaterialCommunityIcons', name: 'chart-bar' },
  TrigonometryIcon: { library: 'MaterialCommunityIcons', name: 'math-cos' },
  EnergyIcon: { library: 'MaterialIcons', name: 'power' },
  ForceGravityIcon: { library: 'MaterialIcons', name: 'swipe-down-alt' },
  HumidityIcon: { library: 'MaterialIcons', name: 'water-drop' },
  IlluminanceIcon: { library: 'MaterialIcons', name: 'light' },
  MagnetismIcon: { library: 'MaterialCommunityIcons', name: 'magnet' },
  OhmIcon: { library: 'MaterialCommunityIcons', name: 'integrated-circuit-chip' },
  PressureIcon: { library: 'MaterialCommunityIcons', name: 'car-brake-low-pressure' },
  RadiationIcon: { library: 'MaterialCommunityIcons', name: 'biohazard' },
  SunIcon: { library: 'MaterialIcons', name: 'sunny' },
  SoundIcon: { library: 'MaterialIcons', name: 'surround-sound' },
  TemperatureIcon: { library: 'MaterialCommunityIcons', name: 'temperature-celsius' },
  VelocityIcon: { library: 'MaterialIcons', name: 'speed' },
  WavelengthIcon: { library: 'MaterialCommunityIcons', name: 'cosine-wave' },
  WindSpeedIcon: { library: 'MaterialCommunityIcons', name: 'weather-windy' },
  BMIIcon: { library: 'MaterialIcons', name: 'scale' },
  CaloriesIcon: { library: 'MaterialIcons', name: 'local-fire-department' },
  HydrationIcon: { library: 'MaterialCommunityIcons', name: 'cup-water' },
  MedicationIcon: { library: 'MaterialIcons', name: 'medication' },
  BudgetingIcon: { library: 'MaterialCommunityIcons', name: 'account-cash' },
  DiscountsIcon: { library: 'MaterialIcons', name: 'discount' },
  InflationIcon: { library: 'MaterialCommunityIcons', name: 'chart-timeline-variant' },
  InterestIcon: { library: 'MaterialCommunityIcons', name: 'bank-plus' },
  LoanIcon: { library: 'MaterialIcons', name: 'attach-money' },
  PercentageIcon: { library: 'MaterialIcons', name: 'percent' },
  TaxesIcon: { library: 'MaterialIcons', name: 'feed' },
  TipIcon: { library: 'MaterialCommunityIcons', name: 'piggy-bank' },
  FuelIcon: { library: 'MaterialCommunityIcons', name: 'fuel' },
  MileageIcon: { library: 'MaterialCommunityIcons', name: 'diameter' },
  AutonomyIcon: { library: 'MaterialIcons', name: 'electric-car' },
  CO2Icon: { library: 'MaterialCommunityIcons', name: 'molecule-co2' },
  BatteryIcon: { library: 'MaterialIcons', name: 'battery-charging-full' },
  DataTransferIcon: { library: 'MaterialCommunityIcons', name: 'transfer' },
  DigitalDataIcon: { library: 'MaterialCommunityIcons', name: 'harddisk' },
  ElectricCurrentIcon: { library: 'MaterialIcons', name: 'electric-bolt' },
  ElectricConsumptionIcon: { library: 'MaterialIcons', name: 'electric-meter' },
  ElectricalResistanceIcon: { library: 'MaterialCommunityIcons', name: 'resistor' },
  LatitudeIcon: { library: 'MaterialCommunityIcons', name: 'latitude' },
  PopulationDensityIcon: { library: 'MaterialIcons', name: 'people-alt' },
  CookingIcon: { library: 'MaterialIcons', name: 'kitchen' },
  CookingTimeIcon: { library: 'MaterialIcons', name: 'soup-kitchen' },
  TimerSettingsIcon: { library: 'MaterialIcons', name: 'timer' },
  VolumeIcon: { library: 'MaterialCommunityIcons', name: 'cube' },
  AgeIcon: { library: 'MaterialIcons', name: 'cake' },
  DateIcon: { library: 'MaterialIcons', name: 'calendar-month' },
  DensityIcon: { library: 'MaterialCommunityIcons', name: 'weight' },
  PasswordIcon: { library: 'MaterialIcons', name: 'password' },
  QrCodeIcon: { library: 'MaterialIcons', name: 'qr-code-2' },
  TimeIcon: { library: 'MaterialIcons', name: 'access-time' },
  UUIDIcon: { library: 'MaterialIcons', name: 'key' },
  WeightIcon: { library: 'MaterialCommunityIcons', name: 'weight-gram' },
  RadianIcon: { library: 'MaterialCommunityIcons', name: 'circle-slice-2' },
  ComplementaryIcon: { library: 'MaterialCommunityIcons', name: 'angle-right' },
  SupplementaryIcon: { library: 'MaterialIcons', name: 'horizontal-rule' },
  Base2Icon: { library: 'MaterialCommunityIcons', name: 'numeric-2' },
  Base8Icon: { library: 'MaterialCommunityIcons', name: 'numeric-8' },
  Base16Icon: { library: 'MaterialCommunityIcons', name: 'hexadecimal' },
  LinearEquationIcon: { library: 'MaterialCommunityIcons', name: 'alpha-x' },
  SumIcon: { library: 'MaterialCommunityIcons', name: 'plus' },
  MinusIcon: { library: 'MaterialCommunityIcons', name: 'minus' },
  MulIcon: { library: 'MaterialCommunityIcons', name: 'multiplication' },
  SimplificationIcon: { library: 'MaterialIcons', name: 'close-fullscreen' },
  DecimalIcon: { library: 'MaterialCommunityIcons', name: 'decimal' },
  MinimumCommonMultipleIcon: { library: 'MaterialIcons', name: 'arrow-downward' },
  MaximumCommonDivisorIcon: { library: 'MaterialIcons', name: 'arrow-upward' },
  CorrectIcon: { library: 'MaterialIcons', name: 'verified' },
  IncorrectIcon: { library: 'MaterialCommunityIcons', name: 'close-circle' },
  NextIcon: { library: 'MaterialIcons', name: 'next-plan' },
  MedianIcon: { library: 'MaterialCommunityIcons', name: 'format-horizontal-align-center' },
  ModeIcon: { library: 'MaterialIcons', name: 'repeat' },
  SenIcon: { library: 'MaterialCommunityIcons', name: 'math-sin' },
  CosIcon: { library: 'MaterialCommunityIcons', name: 'math-cos' },
  TanIcon: { library: 'MaterialCommunityIcons', name: 'math-tan' },
  WalkingIcon: { library: 'MaterialCommunityIcons', name: 'walk' },
  RunningIcon: { library: 'MaterialCommunityIcons', name: 'run' },
  CyclingIcon: { library: 'MaterialCommunityIcons', name: 'bike' },
  SwimmingIcon: { library: 'MaterialCommunityIcons', name: 'swim' },
  PlayIcon: { library: 'MaterialCommunityIcons', name: 'play' },
  PauseIcon: { library: 'MaterialIcons', name: 'pause' },
  RestartIcon: { library: 'MaterialIcons', name: 'replay' },
  CopyIcon: { library: 'MaterialIcons', name: 'content-copy' },
  CurrencyIcon: { library: 'MaterialIcons', name: 'attach-money' },
  TriangleIcon: { library: 'MaterialCommunityIcons', name: 'triangle-outline' },
  SquareIcon: { library: 'MaterialCommunityIcons', name: 'square-outline' },
  RectangleIcon: { library: 'MaterialCommunityIcons', name: 'rectangle-outline' },
  RhombusIcon: { library: 'MaterialCommunityIcons', name: 'cards-diamond-outline' },
  PentagonIcon: { library: 'MaterialCommunityIcons', name: 'pentagon-outline' },
  HexagonIcon: { library: 'MaterialCommunityIcons', name: 'hexagon-outline' },
  CircleIcon: { library: 'MaterialCommunityIcons', name: 'circle-outline' },
  ArcIcon: { library: 'MaterialCommunityIcons', name: 'circle-slice-1' },
  ThemeIcon: { library: 'MaterialCommunityIcons', name: 'brush-variant' },
  LanguageIcon: { library: 'MaterialIcons', name: 'language' },
  InfoIcon: { library: 'MaterialIcons', name: 'info-outline' },
  BugIcon: { library: 'MaterialIcons', name: 'bug-report' },
};

export const SettingIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='settings' size={size} color={color} />
);

export const SearchIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='search' size={size} color={color} />
);
export const CloseIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='close' size={size} color={color} />
);

export const CalculateIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='calculate' size={size} color={color} />
);

export const DeleteIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='delete-empty' size={size} color={color} />
);

export const FromIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='ray-start-arrow' size={size} color={color} />
);

export const UptoIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='ray-start-end' size={size} color={color} />
);

export const VerifyIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='check-outline' size={size} color={color} />
);

export const ConvertIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='change-circle' size={size} color={color} />
);

export const HomeIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='home' size={size} color={color} />
);

export const BackSpaceIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='backspace' size={size} color={color} />
);

export const ArrowDownIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='chevron-down' size={size} color={color} />
);

export const GenerateIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='autorenew' size={size} color={color} />
);

export const BackIcon = () => <MaterialIcons name='arrow-back' size={32} color='#E0E0E0' />;
export const StarIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='star-border' size={size} color={color} />
);

export const StarFilledIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='star' size={size} color={color} />
);

export const AngleIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='angle-acute' size={size} color={color} />
);

export const AverageIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='stacked-bar-chart' size={size} color={color} />
);

export const BaseNumericIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='numeric-10' size={size} color={color} />
);

export const EquationIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='superscript' size={size} color={color} />
);

export const FractionIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='fraction-one-half' size={size} color={color} />
);

export const MCMMCDIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='window-minimize' size={size} color={color} />
);

export const LengthIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='ruler' size={size} color={color} />
);

export const NumberGeneratorIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='123' size={size} color={color} />
);

export const PrimeNumberIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='numbers' size={size} color={color} />
);

export const ProbabilityIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='question-mark' size={size} color={color} />
);

export const RomanNumberIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='roman-numeral-4' size={size} color={color} />
);

export const ShapeIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='shape' size={size} color={color} />
);

export const StatisticsIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='chart-bar' size={size} color={color} />
);
export const TrigonometryIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='math-cos' size={size} color={color} />
);

export const EnergyIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='power' size={size} color={color} />
);

export const ForceGravityIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='swipe-down-alt' size={size} color={color} />
);

export const HumidityIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='water-drop' size={size} color={color} />
);

export const IlluminanceIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='light' size={size} color={color} />
);
export const MagnetismIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='magnet' size={size} color={color} />
);

export const OhmIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='integrated-circuit-chip' size={size} color={color} />
);

export const PressureIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='car-brake-low-pressure' size={size} color={color} />
);

export const RadiationIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='biohazard' size={size} color={color} />
);

export const SunIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='sunny' size={size} color={color} />
);
export const SoundIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='surround-sound' size={size} color={color} />
);

export const TemperatureIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='temperature-celsius' size={size} color={color} />
);

export const VelocityIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='speed' size={size} color={color} />
);
export const WavelengthIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='cosine-wave' size={size} color={color} />
);

export const WindSpeedIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='weather-windy' size={size} color={color} />
);
export const BMIIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='scale' size={size} color={color} />
);
export const CaloriesIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='local-fire-department' size={size} color={color} />
);

export const HydrationIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='cup-water' size={size} color={color} />
);

export const MedicationIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='medication' size={size} color={color} />
);

export const BudgetingIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='account-cash' size={size} color={color} />
);
export const DiscountsIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='discount' size={size} color={color} />
);

export const InflationIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='chart-timeline-variant' size={size} color={color} />
);

export const InterestIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='bank-plus' size={size} color={color} />
);

export const LoanIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='attach-money' size={size} color={color} />
);

export const PercentageIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='percent' size={size} color={color} />
);

export const TaxesIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='feed' size={size} color={color} />
);

export const TipIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='piggy-bank' size={size} color={color} />
);

export const FuelIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='fuel' size={size} color={color} />
);

export const MileageIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='diameter' size={size} color={color} />
);

export const AutonomyIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='electric-car' size={size} color={color} />
);

export const CO2Icon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='molecule-co2' size={size} color={color} />
);

export const BatteryIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='battery-charging-full' size={size} color={color} />
);

export const DataTransferIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='transfer' size={size} color={color} />
);

export const DigitalDataIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='harddisk' size={size} color={color} />
);

export const ElectricCurrentIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='electric-bolt' size={size} color={color} />
);

export const ElectricConsumptionIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='electric-meter' size={size} color={color} />
);

export const ElectricalResistanceIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='resistor' size={size} color={color} />
);

export const LatitudeIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='latitude' size={size} color={color} />
);

export const PopulationDensityIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='people-alt' size={size} color={color} />
);

export const CookingIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='kitchen' size={size} color={color} />
);
export const CookingTimeIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='soup-kitchen' size={size} color={color} />
);
export const TimerSettingsIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='timer' size={size} color={color} />
);
export const VolumeIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='cube' size={size} color={color} />
);

export const AgeIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='cake' size={size} color={color} />
);

export const DateIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='calendar-month' size={size} color={color} />
);

export const DensityIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='weight' size={size} color={color} />
);

export const PasswordIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='password' size={size} color={color} />
);
export const QrCodeIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='qr-code-2' size={size} color={color} />
);

export const TimeIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='access-time' size={size} color={color} />
);

export const UUIDIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='key' size={size} color={color} />
);

export const WeightIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='weight-gram' size={size} color={color} />
);

export const RadianIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='circle-slice-2' size={size} color={color} />
);

export const ComplementaryIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='angle-right' size={size} color={color} />
);

export const SupplementaryIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='horizontal-rule' size={size} color={color} />
);

export const Base2Icon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='numeric-2' size={size} color={color} />
);

export const Base8Icon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='numeric-8' size={size} color={color} />
);

export const Base16Icon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='hexadecimal' size={size} color={color} />
);

export const LinearEquationIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='alpha-x' size={size} color={color} />
);

export const SumIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='plus' size={size} color={color} />
);

export const MinusIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='minus' size={size} color={color} />
);

export const MulIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='multiplication' size={size} color={color} />
);

export const SimplificationIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='close-fullscreen' size={size} color={color} />
);

export const DecimalIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='decimal' size={size} color={color} />
);

export const MinimumCommonMultipleIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='arrow-downward' size={size} color={color} />
);

export const MaximumCommonDivisorIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='arrow-upward' size={size} color={color} />
);

export const CorrectIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='verified' size={size} color={color} />
);

export const IncorrectIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='close-circle' size={size} color={color} />
);

export const NextIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='next-plan' size={size} color={color} />
);

export const MedianIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='format-horizontal-align-center' size={size} color={color} />
);

export const ModeIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='repeat' size={size} color={color} />
);

export const SenIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='math-sin' size={size} color={color} />
);

export const CosIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='math-cos' size={size} color={color} />
);

export const TanIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='math-tan' size={size} color={color} />
);

export const WalkingIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='walk' size={size} color={color} />
);

export const RunningIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='run' size={size} color={color} />
);

export const CyclingIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='bike' size={size} color={color} />
);

export const SwimmingIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='swim' size={size} color={color} />
);

export const PlayIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='play' size={size} color={color} />
);

export const PauseIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='pause' size={size} color={color} />
);

export const RestartIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='replay' size={size} color={color} />
);

export const CopyIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='content-copy' size={size} color={color} />
);

export const CurrencyIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='attach-money' size={size} color={color} />
);

export const TriangleIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='triangle-outline' size={size} color={color} />
);

export const SquareIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='square-outline' size={size} color={color} />
);

export const RectangleIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='rectangle-outline' size={size} color={color} />
);

export const RhombusIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='cards-diamond-outline' size={size} color={color} />
);

export const PentagonIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='pentagon-outline' size={size} color={color} />
);

export const HexagonIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='hexagon-outline' size={size} color={color} />
);

export const CircleIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='circle-outline' size={size} color={color} />
);

export const ArcIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='circle-slice-1' size={size} color={color} />
);

export const ThemeIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='brush-variant' size={size} color={color} />
);

export const LanguageIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='language' size={size} color={color} />
);

export const InfoIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='info-outline' size={size} color={color} />
);

export const BugIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='bug-report' size={size} color={color} />
);
