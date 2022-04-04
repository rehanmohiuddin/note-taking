import useContextMenu from "../../hooks/useContextMenu";
import "./index.css";

const Index = ({ children }) => {
  const { xPosition, yPosition, showMenu } = useContextMenu();

  return (
    <>
      {showMenu && (
        <div
          className="context-menu-container"
          style={{
            top: yPosition,
            left: xPosition,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Index;
