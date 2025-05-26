import React from 'react'
import {Box, Typography} from '@mui/material'

const Title = ({heading}) => {
  return (
    <Box>
    <Typography
      variant="h2"
      sx={{
        color: "#A0A0A0",
        fontFamily: "'Jost', sans-serif",
        fontSize: "13px",
        fontWeight: "500",
        textTransform: "uppercase",
        lineHeight: "1",
      }}
    >
      Manage
    </Typography>
    <Typography
      sx={{
        mt: 1,
        color: "#111111",
        fontFamily: '"Jost", Sans-serif',
        fontSize: "36px",
        fontWeight: "500",
      }}
    >
      {heading} :
    </Typography>
  </Box>
  )
}

export default Title