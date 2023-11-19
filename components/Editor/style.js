import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { styled } from "@mui/material";

export const MuiContentEditable = styled(ContentEditable)({
  minHeight: 200,
  width: "100%",
  padding: "0 8px",
  borderRadius: 5,
  paddingTop: 2,
  paddingLeft: 10,
  position: "relative",
  outline: "none",
});

export const placeHolderSx = {
  position: "absolute",
  top: "16px",
  left: "26px",
  userSelect: "none",
  display: "inline-block",
  pointerEvents: "none",
};
