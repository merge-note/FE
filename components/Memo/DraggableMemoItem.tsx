import tw from "twin.macro";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Trash from "../../public/icons/Trash.svg";
import Pencil from "../../public/icons/Pencil.svg";

const DraggableMemoItem = ({ id, content, createdAt }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <MemoItem ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <MemoItemHeader>
        <p>{createdAt}</p>
        <Buttons>
          <Trash width="14" height="14" />
          <Pencil width="14" height="14" />
        </Buttons>
      </MemoItemHeader>
      {content}
    </MemoItem>
  );
};

export default DraggableMemoItem;

const MemoItem = tw.div`h-1/5 bg-[#fff] border border-[#DDE1E6] px-3 py-2`;
const MemoItemHeader = tw.div`h-6 flex items-center justify-between text-xs text-[#697077]`;
const Buttons = tw.div`flex gap-2`;
