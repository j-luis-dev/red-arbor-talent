import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';

type MaterialIconsProps = ComponentProps<typeof MaterialIcons>;
type IconMapping = Record<SymbolViewProps['name'], MaterialIconsProps['name']>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'line.3.horizontal': 'menu',
} as IconMapping;

export type IconSymbolProps = Readonly<
  Omit<MaterialIconsProps, 'name'> & {
    name: IconSymbolName;
    weight?: SymbolWeight;
  }
>;

export const IconSymbol = ({ name, weight: _weight, ...rest }: IconSymbolProps) => (
  <MaterialIcons {...rest} name={MAPPING[name]} />
);
