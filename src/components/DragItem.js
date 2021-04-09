/** @jsxImportSource @emotion/react */
import { memo } from "react";

import { useDrag } from "react-dnd";
import { DND_TYPE } from "../configs";

const DragItem = ({ type }) => {
  const [, drag] = useDrag(
    () => ({
      type: DND_TYPE,
      item: { type },
    }),
    []
  );

  return (
    <div
      ref={drag}
      css={{
        width: "80px",
        height: "80px",
        marginBottom: "5px",
        cursor: "grab",
      }}
    >
      <div
        css={{
          width: "80px",
          height: "80px",
          background: "#000",
          color: "#FFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {type}
      </div>
    </div>
  );
};

export default memo(DragItem);
