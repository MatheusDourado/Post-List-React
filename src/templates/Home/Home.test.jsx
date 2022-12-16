import { rest } from "msw";
import { setupServer } from "msw/node";

import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from ".";
import userEvent from "@testing-library/user-event";

const handlers = [
	rest.get(
		"https://jsonplaceholder.typicode.com/posts",
		async (request, response, context) => {
			return response(
				context.json([
					{
						userId: 1,
						id: 1,
						title: "title1",
						body: "body1",
					},
					{
						userId: 2,
						id: 2,
						title: "title2",
						body: "body2",
					},
					{
						userId: 3,
						id: 3,
						title: "title3",
						body: "body3",
					},
				])
			);
		}
	),
	rest.get(
		"https://jsonplaceholder.typicode.com/photos",
		async (request, response, context) => {
			return response(
				context.json([
					{
						url: "img1.png",
					},
					{
						url: "img2.png",
					},
					{
						url: "img3.png",
					},
				])
			);
		}
	),
];
const server = setupServer(...handlers);

describe("<Home/>", () => {
	beforeAll(() => {
		server.listen();
	});

	afterEach(() => server.resetHandlers());

	afterAll(() => {
		server.close();
	});

	test("should render search, posts and load more", async () => {
		render(<Home />);

		expect.assertions(3);

		const noMorePosts = screen.getByText("not found");
		await waitForElementToBeRemoved(noMorePosts);

		const search = screen.getByPlaceholderText(/digite aq/i);
		expect(search).toBeInTheDocument();

		const images = screen.getAllByRole("img", { name: /title/i });
		expect(images).toHaveLength(2);

		const button = screen.getByRole("button", { name: /load posters/i });
		expect(button).toBeInTheDocument();
	});
	test("should search for posts", async () => {
		render(<Home />);

		expect.assertions(11);

		const noMorePosts = screen.getByText("not found");
		await waitForElementToBeRemoved(noMorePosts);

		const search = screen.getByPlaceholderText(/digite aq/i);

		expect(
			screen.getByRole("heading", { name: /title1/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /title2/i })
		).toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: /title3/i })
		).not.toBeInTheDocument();

		userEvent.type(search, "title1");
		expect(
			screen.getByRole("heading", { name: /title1 1/i })
		).toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: /title2/i })
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: /title3/i })
		).not.toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: "Search value: title1" })
		).toBeInTheDocument();

		userEvent.clear(search);
		expect(
			screen.getByRole("heading", { name: /title1/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /title2/i })
		).toBeInTheDocument();
		expect(
			screen.queryByRole("heading", { name: /title3/i })
		).not.toBeInTheDocument();

		userEvent.type(search, "testing");
		expect(screen.getByText(/not found/i)).toBeInTheDocument();
	});

	test("should load posters", async () => {
		render(<Home />);

		expect.assertions(2);

		const noMorePosts = screen.getByText("not found");
		await waitForElementToBeRemoved(noMorePosts);

		const button = screen.getByRole("button", { name: /load posters/i });

		userEvent.click(button);
		expect(
			screen.getByRole("heading", { name: /title3/i })
		).toBeInTheDocument();
		expect(button).toBeDisabled();
	});
});
