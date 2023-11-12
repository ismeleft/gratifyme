import { useRouter } from "next/router";
import React from "react";
import Editor from "../../components/Editor/Editor";
import Nav from "@/components/Nav/Nav";
import { ThemeProvider } from "@emotion/react";
import theme from "@/components/Editor/theme/editor";
import { CssBaseline, Grid, Typography, Box } from "@mui/material";
import "../../components/Editor/style";
import styles from "../../styles/page.module.css";

export default function CalendarDatePage() {
  const router = useRouter();
  const { date } = router.query;

  // 根據日期顯示相應的內容
  return (
    <div className={styles.editorWrapper}>
      <Nav className={styles.editorNav} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          sx={{ minHeight: "100vh", maxWidth: "1200px", width: "90%" }}
        >
          <Grid item xs={5} sx={{ padding: "3em", ml: 20, mt: 10 }}>
            <Typography variant="p" sx={{ fontSize: "30px" }}>
              Gratitude journal
            </Typography>
            <br />
            <Typography variant="p" sx={{ lineHeight: "35px" }}>
              Gratitude journaling can include the following 4 things: <br />
              Moment of Gratitude: Record 3 things worth being grateful for, and
              remember to keep at least the last one for yourself. <br />
              Moments of loss: Record your moments of loss, learn to face low
              moments and setbacks, and add a comforting word to cheer yourself
              up. <br />
              Heroic Moments: Record your heroes, who helped you? How would you
              like to thank the person? <br />
              Your hero moment: Record the moment when you became a hero to
              others. Who did you help?
            </Typography>
          </Grid>
          <Grid item xs={4.5} sx={{ mt: 10, ml: 2 }}>
            <Editor date={date} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
