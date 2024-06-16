import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  // sideText: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle,  }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween color={palette.grey[100]} margin="1.7rem 1rem 0 1rem">
      <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
          <Typography variant="h5">{subtitle}</Typography>
        </Box>
      </FlexBetween>
      <Typography variant="h4" fontWeight="900" color={palette.secondary[300]}>
        {/* {sideText} */}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;
