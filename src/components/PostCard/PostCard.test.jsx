import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./mock";

const props = postCardPropsMock;

describe("<PostCard />", () => {
	test("should render PostCard correctly", () => {
		render(<PostCard {...props} />);

		expect(screen.getByAltText(props.title)).toHaveAttribute(
			"src",
			props.cover
		);
		expect(
			screen.getByRole("heading", { name: props.title + " 1" })
		).toBeInTheDocument();
		expect(screen.getByText(props.body)).toBeInTheDocument();
	});

	test("should match snaphot", () => {
		const { container } = render(<PostCard {...props} />);

		expect(container.firstChild).toMatchSnapshot();
	});
});
