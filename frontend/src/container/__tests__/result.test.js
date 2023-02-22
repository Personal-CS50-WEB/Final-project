import React from 'react';
import {render, screen, cleanup } from '@testing-library/react';
import { ChoiceAnswer } from '../../helper/result/choice_answer'; 
import '@testing-library/jest-dom';

afterEach(cleanup);

test('test choice answers calculation', () => {
    const data =  {
        "options": [
            {
                "id": 68,
                "option": "cat"
            },
            {
                "id": 69,
                "option": "dog"
            },
            {
                "id":70,
                "option": "fish"
            }
        ],
        "answers": [
            {
                "integer_answer": null,
                "text_answer": null,
                "options_answers": [
                    {
                        "option": 68,
                        "option_data": {
                            "option": "cat"
                        }
                    },
                    {
                        "option": 69,
                        "option_data": {
                            "option": "dog"
                        }
                    }
                ],
                "question": 143,
                "question_data": {
                    "type": "CHECKBOX",
                    "text": "what is your favorite pet?"
                }
            },
            {
                "integer_answer": null,
                "text_answer": null,
                "options_answers": [
                    {
                        "option": 68,
                        "option_data": {
                            "option": "cat"
                        }
                    }
                ],
                "question": 143,
                "question_data": {
                    "type": "CHECKBOX",
                    "text": "what is your favorite pet?"
                }
            },
            {
                "integer_answer": null,
                "text_answer": null,
                "options_answers": [
                    {
                        "option": 68,
                        "option_data": {
                            "option": "cat"
                        }
                    }
                ],
                "question": 143,
                "question_data": {
                    "type": "CHECKBOX",
                    "text": "what is your favorite pet?"
                }
            }
        ],
        "type": "CHECKBOX",
        "text": "what is your favorite pet?"
    }
    const answers = render(
        <ChoiceAnswer  question= {data} />
    );
    const Result = screen.getByTestId('choice-result');

    const cat = screen.getByTestId('cat');
    expect(cat ).toHaveTextContent('cat');
    const catOccurrence= screen.getByTestId(3);
    expect(catOccurrence ).toHaveTextContent('(3) votes');
    const catRatio = screen.getByTestId(75);
    expect(catRatio ).toHaveTextContent('75%');

    const dog = screen.getByTestId('dog');
    expect(dog ).toHaveTextContent('dog');
    const dogOccurrence= screen.getByTestId(1);
    expect(dogOccurrence ).toHaveTextContent('(1) votes');
    const dogRatio = screen.getByTestId(25);
    expect(dogRatio ).toHaveTextContent('25%');
    
    const fish = screen.getByTestId('fish');
    expect(fish ).toHaveTextContent('fish');
    const fishOccurrence= screen.getByTestId(0);
    expect(fishOccurrence ).toHaveTextContent('(0) votes');

});
