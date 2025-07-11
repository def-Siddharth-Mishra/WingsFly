import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';
import { HeaderProps } from '../types';
import SearchBar from './ui/SearchBar';

const Header: React.FC<HeaderProps> = ({
  onSearchPress,
  onCalendarPress,
  onHelpPress,
}) => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive && onSearchPress) {
      onSearchPress();
    }
  };

  const handleSearch = (query: string) => {
    // This will be handled by the parent component
    console.log('Search query:', query);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {/* Left Logo & Brand */}
      {!isSearchActive && (
        <View style={styles.leftSection}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={[styles.brandText, { color: theme.colors.text }]}>WingsFly</Text>
        </View>
      )}

      {/* Search Bar */}
      <SearchBar
        isActive={isSearchActive}
        onToggle={handleSearchToggle}
        onSearch={handleSearch}
      />

      {/* Right Icons */}
      {!isSearchActive && (
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={onCalendarPress}>
            <Feather name="calendar" size={20} style={[styles.icon, { color: theme.colors.text }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme}>
            <Feather 
              name={isDarkMode ? "sun" : "moon"} 
              size={20} 
              style={[styles.icon, { color: theme.colors.text }]} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onHelpPress}>
            <Feather name="help-circle" size={20} style={[styles.icon, { color: theme.colors.text }]} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#292f70',
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
});

export default Header;
