import { Button as MuiButton, CircularProgress } from "@mui/material";

export default function Button({ text, loading, ...rest }) {
  return (
    <MuiButton
      variant="contained"
      fullWidth
      {...rest}
    >
      {loading ? <CircularProgress size={24} /> : text}
    </MuiButton>
  );
}
