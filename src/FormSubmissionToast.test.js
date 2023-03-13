import React from 'react';
import { screen, render, within } from '@testing-library/react';
import { getMockFormSubmission } from './testUtils';
import FormSubmissionToast from './FormSubmissionToast';

const TEST_FORM_SUBMISSION = getMockFormSubmission();

test('renders new form submission toast', () => {
  render(
    <FormSubmissionToast
      open={true}
      formSubmission={TEST_FORM_SUBMISSION}
      likeFailed={false}
      likePending={false}
      onLike={() => {}}
      onClose={() => {}}
    />
  );

  const toast = screen.getByRole('alert');
  expect(toast).toBeInTheDocument();
  const firstName = within(toast).getByText(
    TEST_FORM_SUBMISSION.data.firstName,
    { exact: false },
  );
  expect(firstName).toBeInTheDocument();
});

test('renders like failed state', () => {
  render(
    <FormSubmissionToast
      open={true}
      formSubmission={TEST_FORM_SUBMISSION}
      likeFailed={true}
      likePending={false}
      onLike={() => {}}
      onClose={() => {}}
    />
  );

  const likeButton = screen.getByRole('button', {
    name: /oops/i,
  });
  expect(likeButton).toBeInTheDocument();
});

test('renders like pending state', () => {
  render(
    <FormSubmissionToast
      open={true}
      formSubmission={TEST_FORM_SUBMISSION}
      likePending={true}
      likeFailed={false}
      onLike={() => {}}
      onClose={() => {}}
    />
  );

  const likeButton = screen.getByRole('button', {
    name: /like/i,
  });
  expect(likeButton).toHaveAttribute('disabled');
});