import {
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const medium = palette.neutral.medium;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); 

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
  } = user;

  return (
    <WidgetWrapper onClick={() => navigate(`/profile/${userId}`)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
      {/* FIRST ROW */}
      <Box display="flex" alignItems="center" gap="1rem" p="1.1rem 0">
        <UserImage image={picturePath} />
        <Box>
          <Typography variant="h4" fontWeight="500" color={palette.neutral.dark}>
            {firstName} {lastName}
          </Typography>
          <Typography color={medium}>Foto de perfil</Typography>
        </Box>
      </Box>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: palette.neutral.main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: palette.neutral.main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;








