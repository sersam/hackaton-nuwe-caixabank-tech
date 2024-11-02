import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportButton from './ExportButton';

describe('ExportButton', () => {
  const mockData = [
    { Date: '2023-01-01', Income: '1000', Expense: '500' },
    { Date: '2023-01-02', Income: '1500', Expense: '700' },
  ];
  const mockHeaders = ['Date', 'Income', 'Expense'];

  test('renders ExportButton with correct label', () => {
    render(<ExportButton data={mockData} filename="test.csv" headers={mockHeaders} label="Export Test" />);
    const buttonElement = screen.getByText(/Export Test/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('button is disabled when data is empty', () => {
    render(<ExportButton data={[]} filename="test.csv" headers={mockHeaders} label="Export Test" />);
    const buttonElement = screen.getByText(/Export Test/i);
    expect(buttonElement).toBeDisabled();
  });

  test('button is enabled when data is not empty', () => {
    render(<ExportButton data={mockData} filename="test.csv" headers={mockHeaders} label="Export Test" />);
    const buttonElement = screen.getByText(/Export Test/i);
    expect(buttonElement).toBeEnabled();
  });

  test('calls handleExport on button click', () => {
    render(<ExportButton data={mockData} filename="test.csv" headers={mockHeaders} label="Export Test" />);
    const buttonElement = screen.getByText(/Export Test/i);
    fireEvent.click(buttonElement);
  });
});
