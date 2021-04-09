/** @jsxImportSource @emotion/react */

import { useState, useRef, useEffect, useCallback } from "react";
import { useDrop } from "react-dnd";
import composeRefs from "@seznam/compose-react-refs";
import memoize from "fast-memoize";

import DragItem from "./DragItem";
import Widget from "./Widget";

import {
  TYPE_TEXT,
  TYPE_IMAGE,
  TYPE_VIDEO,
  DND_TYPE,
  WIDGET_WIDTH,
  WIDGET_HEIGHT,
} from "../configs";

const Editor = () => {
  const [editorItems, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const cursorPos = useRef({
    x: 0,
    y: 0,
  });
  const dropEl = useRef();

  const onDrag = (e) => {
    cursorPos.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  // eslint-disable-next-line
  const onMouseDown = useCallback(
    memoize((i) => (e) => {
      e.preventDefault();

      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSelectedItem(i);
      setDraggedItem({
        index: i,
        offsetX: x,
        offsetY: y,
      });
    }),
    []
  );

  const onMouseUp = useCallback(() => setDraggedItem(null), []);

  // eslint-disable-next-line
  const deleteItem = useCallback(
    memoize((i) => (e) => {
      setItems((prevItems) => prevItems.filter((item, index) => i !== index));
      setSelectedItem(null);
    }),
    []
  );

  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.code === "Backspace" || e.code === "Delete") {
        deleteItem(selectedItem)();
      }
    };

    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [selectedItem, deleteItem]);

  useEffect(() => {
    const editorState = localStorage.getItem("editorState");

    if (editorState) {
      setItems(JSON.parse(editorState));
    }

    window.addEventListener("drag", onDrag);

    return () => {
      window.removeEventListener("drag", onDrag);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("editorState", JSON.stringify(editorItems));
  }, [editorItems]);

  const [, drop] = useDrop(() => ({
    accept: DND_TYPE,
    drop: (item, monitor) => {
      return setItems((prevItems) => {
        setSelectedItem(prevItems.length);
        return prevItems.concat([
          {
            posX:
              cursorPos.current.x -
              dropEl.current.offsetLeft -
              Math.floor(WIDGET_WIDTH / 2),
            posY:
              cursorPos.current.y -
              dropEl.current.offsetTop -
              Math.floor(WIDGET_HEIGHT / 2),
            type: item.type,
          },
        ]);
      });
    },
  }));

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        css={{
          display: "flex",
          height: "100%",
        }}
      >
        <div
          css={{
            width: "auto",
            background: "#ccc",
            position: "relative",
          }}
        >
          <DragItem type={TYPE_TEXT} />
          <DragItem type={TYPE_IMAGE} />
          <DragItem type={TYPE_VIDEO} />
        </div>
        <div
          ref={composeRefs(dropEl, drop)}
          css={{
            width: "100%",
            background: "#FFF",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseMove={(e) => {
            if (draggedItem !== null) {
              const x = e.clientX - dropEl.current.offsetLeft;
              const y = e.clientY - dropEl.current.offsetTop;

              setItems(
                editorItems.map((item, i) => {
                  if (i === draggedItem.index) {
                    return {
                      ...item,
                      posX: x - draggedItem.offsetX,
                      posY: y - draggedItem.offsetY,
                    };
                  }

                  return item;
                })
              );
            }
          }}
        >
          {editorItems.map((item, i) => (
            <Widget
              key={i}
              item={item}
              index={i}
              selectedItem={selectedItem}
              onMouseDown={onMouseDown(i)}
              onMouseUp={onMouseUp}
              deleteItem={deleteItem(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
