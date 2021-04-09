import { Global, css } from "@emotion/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Editor from "./components/Editor";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: "Segoe UI", Arial;
          }
        `}
      />
      <Editor />
    </DndProvider>
  );
}

export default App;
