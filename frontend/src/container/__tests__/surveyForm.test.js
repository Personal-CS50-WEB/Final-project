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
import { create } from '../../actions/survey';
configure({adapter: new Adapter()});

afterEach(cleanup);

const mockSurveyData = {
    name: 'Test Survey',
    description: 'This is a test survey.',
    deadline: '02/25/2023 2:03 PM',
    questions: [
        { text: 'Question 1', type: 'TEXT-ANSWER' },

    ],
};
jest.mock('../../actions/survey', () => ({
    create: jest.fn(() => ({ type: 'MOCK_CREATE_SURVEY_ACTION' })),
}));

describe('CreateSurvey', () => {
    let wrapper, surveyName, descriptionInput, addButton, submitButton, questionFields;
    
    beforeEach(() => {
        store.dispatch({
            type: AUTHENTICATED_SUCCESS
        });
        wrapper = render(<Router>
            <Provider store={store}> 
                <CreateSurvey create={create} isAuthenticated={true}/>
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
        questionFields = document.querySelectorAll('.QuestionFields');
        expect(questionFields.length).toEqual(1);
    });
    it("does not submit the form with invalid input", () => {
        
        fireEvent.change(surveyName, { target: { value: "" } });
        fireEvent.change(descriptionInput, { target: { value: "" } });
        
        const deadlineInput = document.querySelector('.Deadline').querySelector("input");
        fireEvent.change(deadlineInput, { target: { value: "2021-01-01" } });

        const question1TypeSelect = questionFields[0].querySelector('[name="type"]');
        fireEvent.change(question1TypeSelect, { target: { value: "" } });
        const question1TextInput = questionFields[0].querySelector('[name="text"]');
        fireEvent.change(question1TextInput, { target: { value: "" } });

        expect(submitButton).toBeDisabled();
        fireEvent.click(submitButton);
        expect(create).not.toHaveBeenCalled();
    });
    
    it('renders the form and submits it with valid data', () => {
        // Fill in the survey info fields.
        
        fireEvent.change(surveyName, { target: { value: mockSurveyData.name } });
        fireEvent.change(descriptionInput, { target: { value: mockSurveyData.description } });
        // Set the survey deadline.
        const deadlineInput = document.querySelector('.Deadline').querySelector("input");
        fireEvent.change(deadlineInput, { target: { value: mockSurveyData.deadline } });
        expect(deadlineInput.value).toBe("02/25/2023 2:03 PM");
        const question1TypeSelect = questionFields[0].querySelector('[name="type"]');
        const question1TextInput = questionFields[0].querySelector('[name="text"]');
    
        fireEvent.change(question1TypeSelect, { target: { value: mockSurveyData.questions[0].type } });
        fireEvent.change(question1TextInput, { target: { value: mockSurveyData.questions[0].text } });
        expect(submitButton).not.toBeDisabled();
        fireEvent.click(submitButton);
        expect(create).toHaveBeenCalledTimes(1);
        });
    
});