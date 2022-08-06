import { Badge } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
// import ContactPageIcon from "@mui/icons-material/ContactPage";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Icons = [
  {
    id: 1,
    name: "Home",
    icon: (index, onClick, color) => (
      <HomeIcon
        sx={{ fontSize: 30, color: color }}
        onClick={() => onClick(index)}
      />
    ),
    path: "/",
    auth: false,
  },
  {
    id: 2,
    name: "Events",
    icon: (index, onClick, color) => (
      <EmojiEventsIcon
        sx={{ fontSize: 30, color: color }}
        onClick={() => onClick(index)}
      />
    ),
    path: "/events",
    auth: false,
  },
  {
    id: 3,
    name: "Teams",
    icon: (index, onClick, color) => (
      <GroupsIcon
        sx={{ fontSize: 30, color: color }}
        onClick={() => onClick(index)}
      />
    ),
    path: "/teams",
    auth: false,
  },
  {
    id: 4,
    name: "Notifications",
    icon: (index, onClick, color) => (
      <Badge badgeContent={2} color="primary">
        <NotificationsActiveIcon
          sx={{ fontSize: 30, color: color }}
          onClick={() => onClick(index)}
        />
      </Badge>
    ),
    path: "/notifications",
    auth: false,
  },
  {
    id: 5,
    name: "Profile",
    icon: (index, onClick, color) => (
      <AccountCircleIcon
        sx={{ fontSize: 30, color: color }}
        onClick={() => onClick(index)}
      />
    ),
    path: "/profile",
    auth: true,
  },
];
