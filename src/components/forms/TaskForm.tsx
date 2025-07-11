import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useTask } from '../../context/TaskContext';
import { TaskPriority, TaskStatus } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TaskFormProps {
  onClose: () => void;
  taskType?: 'habit' | 'task' | 'recurring' | 'goal';
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, taskType = 'task' }) => {
  const { theme } = useTheme();
  const { addTask } = useTask();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    priority: 'medium' as TaskPriority,
    tags: [] as string[],
    status: 'pending' as TaskStatus,
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeColors = {
    morning: '#00C853',
    afternoon: '#FFA000',
    evening: '#DE3B8B',
    night: '#1E8EF7',
  };

  const getTimeColor = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 5 && hour < 12) return timeColors.morning;
    if (hour >= 12 && hour < 17) return timeColors.afternoon;
    if (hour >= 17 && hour < 21) return timeColors.evening;
    return timeColors.night;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
    } else {
      // Basic time validation (HH:MM format)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(formData.time)) {
        newErrors.time = 'Please enter time in HH:MM format';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTask = {
        title: formData.title,
        description: formData.description,
        time: formData.time,
        timeColor: getTimeColor(formData.time),
        tags: [taskType.charAt(0).toUpperCase() + taskType.slice(1), 'Important'],
        status: formData.status,
        priority: formData.priority,
        image: require('../../assets/icon1.png'), // Default image
      };
      
      addTask(newTask);
      Alert.alert('Success', 'Task created successfully!');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low', color: theme.colors.success },
    { value: 'medium', label: 'Medium', color: theme.colors.warning },
    { value: 'high', label: 'High', color: theme.colors.error },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Create {taskType.charAt(0).toUpperCase() + taskType.slice(1)}
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Input
          label="Title"
          placeholder="Enter task title"
          value={formData.title}
          onChangeText={(title) => setFormData(prev => ({ ...prev, title }))}
          error={errors.title}
          required
        />

        <Input
          label="Description"
          placeholder="Enter task description (optional)"
          value={formData.description}
          onChangeText={(description) => setFormData(prev => ({ ...prev, description }))}
          multiline
          numberOfLines={3}
          style={{ height: 80, textAlignVertical: 'top' }}
        />

        <Input
          label="Time"
          placeholder="HH:MM (e.g., 09:30)"
          value={formData.time}
          onChangeText={(time) => setFormData(prev => ({ ...prev, time }))}
          error={errors.time}
          required
          keyboardType="numeric"
        />

        <View style={styles.prioritySection}>
          <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>
            Priority
          </Text>
          <View style={styles.priorityOptions}>
            {priorityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.priorityOption,
                  {
                    backgroundColor: formData.priority === option.value 
                      ? option.color 
                      : theme.colors.border,
                  },
                ]}
                onPress={() => setFormData(prev => ({ ...prev, priority: option.value as TaskPriority }))}
              >
                <Text
                  style={[
                    styles.priorityText,
                    {
                      color: formData.priority === option.value 
                        ? '#FFFFFF' 
                        : theme.colors.text,
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <Button
          title="Cancel"
          onPress={onClose}
          variant="outline"
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button
          title="Create Task"
          onPress={handleSubmit}
          loading={loading}
          style={{ flex: 1, marginLeft: 8 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  prioritySection: {
    marginBottom: 16,
  },
  priorityOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
  },
});

export default TaskForm;