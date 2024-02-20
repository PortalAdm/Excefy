import { waitFor } from '@testing-library/react';
import { api } from '~/src/app/shared/services/axios/api';

jest.mock('~/src/app/shared/services/axios/api');

let mockApi: {
  post: jest.MockedFunction<typeof api.post>;
};

beforeEach(() => {
  mockApi = {
    post: jest.fn()
  };
});

describe('authentication', () => {
  it('should call post method', async () => {
    const endpoint = '/token';
    const body = {
      grant_type: 'password',
      username: 'John Doe',
      password: '123456789'
    };

    await mockApi.post(endpoint, body);
    await waitFor(() => {
      expect(mockApi.post.mock.calls[0][0]).toMatch(endpoint);
      expect(mockApi.post.mock.calls[0][1]).toHaveProperty('grant_type', body.grant_type);
      expect(mockApi.post.mock.calls[0][1]).toHaveProperty('username', body.username);
      expect(mockApi.post.mock.calls[0][1]).toHaveProperty('password', body.password);
    });
  });
});
