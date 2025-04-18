'use client'

import { useState, useTransition } from 'react'
import { TextField, Button, FormHelperText, Box } from '@mui/material'
import { createShortUrl } from '@/lib/urlShortener'
import { MP5Props } from '@/types'

export default function UrlShortenerForm() {
  const [alias, setAlias] = useState('')
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setShortUrl('')

    startTransition(async () => {
      const result = await createShortUrl(new FormData(e.target as HTMLFormElement))

      if ('error' in result) {
        setError(result.error)
      } else {
        const { alias } = result as MP5Props
        const res = window.location.origin
        const short = `${res}/${alias}`
        setShortUrl(short)
      }
    })
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        p: 3,
        borderRadius: 2,
        backgroundColor: '#e0f7fa',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <TextField
        name="alias"
        label="Custom Alias"
        variant="filled"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        required
        fullWidth
      />
      <TextField
        name="url"
        label="Full URL"
        variant="filled"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        fullWidth
        placeholder="https://example.com"
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
      {shortUrl && (
        <FormHelperText>
          Short URL created:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
            {shortUrl}
          </a>
        </FormHelperText>
      )}
      <Button
        type="submit"
        variant="contained"
        disabled={isPending}
        sx={{ alignSelf: 'center', width: '150px' }}
      >
        {isPending ? 'Submitting...' : 'Shorten URL'}
      </Button>
    </Box>
  )
}
