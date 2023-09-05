import { render } from '@testing-library/react';
import { ThemeContext } from '~contexts/ThemeProvider';
import { Title } from '..';

describe('<Title />', () => {
  it('should render without errors', () => {
    const { getByText } = render(<Title title="Teste" />);

    const text = getByText('Teste');
    expect(text).toBeInTheDocument();
  });

  it('should render with h2 element', () => {
    const { getByRole } = render(<Title title="Teste as prop" as="h2" />);

    const title = getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('should apply "size" prop correctly', () => {
    const { container } = render(<Title title="Hello World!" size="2xl" />);

    expect(container.firstChild).toHaveClass('text-2xl');
  });

  it('should apply correctly dark mode text color', () => {
    const { container } = render(
      <ThemeContext.Provider value={{ theme: 'dark' }}>
        <Title title="Hello World!" />
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toHaveClass('text-white');
  });

  it('should not broken with light mode', () => {
    const { container } = render(
      <ThemeContext.Provider value={{ theme: 'light' }}>
        <Title title="Hello World!" />
      </ThemeContext.Provider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
