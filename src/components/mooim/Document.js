import React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

const Document = () => {
  const editor = useCreateBlockNote({
    defaultStyles: true,
  });

  return (
    <div>
      <BlockNoteView editor={editor} style={{ minHeight: "600px" }} />
    </div>
  );
};

export default Document;
