import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button/>", () => {
	test('Should render the button with the text "Load More"', () => {
		const fn = jest.fn();
		render(<Button text="Load More" onClick={fn} />);

		const button = screen.getByRole("button", { name: /load more/i });
		expect(button).toBeInTheDocument();
	});

	test("should call function on button click", () => {
		const fn = jest.fn();
		render(<Button text="Load More" onClick={fn} />);

		const button = screen.getByRole("button", { name: /load more/i });
		userEvent.click(button);

		expect(fn).toHaveBeenCalledTimes(1);
	});

	test("should be disabled when disabled is true", () => {
		const fn = jest.fn();
		render(<Button text="Load More" disabled={true} onClick={fn} />);

		const button = screen.getByRole("button", { name: /load more/i });

		expect(button).toBeDisabled();
	});

	test("should be enabled when disabled is false", () => {
		const fn = jest.fn();
		render(<Button text="Load More" disabled={false} onClick={fn} />);

		const button = screen.getByRole("button", { name: /load more/i });

		expect(button).toBeEnabled();
	});

	test("should match snaphot", () => {
		const fn = jest.fn();
		const { container } = render(
			<Button text="Load More" disabled={false} onClick={fn} />
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
