import "./styles.css";
import Prototype from "prop-types";

export const PostCard = ({ cover, title, body, id }) => {
	return (
		<div className="post">
			<img className="post-img" src={cover} alt={title} />
			<div className="post-content">
				<h2 className="title-1">
					{title} {" " + id}
				</h2>
				<p className="text">{body}</p>
			</div>
		</div>
	);
};

PostCard.propTypes = {
	cover: Prototype.string.isRequired,
	title: Prototype.string.isRequired,
	body: Prototype.string.isRequired,
	id: Prototype.number.isRequired,
};
