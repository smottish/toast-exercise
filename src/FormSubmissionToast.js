import React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

function getFormSubmissionMessage(formSubmission) {
  if (!formSubmission || !formSubmission.data) {
    return "";
  }

  const firstName = formSubmission.data.firstName;
  const lastName = formSubmission.data.lastName;
  const email = formSubmission.data.email;
  return `${firstName} ${lastName} ${email}`;
}

export default function FormSubmissionToast({
  formSubmission,
  likeFailed,
  likePending,
  onLike,
  onClose,
  open,
}) {
  const toastAction = (
    <React.Fragment>
      <Button
        disabled={likePending}
        onClick={onLike}
      >
        {likeFailed ? 'Oops, please try again...Like' : 'Like'}
      </Button>
      <IconButton
        disabled={likePending}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </React.Fragment>
  );
  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      message={getFormSubmissionMessage(formSubmission)}
      onClose={onClose}
      action={toastAction}
    />
  );
}