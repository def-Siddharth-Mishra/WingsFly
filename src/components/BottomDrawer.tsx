import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

const BottomDrawer = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { theme } = useTheme();
  
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={[styles.overlay, { backgroundColor: theme.colors.overlay }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.drawer, { backgroundColor: theme.colors.drawerBackground }]}>
          <DrawerOption
            icon="brain"
            label="Habit"
            description="Activity that repeats over time it has detailed tracking and statistics."
            
          />
          <DrawerOption
            icon="repeat"
            label="Recurring Task"
            description="Activity that repeats over time it has detailed tracking and statistics."
          />
          <DrawerOption
            icon="check"
            label="Task"
            description="Single instance activity without tracking over time."
          />
          <DrawerOption
            icon="target"
            label="Goal of the Day"
            description="A specific target set for oneself to achieve within a single day."
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const DrawerOption = ({
  icon,
  label,
  description,
}: {
  icon: string;
  label: string;
  description: string;
}) => {
  const { theme } = useTheme();
  
  return (
    <Pressable style={[styles.option, { borderColor: theme.colors.border }]}>
      <View style={[styles.iconCircle, { backgroundColor: theme.colors.iconBackground }]}>
        <Icon name={icon} size={20} color={theme.colors.secondary} />
      </View>
      <View style={styles.labelBox}>
        <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>{description}</Text>
      </View>
      <Icon name="chevron-right" size={22} color={theme.colors.textMuted} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  drawer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  iconCircle: {
    borderRadius: 24,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  labelBox: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
  },
});

export default BottomDrawer;
