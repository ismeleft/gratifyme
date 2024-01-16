import { Grid } from "@mui/material";
import pluginsList from "./toolbarIcon";
import useOnClick from "./useOnClick";
import { createPortal } from "react-dom";
import FloatingLinkEditor from "./FloatLinkEditor/editor";
import { Point } from "lexical";

const Toolbar = () => {
  const { onClick, selectedEventTypes, blockType, isLink, editor, modal } =
    useOnClick();
  return (
    <Grid
      container
      sx={{
        background: "white",
        width: "100%",
        py: 1,
        px: 1,
        borderRadius: "10px 10px 0px 0px",
        cursor: "pointer",
      }}
      justifyContent="space-between"
    >
      {pluginsList.map((plugin) => (
        <Grid item key={plugin.id}>
          <plugin.Icon onClick={() => onClick(plugin.event)} />
        </Grid>
      ))}
      {isLink &&
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
      {modal}
    </Grid>
  );
};

export default Toolbar;
