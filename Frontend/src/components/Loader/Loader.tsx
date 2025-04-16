import "./Loader.css"; // Importing the CSS for styling

const Loader = ({ text, textColor }: { text: string; textColor: string }) => {
  return (
    <div className={`loader ${textColor}`}>
      <span className={`loaderText ${textColor}`}>{text}</span>
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
