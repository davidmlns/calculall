import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface IconProps {
  size: number;
  color: string;
}

export const SettingIcon = () => <MaterialIcons name='settings' size={32} color='#E0E0E0' />;

export const SearchIcon = () => <MaterialIcons name='search' size={32} color='#E0E0E0' />;
export const CloseIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='close' size={size} color={color} />
);

export const BackSpaceIcon = ({ size, color }: IconProps) => (
  <MaterialIcons name='backspace' size={size} color={color} />
);

export const ArrowDownIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='chevron-down' size={size} color={color} />
);

export const BackIcon = () => <MaterialIcons name='arrow-back' size={32} color='#E0E0E0' />;
export const StarIcon = () => <MaterialIcons name='star-border' size={32} color='#E0E0E0' />;

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

export const TirePressureIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='tire' size={size} color={color} />
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
  <MaterialCommunityIcons name='plus-box-outline' size={size} color={color} />
);

export const MinusIcon = ({ size, color }: IconProps) => (
  <MaterialCommunityIcons name='minus-box-outline' size={size} color={color} />
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
