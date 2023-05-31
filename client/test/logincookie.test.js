import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Login from '../src/components/login.component';

jest.mock('axios');

describe('Login functionality', () => {
    it('should receive a cookie after clicking the login button', async () => {
        // Mock the backend response
        const mockResponse = {
            data: {
                user: 'admin',
                token: 'adminadmin123!123456789',
            },
        };
        axios.post.mockResolvedValueOnce(mockResponse);

        // Render the component
        const { getByLabelText, getByText } = render(<Login />);

        // Find the username and password input fields
        const usernameInput = getByLabelText("Username");
        const passwordInput = getByLabelText("Password");

        // Provide username and password
        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        fireEvent.change(passwordInput, { target: { value: 'admin123!' } });

        // Click the login button
        fireEvent.click(getByText('Login'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledTimes(1);
        });

        // Check if a cookie is set
        expect(document.cookie).toMatch(/x-access-token=adminadmin123!123456789/);
    });
});
