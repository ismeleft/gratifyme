import { Grid } from "@mui/material";
import pluginsList from "./toolbarIcon";
import useOnClick from "./useOnClick";

const Toolbar = () => {
  const { onClick } = useOnClick();
  return (
    <Grid
      container
      sx={{
        background: "white",
        width: "100%",
        py: 1,
        px: 1,
        borderRadius: "10px 10px 0px 0px",
      }}
      justifyContent="space-between"
    >
      {pluginsList.map((plugin) => (
        <Grid item key={plugin.id}>
          <plugin.Icon onClick={() => onClick(plugin.event)} />
        </Grid>
      ))}
    </Grid>
  );
};

// mdi-material-ui

export default Toolbar;
