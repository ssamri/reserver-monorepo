import { resources } from './translations';

describe('translations', () => {
  it('contains french namespace', () => {
    expect(resources.fr.common.welcome).toBeTruthy();
  });
});
