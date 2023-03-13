import React from 'react';
import { screen, render } from '@testing-library/react';
import { getMockFormSubmission } from './testUtils';
import LikedSubmissions from './LikedSubmissions';

const TEST_FORM_SUBMISSIONS = [
  getMockFormSubmission({ liked: true }),
  getMockFormSubmission({ liked: true }),
  getMockFormSubmission({ liked: true }),
];

test('renders an empty list of liked submissions', () => {
  render(
    <LikedSubmissions
      submissions={[]}
      fetchLikedFailed={false}
      fetchLikedPending={false}
    />
  );

  const message = screen.getByText(/no liked submissions/i);
  expect(message).toBeInTheDocument();
});

test('renders a list of liked submissions', () => {
  render(
    <LikedSubmissions
      submissions={TEST_FORM_SUBMISSIONS}
      fetchLikedFailed={false}
      fetchLikedPending={false}
    />
  );

  const submissions = screen.getAllByTestId("liked-submission");
  expect(submissions).toHaveLength(TEST_FORM_SUBMISSIONS.length);
});

test('renders fetching liked submissions pending state', () => {
  render(
    <LikedSubmissions
      submissions={[]}
      fetchLikedFailed={false}
      fetchLikedPending={true}
    />
  );

  const message = screen.getByText(/retrieving/i);
  expect(message).toBeInTheDocument();
});

test('renders fetching liked submissions failure state', () => {
  render(
    <LikedSubmissions
      submissions={[]}
      fetchLikedFailed={true}
      fetchLikedPending={false}
    />
  );

  const message = screen.getByText(
    /sorry, couldn't retrieve liked submissions/i
  );
  expect(message).toBeInTheDocument();
});