import { Pressable, View } from 'react-native';
import { useState } from 'react';
import { SettingIcon } from './Icons';
import SettingsModal from './SettingsModal';
import { useTheme } from '@/context/ThemeContext';

export default function HeaderRight() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { theme } = useTheme();

  return (
    <View className='flex-row items-center' style={{ backgroundColor: theme.background }}>
      <Pressable onPress={() => setShowSettingsModal(true)}>
        <SettingIcon size={34} color={theme.icon} />
      </Pressable>
      <SettingsModal isVisible={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </View>
  );
}
