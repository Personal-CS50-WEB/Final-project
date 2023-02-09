import React from 'react';
import {render, screen, cleanup , waitForElement, wait, fireEvent } from '@testing-library/react';
import Result from '../result';
import '@testing-library/jest-dom';


import axios from 'axios';

afterEach(cleanup);

test('test', () => {
    const t = render(
        <Result />
    );
    const ResultElement = screen.getByTestId('survey-result');
    expect(ResultElement ).toBeInTheDocument()
});



jest.mock('axios');

describe('Result component', () => {
  it('renders result information when data is fetched', async () => {
    const data = {
      id: 1,
      name: 'Test Survey',
      description: 'This is a test survey',
      deadline: '2022-01-01',
      submissions: [{
        id: 1,
        answers: []
      }],
      questions: [{
        id: 1,
        question_text: 'What is your favorite color?',
        choices: [{
          id: 1,
          choice_text: 'Red',
          votes: 2
        }, {
          id: 2,
          choice_text: 'Green',
          votes: 3
        }]
      }]
    };
    axios.get.mockResolvedValue({ data });

    const { getByTestId } = render(<Result />);
    const Result = screen.getByTestId('survey-result');

    expect(Result).toBeDefined();
   
  });
});

