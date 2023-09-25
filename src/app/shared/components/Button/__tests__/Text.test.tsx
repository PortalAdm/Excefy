import { render } from '@testing-library/react';
import { ThemeContext } from '../../../contexts/ThemeProvider';
import { Text } from '../../Text';

describe('<Text />', () => {
  it('should render without errors', () => {
    render(<Text text="Hello world!" size="sm" />);
  });

  it('renders the correct element based on the "as" prop', () => {
    const { container } = render(<Text text="Hello world!" size="sm" as="span" />);

    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('should displays correctly text', () => {
    const { getByText } = render(<Text text="Hello world!" size="sm" />);

    expect(getByText('Hello world!')).toBeInTheDocument();
  });

  it('should apply correct size class', () => {
    const { container } = render(<Text text="hello world!" size="sm" />);

    expect(container.firstChild).toHaveClass('text-sm');
  });

  it('applies the correct weight class', () => {
    const { container } = render(<Text text="Hello world!" size="md" weigth="bold" />);

    expect(container.firstChild).toHaveClass('font-bold');
  });

  it("should use 'p' like component tag", () => {
    const { container } = render(<Text text="hello world!" />);

    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('should apply correctly dark mode text color', () => {
    const { container } = render(
      <ThemeContext.Provider value={{ theme: 'dark' }}>
        <Text text="Hello World!" />
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toHaveClass('text-white');
  });

  it('should not broken with light mode', () => {
    const { container } = render(
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <Text text="Hello World!" />
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
