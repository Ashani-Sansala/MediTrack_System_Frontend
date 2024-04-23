import '../../styles/LongButton.css'

// eslint-disable-next-line react/prop-types
function LongButton({ onClick, children, className }) {
  return (
      <button className={`button ${className}`} onClick={onClick}>
          {children}
      </button>
  );
}

export default LongButton;
