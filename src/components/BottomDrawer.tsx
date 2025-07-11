import React, { useState } from 'react';
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
import { BottomDrawerProps } from '../types';
import TaskForm from './forms/TaskForm';

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  visible,
  onClose,
  onOptionSelect,
}) => {
  const { theme } = useTheme();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState<'habit' | 'task' | 'recurring' | 'goal'>('task');

  const handleOptionPress = (type: 'habit' | 'task' | 'recurring' | 'goal') => {
    setSelectedTaskType(type);
    setShowTaskForm(true);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    onClose();
  };
  
  if (showTaskForm) {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={handleCloseTaskForm}
      >
        <TaskForm
          onClose={handleCloseTaskForm}
          taskType={selectedTaskType}
        />
      </Modal>
    );
  }

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
            onPress={() => handleOptionPress('habit')}
          />
          <DrawerOption
            icon="repeat"
            label="Recurring Task"
            description="Activity that repeats over time it has detailed tracking and statistics."
            onPress={() => handleOptionPress('recurring')}
          />
          <DrawerOption
            icon="check"
            label="Task"
            description="Single instance activity without tracking over time."
            onPress={() => handleOptionPress('task')}
          />
          <DrawerOption
            icon="target"
            label="Goal of the Day"
            description="A specific target set for oneself to achieve within a single day."
            onPress={() => handleOptionPress('goal')}
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
  onPress,
}: {
  icon: string;
  label: string;
  description: string;
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  
  return (
    <Pressable 
      style={[styles.option, { borderColor: theme.colors.border }]}
      onPress={onPress}
    >
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
