import { Box, Card, CardContent, Container } from "@mui/material";

export default function AuthLayout({children}) {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>

            {children}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
