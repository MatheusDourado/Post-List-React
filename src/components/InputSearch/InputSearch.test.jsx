import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputSearch } from ".";

describe("<InputSearch/>", () => {
	test("should call handleChange function on each key pressed", () => {
		const fn = jest.fn();
		render(<InputSearch handleChange={fn} searchValue="testing..." />);

		const input = screen.getByPlaceholderText(/digite aqui/i);
		const value = "testing";

		userEvent.type(input, value);

		expect(input.value).toBe("testing...");
		expect(fn).toHaveBeenCalledTimes(value.length);
	});

	test("should have a value of searchValue", () => {
		const fn = jest.fn();
		render(<InputSearch handleChange={fn} searchValue={"testing"} />);

		const value = "testing";
		userEvent.type(screen.getByPlaceholderText("Digite aqui..."), value);

		expect(screen.getByPlaceholderText("Digite aqui...").value).toBe(value);
		expect(fn).toHaveBeenCalledTimes(value.length);
	});

	test("should match snaphot", () => {
		const fn = jest.fn();
		const { container } = render(
			<InputSearch handleChange={fn} searchValue="" />
		);

		expect(container.firstChild).toMatchSnapshot();
	});
});
