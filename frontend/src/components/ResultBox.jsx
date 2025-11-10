import { Card, CardContent, Typography } from "@mui/material";

export default function ResultBox({ title, children }) {
  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
