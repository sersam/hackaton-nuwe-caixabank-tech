import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStore } from '@nanostores/react';
import Statistics from './Statistics';
import { transactionsStore } from '../stores/transactionStore';

const mockTransactions = [
    { category: 'Food', type: 'expense', amount: 50, date: '2023-01-01' },
    { category: 'Food', type: 'expense', amount: 20, date: '2023-01-01' },
    { category: 'Transport', type: 'expense', amount: 30, date: '2023-01-02' },
    { category: 'Health', type: 'expense', amount: 10, date: '2023-01-03' },
    { category: 'Health', type: 'expense', amount: 10, date: '2023-01-03' },
];

// Mock the `useStore` hook from `@nanostores/react`
jest.mock('@nanostores/react', () => ({
    useStore: jest.fn().mockImplementation(() => [
        { category: 'Food', type: 'expense', amount: 50, date: '2023-01-01' },
        { category: 'Food', type: 'expense', amount: 20, date: '2023-01-01' },
        { category: 'Transport', type: 'expense', amount: 30, date: '2023-01-02' },
        { category: 'Health', type: 'expense', amount: 10, date: '2023-01-03' },
        { category: 'Health', type: 'expense', amount: 10, date: '2023-01-03' },
    ]),
}));

jest.mock('../stores/transactionStore', () => ({
    transactionsStore: jest.fn()
}))

// Mock StatisticsDisplay component
jest.mock('./StatisticsDisplay', () => {
    return ({ totalExpense, averageDailyExpense, maxCategory, categoryExpenses }) => (
        <div>
            <div data-testid="totalExpense">{totalExpense}</div>
            <div data-testid="averageDailyExpense">{averageDailyExpense}</div>
            <div data-testid="maxCategory">{maxCategory}</div>
            <div data-testid="categoryExpenses">{JSON.stringify(categoryExpenses)}</div>
        </div>
    );
});



// useStore.mockReturnValue(mockTransactions);

describe('Statistics', () => {
    test('calculates total expense correctly', () => {
        render(<Statistics />);
        expect(screen.getByTestId('totalExpense').textContent).toBe('120');
    });

    test('calculates average daily expense correctly', () => {
        render(<Statistics />);
        expect(screen.getByTestId('averageDailyExpense').textContent).toBe('40');
    });

    test('finds the category with the highest spending', () => {
        render(<Statistics />);
        expect(screen.getByTestId('maxCategory').textContent).toBe('Food');
    });

    test('passes category expenses correctly', () => {
        render(<Statistics />);
        const categoryExpenses = JSON.parse(screen.getByTestId('categoryExpenses').textContent);
        expect(categoryExpenses).toEqual({
            Food: 70,
            Transport: 30,
            Health: 30,
        });
    });
});
