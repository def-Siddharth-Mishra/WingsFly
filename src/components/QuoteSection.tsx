import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const SCREEN_WIDTH = Dimensions.get('window').width;

const QuoteSection = () => {
  const { theme } = useTheme();
  const progressPercent = 0.65;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercent,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start();
  }, [progressPercent, progressAnim]);

  const animatedBarWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCREEN_WIDTH - 64], // Adjust padding
  });

  const thumbTranslateX = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCREEN_WIDTH - 64],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Today's Quote</Text>
      <Text style={[styles.quote, { color: theme.colors.textSecondary }]}>
        "You must do the things, you think you cannot do."
      </Text>

      <View style={styles.progressBarContainer}>
        <Text style={[styles.progressLabel, { color: theme.colors.progressFill }]}>
          Progress {Math.round(progressPercent * 100)}%
        </Text>
        <View style={[styles.progressBarWrapper, { backgroundColor: theme.colors.progressTrack }]}>
          {/* Base Track */}
          <View style={[styles.track, { backgroundColor: theme.colors.progressTrack }]} />

          {/* Progress Fill */}
          <Animated.View
            style={[styles.fillAnimated, { width: animatedBarWidth }]}
          >
            <LinearGradient
              colors={theme.isDark 
                ? ['#6B7FFF', '#4A6BF7', '#3A5AF0'] 
                : ['#C1D7FF', '#4A6BF7', '#1E3A8A']
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.fillGradient}
            />
          </Animated.View>

          {/* Glowing Thumb */}
          <Animated.View
            style={[
              styles.thumbGlow,
              { 
                backgroundColor: theme.colors.progressThumb,
                shadowColor: theme.colors.progressThumb,
              },
              {
                transform: [
                  {
                    translateX: Animated.add(
                      thumbTranslateX,
                      new Animated.Value(-10),
                    ),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 0,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  quote: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    paddingHorizontal: 16,
  },
  progressLabel: {
    fontSize: 13,
    marginBottom: 6,
  },
  progressBarWrapper: {
    height: 8,
    borderRadius: 4,
    overflow: 'visible',
    position: 'relative',
  },
  track: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 4,
  },
  fillAnimated: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fillGradient: {
    height: 8,
    borderRadius: 4,
    width: '100%',
  },
  thumbGlow: {
    position: 'absolute',
    top: -7,
    width: 22,
    height: 22,
    borderRadius: 11,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 8,
  },
});

export default QuoteSection;