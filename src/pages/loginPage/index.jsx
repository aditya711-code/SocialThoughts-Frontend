import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScrens = useMediaQuery("(min-width:1000px)");
  return (

    <Box
      width="100%"
      padding="1rem 6%"
      textAlign="center"
    >
      <Typography fontWeight="bold" fontSize="32px" color="primary">
        SocialThoughts
      </Typography>
      <Box
        width={isNonMobileScrens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SocialThoughts,Social Media for Expressing Your Thoughts!
        </Typography>
        <Form />
      </Box>
    </Box>

  );
};
export default LoginPage;
