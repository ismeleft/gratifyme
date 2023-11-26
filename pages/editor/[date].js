import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Editor from "../../components/Editor/Editor";
import Nav from "@/components/Nav/Nav";
import { ThemeProvider } from "@emotion/react";
import theme from "@/components/Editor/theme/editor";
import { CssBaseline, Grid, Typography, Box } from "@mui/material";
import "../../components/Editor/style";
import styles from "../../styles/page.module.css";
import MobileBackground from "@/components/MobileBackground/MobileBackground";

export default function CalendarDatePage() {
  const router = useRouter();
  const { date } = router.query;

  // useEffect(() => {
  //   // 處理程式導航
  //   const handleRouteChange = (url) => {
  //     if (!window.confirm("您確定要離開這個頁面嗎？請記得存檔")) {
  //       throw "routeChange aborted.";
  //     }
  //   };

  //   // 處理瀏覽器動作（前進、後退）
  //   const handleBeforePopState = () => {
  //     return window.confirm("您確定要離開這個頁面嗎？請記得存檔");
  //   };

  //   router.events.on("routeChangeStart", handleRouteChange);
  //   router.beforePopState(handleBeforePopState);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //     // beforePopState 不需要解除綁定，因為它僅對當前頁面生效
  //   };
  // }, [router]);
  // 根據日期顯示相應的內容
  return (
    <div className={styles.editorWrapper}>
      <Nav className={styles.editorNav} />
      <MobileBackground className={styles.mobileBackground} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid
          container
          className={styles.muiContainer}
          sx={{
            minHeight: "100vh",
            maxWidth: "1200px",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Grid
            item
            sx={{
              mt: 10,
              padding: "30px",
              flexBasis: "90% !important",
              maxWidth: "none !important",
              [theme.breakpoints.up("md")]: {
                flexBasis: "50% !important",
              },
            }}
          >
            {" "}
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
          <Grid
            item
            sx={{
              mt: 10,
              padding: "30px",
              flexBasis: "90% !important",
              maxWidth: "none !important",
              [theme.breakpoints.up("md")]: {
                flexBasis: "50% !important",
              },
            }}
          >
            <Editor date={date} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
