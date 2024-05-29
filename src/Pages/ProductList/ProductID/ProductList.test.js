import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import ProductList from '../ProductList';

describe('ProductList Component', () => {
  const mockSetCart = jest.fn();
  const mockFetchData = [
    { _id: '1', productName: 'T-shirt', description: 'A nice t-shirt', price: 20, category: 't-shirt', image: 'image1.jpg' },
    { _id: '2', productName: 'Hoodie', description: 'A warm hoodie', price: 50, category: 'hoodie', image: 'image2.jpg' },
    { _id: '3', productName: 'Jacket', description: 'A cool jacket', price: 100, category: 'jacket', image: 'image3.jpg' },
    { _id: '4', productName: 'Shoe', description: 'A stylish shoe', price: 80, category: 'shoe', image: 'image4.jpg' },
    { _id: '5', productName: 'Another T-shirt', description: 'Another nice t-shirt', price: 25, category: 't-shirt', image: 'image5.jpg' },
  ];

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockFetchData }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders without crashing', async () => {
    render(<MemoryRouter><ProductList cart={[]} setCart={mockSetCart} /></MemoryRouter>);
    expect(screen.getByText('Explore our Product options')).toBeInTheDocument();
  });

  test('fetches and displays products correctly', async () => {
    render(<MemoryRouter><ProductList cart={[]} setCart={mockSetCart} /></MemoryRouter>);
    
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(5));

    expect(screen.getByText('T-shirt')).toBeInTheDocument();
    expect(screen.getByText('A nice t-shirt')).toBeInTheDocument();
    expect(screen.getByText('Hoodie')).toBeInTheDocument();
    expect(screen.getByText('A warm hoodie')).toBeInTheDocument();
  });

  test('filters products by category', async () => {
    render(<MemoryRouter><ProductList cart={[]} setCart={mockSetCart} /></MemoryRouter>);
    
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(5));

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 't-shirt' } });

    expect(screen.getAllByRole('img')).toHaveLength(2); // 2 t-shirts in mock data
  });

  test('handles pagination correctly', async () => {
    render(<MemoryRouter><ProductList cart={[]} setCart={mockSetCart} /></MemoryRouter>);
    
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(5));

    const paginationButtons = screen.getAllByRole('button');
    fireEvent.click(paginationButtons[1]); // Click the second page button

    expect(screen.getAllByRole('img')).toHaveLength(1); // Only one product on the second page (mock data has 5 products, 4 per page)
  });

  test('adds product to cart', async () => {
    jest.spyOn(window, 'prompt').mockImplementation(() => '1');
    render(<MemoryRouter><ProductList cart={[]} setCart={mockSetCart} /></MemoryRouter>);
    
    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(5));

    const addButton = screen.getAllByText('Add to cart')[0];
    fireEvent.click(addButton);

    expect(mockSetCart).toHaveBeenCalledWith(expect.any(Array));
    expect(localStorage.getItem('cart')).not.toBeNull();
  });
});
