import React from "react";
import Editor from "../components/Editor/Editor";
import { ThemeProvider } from "@emotion/react";
import theme from "@/components/Editor/theme/editor";
import { CssBaseline, Grid, Typography, Box } from "@mui/material";
import "../styles/style";
import styles from "../styles/page.module.css";

const editor = () => {
  return (
    <div className={styles.editorWrapper}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          sx={{ minHeight: "100vh", maxWidth: "1200px" }}
          // alignItems="center"
          // flexDirection="column"
        >
          <Grid item xs={6} sx={{ padding: "2em" }}>
            <Typography variant="h4">Gratitude journal</Typography>
            <Typography variant="p" sx={{ lineHeight: "30px" }}>
              Gratitude journaling can include the following 4 things: <br /> 01
              Moment of Gratitude: Record 3 things worth being grateful for, and
              remember to keep at least the last one for yourself. <br /> 02
              Moments of loss: Record your moments of loss, learn to face low
              moments and setbacks, and add a comforting word to cheer yourself
              up. <br /> 03 Heroic Moments: Record your heroes, who helped you?
              How would you like to thank the person? <br /> 04 "Your" hero
              moment: Record the moment when you became a hero to others. Who
              did you help?
            </Typography>
          </Grid>
          <Grid item sx={1}>
            <Box
              sx={{
                width: "2px",
                height: "100%",
                bgcolor: "background.default",
                boxShadow: "rgba(0,0,0,0.5) 0 1em 3em",
              }}
            />
          </Grid>

          <Grid item xs={5} sx={{ mt: 5, marginLeft: "20px" }}>
            <Editor />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default editor;
