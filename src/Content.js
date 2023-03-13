import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormSubmissionToast from './FormSubmissionToast';
import LikedSubmissions from './LikedSubmissions';
import Typography from '@mui/material/Typography';
import _cloneDeep from 'lodash.clonedeep';
import {
  onMessage,
  saveLikedFormSubmission,
  fetchLikedFormSubmissions,
} from './service/mockServer';

export default function Content() {
  const [newFormSubmission, setNewFormSubmission] = useState({});
  const [displayToast, setDisplayToast] = useState(false);
  const [likeFailed, setLikeFailed] = useState(false);
  const [likePending, setLikePending] = useState(false);
  const [fetchLikedPending, setFetchLikedPending] = useState(false);
  const [fetchLikedFailed, setFetchLikedFailed] = useState(false);
  const [likedSubmissions, setLikedSubmissions] = useState([]);

  useEffect(() => {
    function onNewFormSubmission(formSubmission) {
      setNewFormSubmission(formSubmission);
    }

    onMessage(onNewFormSubmission)
    // If mockServer had a method to unregister a callback, I'd
    // do that here in a useEffect cleanup function to avoid
    // a potential memory leak on component unmount/remount. This
    // component should only unmount/mount on page (re)load, so
    // there shouldn't be a memory leak in this case but it would
    // still be good practice to unregister the callback.
  }, []);

  useEffect(() => {
    async function fetchLiked() {
      setFetchLikedPending(true);
      try {
        const response = await fetchLikedFormSubmissions();
        setLikedSubmissions(response.formSubmissions);
      } catch(e) {
        setFetchLikedFailed(true);
      }
      setFetchLikedPending(false);
    }

    fetchLiked();
  }, [])

  useEffect(() => {
    if (newFormSubmission.id === undefined) {
      return;
    }

    setDisplayToast(true);
  }, [newFormSubmission.id]);

  function handleCloseToast(ev, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setDisplayToast(false);
    setNewFormSubmission({});
    setLikeFailed(false);
  }

  async function onLikeNewSubmission() {
    let formSubmission = _cloneDeep(newFormSubmission)

    formSubmission.data.liked = true
    setLikeFailed(false);

    try {
      setLikePending(true);
      await saveLikedFormSubmission(formSubmission);
      setLikePending(false);
      setNewFormSubmission({});
      setDisplayToast(false);
      setLikedSubmissions([
        ..._cloneDeep(likedSubmissions),
        formSubmission,
      ])
    } catch(e) {
      setLikePending(false);
      setLikeFailed(true);
    }
  }

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
      <LikedSubmissions
        submissions={likedSubmissions}
        fetchLikedFailed={fetchLikedFailed}
        fetchLikedPending={fetchLikedPending}
      />
      <FormSubmissionToast
        open={displayToast}
        formSubmission={newFormSubmission}
        likeFailed={likeFailed}
        likePending={likePending}
        onLike={onLikeNewSubmission}
        onClose={handleCloseToast}
      />
    </Box>
  );
}
