import React from 'react';
import {render, screen, cleanup , waitForElement, wait, fireEvent } from '@testing-library/react';
import  CreateSurvey  from '../create_survey';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { Enzyme, shallow , configure, } from 'enzyme';
import store from "../../store";
import { Provider } from "react-redux";
import { Route,Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "../../hocs/layout";
import { SurveyInfoFields } from '../../helper/create_survey/survey_info'

import{ AUTHENTICATED_SUCCESS } from '../../actions/types';

configure({adapter: new Adapter()});
afterEach(cleanup);

describe('<ParentComponent />', () => {
    it('renders the ChildComponent', () => {
        store.dispatch({
            type: AUTHENTICATED_SUCCESS
        });
        const wrapper = render(<Router>
            <Provider store={store}> 
                <CreateSurvey isAuthenticated={true}/>
            </Provider>
        </Router>);

        expect(wrapper).toBeDefined();
        const nameInput = screen.getByTestId('create-survey');
        expect(nameInput).toBeInTheDocument();
    });
});

// describe("CreateSurvey component", () => {
//     it("renders a form and buttons", () => {
//         const component = render(<Router>
//             <Provider store={store}>
//                 <Layout>
//                     <Routes>
//                         <Route  path="/create_survey" element={<CreateSurvey />} />
//                     </Routes>
//                 </Layout>
//             </Provider>
//         </Router>
            
//         );
//         expect(component).toBeDefined();
       
//        expect(getByRole('form')).toBeInTheDocument();

//         // component.setProps({ isAuthenticated: true });
//         // const nameInput = screen.getByTestId('survey-name');
//         // const descriptionInput = screen.getByTestId("Description:");
//         // const deadlineInput = screen.getByTestId("Deadline");
//         // const addButton = screen.getByTestId("Add question..");
//         // const submitButton = screen.getByTestId("Submit");
//         // expect(nameInput).toBeInTheDocument();
//         // expect(descriptionInput).toBeInTheDocument();
//         // expect(deadlineInput).toBeInTheDocument();
//         // expect(addButton).toBeInTheDocument();
//         // expect(submitButton).toBeInTheDocument();
//     });
// });