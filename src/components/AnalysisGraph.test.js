// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { useStore } from '@nanostores/react';
// import AnalysisGraph from './AnalysisGraph';

// // Mock the `useStore` hook from @nanostores/react
// jest.mock('@nanostores/react', () => ({
//     useStore: jest.fn(),
// }));

// // Mock the `atom` from `nanostores`
// jest.mock('nanostores', () => ({
//     atom: jest.fn(() => ([
//         {
//             "id": 1729961813107,
//             "description": "Ropita",
//             "amount": 342,
//             "type": "expense",
//             "category": "Clothing",
//             "date": "2024-10-26"
//         },
//         {
//             "id": 1729961801114,
//             "description": "Salary",
//             "amount": 2500,
//             "type": "income",
//             "category": "Salary",
//             "date": "2024-10-01"
//         }
//     ])),
// }));

// global.ResizeObserver = class {
//     constructor(callback) {
//         this.callback = callback;
//     }
//     observe() { }
//     unobserve() { }
//     disconnect() { }
// };


// const mockTransactions = [
//     { category: 'Food', type: 'income', amount: 100, date: '2023-01-01' },
//     { category: 'Food', type: 'expense', amount: 50, date: '2023-01-01' },
//     { category: 'Transport', type: 'income', amount: 200, date: '2023-01-02' },
//     { category: 'Transport', type: 'expense', amount: 100, date: '2023-01-02' },
// ];

// describe('AnalysisGraph', () => {
//     beforeEach(() => {
//         useStore.mockReturnValue(mockTransactions);
//     });

//     test('renders the bar chart', () => {
//         render(<AnalysisGraph />);
//         const incomeBars = screen.getByText('Income');
//         const expenseBars = screen.getByText('Expenses');
//         expect(incomeBars).toBeInTheDocument();
//         expect(expenseBars).toBeInTheDocument();
//     });
// });
