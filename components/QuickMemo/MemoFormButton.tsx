interface Props {
  text: string;
  color: "blue" | "gray";
  onClick: () => void;
}

const MemoFormButton = (props: Props) => {
  const { text, onClick, color } = props;

  const bgColor = color === "blue" ? "bg-blue-400" : "bg-gray-400";
  const hoverColor =
    color === "blue" ? "hover:bg-blue-500" : "hover:bg-gray-500";

  return (
    <button
      className={`w-2/5 h-10 text-white ${bgColor} ${hoverColor} focus:outline-none`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MemoFormButton;
