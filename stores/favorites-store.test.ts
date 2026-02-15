import { useFavoritesStore } from './favorites-store';

jest.unmock('@stores/favorites-store');

function getState() {
  return useFavoritesStore.getState();
}

describe('favorites-store', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  it('starts with no favorites', () => {
    expect(getState().favoriteIds).toEqual([]);
    expect(getState().isFavorite(1)).toBe(false);
  });

  it('toggleFavorite adds id when not present', () => {
    getState().toggleFavorite(1);
    expect(getState().favoriteIds).toEqual([1]);
    expect(getState().isFavorite(1)).toBe(true);
  });

  it('toggleFavorite removes id when present', () => {
    getState().toggleFavorite(1);
    getState().toggleFavorite(1);
    expect(getState().favoriteIds).toEqual([]);
    expect(getState().isFavorite(1)).toBe(false);
  });

  it('removeFavorite removes the id', () => {
    getState().toggleFavorite(1);
    getState().toggleFavorite(2);
    getState().removeFavorite(1);
    expect(getState().favoriteIds).toEqual([2]);
    expect(getState().isFavorite(1)).toBe(false);
    expect(getState().isFavorite(2)).toBe(true);
  });
});
