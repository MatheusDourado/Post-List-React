import Prototype from "prop-types";
import "./styles.css";

export const Button = ({ text, onClick, disabled }) => (
	<button disabled={disabled} className="btn" onClick={onClick}>
		{text}
	</button>
);

Button.defaultProps = {
	disabled: false,
};

Button.propTypes = {
	text: Prototype.string.isRequired,
	onClick: Prototype.func.isRequired,
	disabled: Prototype.bool,
};
