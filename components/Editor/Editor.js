import React from "react";
import { $getRoot, $getSelection } from "lexical";
import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MuiContentEditable, placeHolderSx } from "@/styles/style";
import { Box } from "@mui/material";
import { mt } from "date-fns/locale";
import Toolbar from "./ToolBar/toolbar";
import styles from "./Editor.module.css";

const theme = {};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}
function onError(error) {
  console.error(error);
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbar />
      <Box
        sx={{
          position: "relative",
          background: "white",
          paddingTop: "16px",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <PlainTextPlugin
          contentEditable={<MuiContentEditable />}
          placeholder={<Box sx={placeHolderSx}>Enter your text here</Box>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </Box>
      <button className={styles.diarySubmit}>Submit</button>
    </LexicalComposer>
  );
}
