import Prototype from "prop-types";
import { PostCard } from "../PostCard";
import "./styles.css";

export const Post = ({ posts = [] }) => (
	<div className="posts">
		{posts.map((post) => (
			<PostCard
				key={post.id}
				cover={post.cover}
				title={post.title}
				body={post.body}
				id={post.id}
			/>
		))}
	</div>
);

Post.defaultProps = {
	posts: [],
};

Post.propTypes = {
	posts: Prototype.array,
};
