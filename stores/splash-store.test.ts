import { useSplashStore } from './splash-store';

function getState() {
  return useSplashStore.getState();
}

describe('splash-store', () => {
  beforeEach(() => {
    useSplashStore.setState({ appReady: false });
  });

  it('starts with appReady false', () => {
    expect(getState().appReady).toBe(false);
  });

  it('finishSplash sets appReady to true', () => {
    getState().finishSplash();
    expect(getState().appReady).toBe(true);
  });
});
