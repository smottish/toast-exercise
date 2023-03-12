import React from 'react';

import Typography from '@mui/material/Typography';

function getLikedSubmissionText(formSubmission) {
  if (!formSubmission || !formSubmission.data) {
    return ""
  }

  const firstName = formSubmission.data.firstName;
  const lastName = formSubmission.data.lastName;
  const email = formSubmission.data.email;
  return `${firstName} ${lastName} ${email}`
}

export default function LikedSubmissions({
  submissions,
  fetchLikedPending,
  fetchLikedFailed,
}) {
  if (fetchLikedPending) {
    return <Typography>Retrieving liked submissions...</Typography>
  } else if (fetchLikedFailed) {
    return (
      <Typography>
        Sorry, couldn't retrieve liked submissions. Please refresh the page
      </Typography>
    )
  } else if (submissions.length === 0) {
    return (
      <Typography>
        No liked submissions
      </Typography>
    )
  }

  return submissions.map((submission) => (
    <Typography key={submission.id}>
      {getLikedSubmissionText(submission)}
    </Typography>
  ))
}