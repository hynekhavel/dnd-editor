/** @jsxImportSource @emotion/react */
import { memo } from "react";

import {
  TYPE_TEXT,
  TYPE_IMAGE,
  TYPE_VIDEO,
  WIDGET_WIDTH,
  WIDGET_HEIGHT,
} from "../configs";

const Widget = ({
  index,
  item,
  selectedItem,
  onMouseDown,
  onMouseUp,
  deleteItem,
}) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: `${WIDGET_WIDTH}px`,
        height: `${WIDGET_HEIGHT}px`,
        position: "absolute",
        border: "1px solid #000",
        boxShadow:
          index === selectedItem ? "0px 0px 20px 5px rgba(0,0,0,0.5)" : "none",
        zIndex: index === selectedItem ? 9999 : "auto",
      }}
      style={{ top: `${item.posY}px`, left: `${item.posX}px` }}
      onMouseUp={onMouseUp}
    >
      <div
        css={{
          display: "flex",
          width: "100%",
          height: "30px",
          flexShrink: 0,
          background: "#ccc",
          cursor: "grab",
        }}
      >
        <div
          css={{
            width: "100%",
          }}
          onMouseDown={onMouseDown}
        ></div>
        <button
          onClick={deleteItem}
          css={{
            lineHeight: "30px",
            width: "30px",
            height: "30px",
            padding: 0,
            marginLeft: "auto",
            background: "transparent",
            border: 0,
            color: "#000",
            cursor: "pointer",
            outline: "none",
          }}
        >
          ✖
        </button>
      </div>

      <div
        css={{
          display: "flex",
          overflowY: "auto",
          height: "100%",
          background: "#FFF",
        }}
      >
        {item.type === TYPE_TEXT && (
          <p
            css={{
              padding: "10px",
              margin: 0,
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
        )}
        {item.type === TYPE_IMAGE && (
          <img
            src="https://dummyimage.com/600x300/FFF/000.jpg"
            alt="placeholder"
            css={{
              width: "100%",
            }}
          />
        )}
        {item.type === TYPE_VIDEO && (
          <video
            css={{
              width: "100%",
              height: "100%",
            }}
            controls
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          >
            Your browser doesn't support the video tag. You can{" "}
            <a href="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">
              download the video here.
            </a>
          </video>
        )}
      </div>
    </div>
  );
};

export default memo(Widget);
