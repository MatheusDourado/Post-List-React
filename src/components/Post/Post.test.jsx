import { render, screen } from "@testing-library/react";
import { Post } from ".";

const props = {
	posts: [
		{
			id: 1,
			title: "title 1",
			body: "body 1",
			cover: "img/img1.png",
		},
		{
			id: 2,
			title: "title 2",
			body: "body 2",
			cover: "img/img2.png",
		},
		{
			id: 3,
			title: "title 3",
			body: "body 3",
			cover: "img/img3.png",
		},
	],
};

describe("<Post />", () => {
	test("should render posts", () => {
		render(<Post {...props} />);

		expect(
			screen.getAllByRole("heading", { name: props.title })
		).toHaveLength(3);
		expect(screen.getAllByRole("img", { name: props.title })).toHaveLength(
			3
		);
		expect(screen.getAllByText(/body/i)).toHaveLength(3);
	});

	test("should not render posts", () => {
		render(<Post />);

		expect(
			screen.queryByRole("heading", { name: props.title })
		).not.toBeInTheDocument();
	});

	test("should match snaphot", () => {
		const { container } = render(<Post {...props} />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
