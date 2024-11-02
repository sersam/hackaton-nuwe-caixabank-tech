import React from 'react';
import { render, screen } from '@testing-library/react';
import RecentTransactions from './RecentTransactions';

// Mock TransactionItem component
jest.mock('./TransactionItem', () => {
    return ({ transaction }) => (
        <tr>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.type}</td>
            <td>{transaction.category}</td>
            <td>{transaction.date}</td>
        </tr>
    );
});

const mockTransactions = [
    { id: 1, description: 'Groceries', amount: 50, type: 'expense', category: 'Food', date: '2023-01-01' },
    { id: 2, description: 'Salary', amount: 2000, type: 'income', category: 'Salary', date: '2023-01-15' },
    { id: 3, description: 'Rent', amount: 700, type: 'expense', category: 'Housing', date: '2023-01-05' },
    { id: 4, description: 'Gym', amount: 30, type: 'expense', category: 'Health', date: '2023-01-10' },
    { id: 5, description: 'Electricity', amount: 100, type: 'expense', category: 'Utilities', date: '2023-01-20' },
    { id: 6, description: 'Internet', amount: 60, type: 'expense', category: 'Utilities', date: '2023-01-25' },
];

describe('RecentTransactions', () => {
    test('renders Recent Transactions title', () => {
        render(<RecentTransactions transactions={mockTransactions} />);
        expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    });

    test('renders the correct number of recent transactions', () => {
        render(<RecentTransactions transactions={mockTransactions} />);
        const rows = screen.getAllByRole('row');
        // Since we have the header row, we expect 6 rows in total (1 header + 5 transactions)
        expect(rows).toHaveLength(6);
    });

    test('sorts and slices the transactions correctly', () => {
        render(<RecentTransactions transactions={mockTransactions} />);
        const [header, ...transactionRows] = screen.getAllByRole('row');
        expect(transactionRows[0]).toHaveTextContent('Groceries');
        expect(transactionRows[1]).toHaveTextContent('Rent');
        expect(transactionRows[2]).toHaveTextContent('Gym');
        expect(transactionRows[3]).toHaveTextContent('Salary');
        expect(transactionRows[4]).toHaveTextContent('Electricity');
    });

    test('displays transaction details correctly', () => {
        render(<RecentTransactions transactions={mockTransactions} />);
        const transactionRows = screen.getAllByRole('row').slice(1);
        transactionRows.forEach((row, index) => {
            const transaction = mockTransactions[index];
            expect(row).toHaveTextContent(transaction.description);
            expect(row).toHaveTextContent(transaction.amount);
            expect(row).toHaveTextContent(transaction.type);
            expect(row).toHaveTextContent(transaction.category);
            expect(row).toHaveTextContent(transaction.date);
        });
    });
});
