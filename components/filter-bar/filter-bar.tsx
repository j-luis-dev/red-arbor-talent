import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Chip, Menu, Searchbar, useTheme } from 'react-native-paper';

import { styles } from './styles';
import { useFilterBar } from './use-filter-bar';

export const FilterBar = () => {
  const theme = useTheme();
  const {
    t,
    localSearch,
    handleSearch,
    categoryOpen,
    setCategoryOpen,
    sortOpen,
    setSortOpen,
    categoryNames,
    selectedCategory,
    setSelectedCategory,
    sortLabel,
    jobTypes,
    selectedJobType,
    setSelectedJobType,
    sortOptions,
    setSortBy,
    categoryMenuMaxHeight,
  } = useFilterBar();

  const chipTheme = {
    colors: {
      secondaryContainer: theme.colors.primaryContainer,
      onSecondaryContainer: theme.colors.onPrimaryContainer,
    },
  };

  return (
    <View style={styles.wrapper}>
      <Searchbar
        placeholder={t('Search jobs placeholder')}
        value={localSearch}
        onChangeText={handleSearch}
        style={styles.search}
        accessibilityLabel={t('Search jobs label')}
        accessibilityHint={t('Search jobs hint')}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        <Menu
          visible={categoryOpen}
          onDismiss={() => setCategoryOpen(false)}
          contentStyle={{ maxHeight: categoryMenuMaxHeight }}
          anchor={
            <Button
              mode="outlined"
              compact
              onPress={() => setCategoryOpen(true)}
              style={styles.anchorButton}
            >
              {selectedCategory ?? t('Category')}
            </Button>
          }
        >
          <ScrollView
            style={{ maxHeight: categoryMenuMaxHeight }}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
          >
            <Menu.Item
              onPress={() => {
                setSelectedCategory(null);
                setCategoryOpen(false);
              }}
              title={t('All')}
            />
            {categoryNames.map((name) => (
              <Menu.Item
                key={name}
                onPress={() => {
                  setSelectedCategory(name);
                  setCategoryOpen(false);
                }}
                title={name}
              />
            ))}
          </ScrollView>
        </Menu>
        {jobTypes.map(({ value, label }) => (
          <Chip
            key={String(value)}
            selected={selectedJobType === value}
            onPress={() => setSelectedJobType(value)}
            style={styles.chip}
            compact
            theme={chipTheme}
          >
            {label}
          </Chip>
        ))}
        <Menu
          visible={sortOpen}
          onDismiss={() => setSortOpen(false)}
          anchor={
            <Button
              mode="outlined"
              compact
              onPress={() => setSortOpen(true)}
              style={styles.anchorButton}
              icon="sort"
            >
              {sortLabel}
            </Button>
          }
        >
          {sortOptions.map(({ value, label }) => (
            <Menu.Item
              key={String(value)}
              onPress={() => {
                setSortBy(value);
                setSortOpen(false);
              }}
              title={label}
            />
          ))}
        </Menu>
      </ScrollView>
    </View>
  );
};
