import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRedux from '../helpers/renderWithRedux'

describe('testing clicks', () => {
  beforeEach(cleanup);
  test('the page should has a button and a text 0', () => {
    const { queryByText } = renderWithRedux(<App />);
    const buttonAdicionar = queryByText('Clique aqui');

    expect(buttonAdicionar).toBeInTheDocument();
    expect(queryByText('0')).toBeInTheDocument();
  });

  test('the initial counter value should be 5', () => {
    const { queryByText } = renderWithRedux(<App />, { initialState: { clickReducer: { counter: 5 }}});

    expect(queryByText('5')).toBeInTheDocument();
  });

  test('a click in a button should increment the value of clicks', () => {
    renderWithRedux(<App />);

    expect(screen.getByText('0')).toBeInTheDocument();
    const clickHereButton = screen.getByRole('button', { name: 'Clique aqui' });
    userEvent.click(clickHereButton);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('the initial value should be 10 and increment to 11 after a click', () => {
    renderWithRedux(<App />, { initialState: { clickReducer: { counter: 10 } } });

    expect(screen.getByText('10')).toBeInTheDocument();
    const clickHereButton = screen.getByRole('button', { name: 'Clique aqui' });
    userEvent.click(clickHereButton);
    expect(screen.getByText('11')).toBeInTheDocument();
  });
});