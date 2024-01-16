import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import FormatAlignRightOutlinedIcon from "@mui/icons-material/FormatAlignRightOutlined";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";
import FormatHeader1 from "mdi-material-ui/FormatHeader1";
import FormatHeader2 from "mdi-material-ui/FormatHeader2";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatText from "mdi-material-ui/FormatText";
import ImageIcon from "@mui/icons-material/Image";

export const eventTypes = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  formatUndo: "formatUndo",
  formatRedo: "formatRedo",
  formatBold: "formatBold",
  formatItalic: "formatItalic",
  formatStrike: "formatStrike",
  formatAlignLeft: "formatAlignLeft",
  formatAlignCenter: "formatAlignCenter",
  formatAlignRight: "formatAlignRight",
  insertImage: "insertImage",
};

const pluginsList = [
  {
    id: 1,
    Icon: FormatText,
    event: eventTypes.paragraph,
  },
  {
    id: 2,
    Icon: FormatHeader1,
    event: eventTypes.h1,
  },
  {
    id: 3,
    Icon: FormatHeader2,
    event: eventTypes.h2,
  },
  {
    id: 4,
    Icon: FormatListBulletedIcon,
    event: eventTypes.ul,
  },

  {
    id: 5,
    Icon: FormatListNumberedIcon,
    event: eventTypes.ol,
  },
  {
    id: 6,
    Icon: UndoOutlinedIcon,
    event: eventTypes.formatUndo,
  },
  {
    id: 7,
    Icon: RedoOutlinedIcon,
    event: eventTypes.formatRedo,
  },
  {
    id: 8,
    Icon: FormatBoldOutlinedIcon,
    event: eventTypes.formatBold,
  },
  {
    id: 9,
    Icon: FormatItalicOutlinedIcon,
    event: eventTypes.formatItalic,
  },

  {
    id: 10,
    Icon: ImageIcon,
    event: eventTypes.insertImage,
  },

  {
    id: 11,
    Icon: FormatAlignLeftOutlinedIcon,
    event: eventTypes.formatAlignLeft,
  },

  {
    id: 12,
    Icon: FormatAlignJustifyOutlinedIcon,
    event: eventTypes.formatAlignCenter,
  },
  {
    id: 13,
    Icon: FormatAlignRightOutlinedIcon,
    event: eventTypes.formatAlignRight,
  },
];

export default pluginsList;
