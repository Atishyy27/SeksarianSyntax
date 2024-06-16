import { useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <div className="nav">
    <FlexBetween mb="0.25rem" p="0.5rem 0rem 0.7rem" color={palette.grey[100]  }>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.70rem"  >
        <PixIcon sx={{ fontSize: "25px" }} />
        <Typography variant="h3" fontSize="20px">
          FinGuard
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem" p="0.5rem 0rem 0.7rem">
        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? "inherit" : palette.grey[100],
              textDecoration: "inherit",
            }}
          >
            Dashboard
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/Budgeting Tools"
            onClick={() => setSelected("Budgeting Tools")}
            style={{
              color: selected === "Budgeting Tools" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
           Budgeting Tools
          </Link>
        </Box>

        <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? "inherit" : palette.grey[700],
              textDecoration: "inherit",
            }}
          >
            Algorithms
          </Link>
        </Box>

      </FlexBetween>
    </FlexBetween>
    </div>
  );
};

export default Navbar;
