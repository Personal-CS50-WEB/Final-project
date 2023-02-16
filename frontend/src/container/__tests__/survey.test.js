import React from 'react';
import {render, screen, cleanup , waitForElement, wait, fireEvent } from '@testing-library/react';
import  CreateSurvey  from '../create_survey';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { Enzyme, shallow , configure, } from 'enzyme';
import store from "../../store";
import { Provider } from "react-redux";
import { Navigate } from 'react-router-dom';
import {  BrowserRouter as Router } from "react-router-dom";
import{ AUTHENTICATED_SUCCESS } from '../../actions/types';
import{create} from '../../actions/survey';

configure({adapter: new Adapter()});

afterEach(cleanup);

const mockSurveyData = {
    name: 'Test Survey',
    description: 'This is a test survey.',
    deadline: new Date('2023-02-28T12:00:00Z'),
    questions: [
        { text: 'Question 1', type: 'TEXT-ANSWER' },
        { text: 'Question 2', type: 'RADIO', options: [{ option: 'Option 1' }, { option: 'Option 2' }] },
    ],
};
const mockCreate = jest.fn();


describe('CreateSurvey', () => {
    let wrapper, surveyName, descriptionInput, addButton, submitButton, questionFields;
    

    beforeEach(() => {
        store.dispatch({
            type: AUTHENTICATED_SUCCESS
        });
        wrapper = render(<Router>
            <Provider store={store}> 
                <CreateSurvey create={mockCreate} isAuthenticated={true}/>
            </Provider>
        </Router>);

        surveyName = screen.getByTestId('survey-name');
        descriptionInput = screen.getByTestId('Description');
        addButton = screen.getByTestId("Add question..");
        submitButton = screen.getByTestId("submit");
        questionFields = document.querySelectorAll('.QuestionFields');
    });

    it('renders login form when isAuthenticated false', () => {
        const wrapper = shallow(<Router>
            <Provider store={store}> 
                <CreateSurvey isAuthenticated={false}/>
            </Provider>
        </Router>);
        expect(wrapper.find(Navigate)).toBeDefined();
    });

    it('renders without crashing when isAuthenticated true', () => {
        expect(wrapper).toBeTruthy();
        const component = screen.getByTestId('create-survey');
        expect(component).toBeInTheDocument();
    });

    it('should add question', () => {
        fireEvent.click(addButton);
        questionFields = document.querySelectorAll('.QuestionFields');
        expect(questionFields.length).toEqual(2);
        
    });
    it('should remove second question', () => {
        fireEvent.click(addButton);
        const removeButton = screen.getByTestId(`Remove question ${1}`);
        expect(removeButton).toBeInTheDocument();
        fireEvent.click(removeButton);
        expect(questionFields.length).toEqual(1);
    });
    it('renders the form and submits it with valid data', () => {
        // Fill in the survey info fields.
        fireEvent.change(surveyName, { target: { value: mockSurveyData.name } });
        fireEvent.change(descriptionInput, { target: { value: mockSurveyData.description } });
        // Set the survey deadline.
        const deadlineInput = document.querySelector('.Deadline');
        expect(deadlineInput).toBeInTheDocument();
        fireEvent.change(deadlineInput, { target: { value: mockSurveyData.deadline } });

        
        const question1TypeSelect = questionFields.querySelector('[name="type"]');
        const question1TextInput = questionFields.querySelector('[name="text"]');

        fireEvent.change(question1TypeSelect, { target: { value: mockSurveyData.questions[0].type } });
        fireEvent.change(question1TextInput, { target: { value: mockSurveyData.questions[0].text } });

        // Add the survey questions.
        fireEvent.click(addQuestionButton);
        });
    
});
