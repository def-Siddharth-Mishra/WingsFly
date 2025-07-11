import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Animated, 
  PanGestureHandler,
  State,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';
import { TaskItemProps } from '../types';

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onPress,
  onDelete,
}) => {
  const { theme } = useTheme();
  const [mainTag, subTag] = task.tags;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handleToggleComplete = () => {
    if (onToggleComplete) {
      // Add a subtle animation when toggling
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
      
      onToggleComplete(task.id);
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress(task);
    }
  };

  const handleLongPress = () => {
    // Add haptic feedback or show context menu
    console.log('Long press on task:', task.title);
  };

  const renderStatusIcon = () => {
    if (task.status === 'done') {
      return (
        <TouchableOpacity 
          style={[styles.statusCircle, { backgroundColor: theme.colors.statusDone }]}
          onPress={handleToggleComplete}
        >
          <Icon name="check" size={14} color="#fff" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity 
          style={[styles.statusCircleOutline, { 
            backgroundColor: theme.colors.statusPending,
            borderColor: theme.colors.statusPending 
          }]}
          onPress={handleToggleComplete}
        >
          <Icon
            name={task.status === 'pending' ? 'clock-outline' : 'chevron-right'}
            size={14}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      );
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.textMuted;
    }
  };

  return (
    <Animated.View style={{ opacity }}>
      <TouchableOpacity 
        style={[styles.container, { backgroundColor: theme.colors.surface }]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        activeOpacity={0.7}
      >
        {/* Priority Indicator */}
        <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor() }]} />
        
        {/* Image */}
        <View style={[styles.imageBox, { backgroundColor: theme.colors.surface }]}>
          <Image source={task.image} style={styles.image} resizeMode="contain" />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text 
            style={[
              styles.title, 
              { 
                color: theme.colors.text,
                textDecorationLine: task.status === 'done' ? 'line-through' : 'none',
                opacity: task.status === 'done' ? 0.7 : 1,
              }
            ]}
          >
            {task.title}
          </Text>

          <View style={styles.metaRow}>
            {/* Time pill */}
            <View
              style={[styles.timePill, { backgroundColor: `${task.timeColor}20` }]}
            >
              <Icon name="clock-outline" size={13} color={task.timeColor} />
              <Text style={[styles.timeText, { color: task.timeColor }]}>{task.time}</Text>
            </View>

            {/* Tags */}
            <View style={[styles.tagRow, { backgroundColor: theme.colors.tagBackground }]}>
              <Text style={[styles.tagText, { color: theme.colors.textMuted }]}>
                {mainTag}
                {subTag ? ` | ${subTag}` : ''}
              </Text>
              <Icon name="flag-outline" size={13} color={theme.colors.textMuted} />
            </View>
          </View>
        </View>

        {/* Status Icon */}
        {renderStatusIcon()}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    position: 'relative',
  },
  priorityIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  imageBox: {
    borderRadius: 50,
    padding: 6,
    width: 50,
    height: 50,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  tagText: {
    fontSize: 12,
    marginRight: 4,
  },
  statusCircle: {
    width: 25,
    height: 25,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCircleOutline: {
    width: 30,
    height: 30,
    borderRadius: 22,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskItem;
