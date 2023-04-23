import { DefaultElement, RenderElementProps } from "slate-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS, Transform } from "@dnd-kit/utilities";

const DragHandle = (props) => {
  const { attributes, listeners } = props;

  return (
    <div
      contentEditable={false}
      style={{
        marginRight: "10px",
        cursor: "pointer",
        width: "10px",
        height: "auto",
        backgroundColor: "black",
      }}
      {...attributes}
      {...listeners}
    ></div>
  );
};

const CustomElement = (props: RenderElementProps) => {
  const { attributes, element } = props;
  const {
    attributes: sortableAttributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: element.id,
  });

  const style = {
    display: "flex",
    padding: "2px",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const combinedAttributes = {
    ...attributes,
    ...sortableAttributes,
  };

  return (
    <div style={style} {...combinedAttributes}>
      <DragHandle attributes={sortableAttributes} listeners={listeners} />
      <DefaultElement {...props} />
    </div>
  );
};

export default CustomElement;
