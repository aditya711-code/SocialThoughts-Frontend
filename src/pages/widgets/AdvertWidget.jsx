import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { BASE_URL } from "helper";
const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${BASE_URL}/assets/info4.jpg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        crossOrigin="anonymous"
      />
      <FlexBetween>
        <Typography color={main}>Nike Shoes</Typography>
        <Typography
          color={medium}
          sx={{
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          NikeShoes
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Just do it!
      </Typography>
    </WidgetWrapper>
  );
};
export default AdvertWidget;
