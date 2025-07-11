import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SearchBarProps {
  isActive: boolean;
  onToggle: () => void;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isActive,
  onToggle,
  onSearch,
  placeholder = 'Search tasks...',
}) => {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);
  const animatedWidth = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isActive ? SCREEN_WIDTH - 120 : 40,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (isActive) {
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      inputRef.current?.blur();
      setQuery('');
      onSearch('');
    }
  }, [isActive, animatedWidth, onSearch]);

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    if (isActive) {
      inputRef.current?.focus();
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: animatedWidth,
          backgroundColor: isActive ? theme.colors.surface : 'transparent',
          borderColor: theme.colors.border,
        },
      ]}
    >
      <TouchableOpacity onPress={onToggle} style={styles.iconButton}>
        <Icon
          name="search"
          size={20}
          color={theme.colors.text}
        />
      </TouchableOpacity>

      {isActive && (
        <>
          <TextInput
            ref={inputRef}
            style={[styles.input, { color: theme.colors.text }]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textMuted}
            value={query}
            onChangeText={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          {query.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Icon
                name="x"
                size={18}
                color={theme.colors.textMuted}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 4,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginRight: 4,
  },
});

export default SearchBar;