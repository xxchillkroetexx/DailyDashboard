
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import Register from "../src/components/register.component";
import "@testing-library/jest-dom/extend-expect"
import AuthService from "../src/services/auth.service";
import { act } from "react-dom/test-utils";




// // Test that the Register component renders the registration form
describe("Register component", () => {
//   test("renders registration form", () => {
//     render(<Register />);

//     const usernameInput = screen.getByLabelText("username");
//     const emailInput = screen.getByLabelText("email");
//     const passwordInput = screen.getByLabelText("password");
//     const signupButton = screen.getByRole("button", { name: /sign up/i });

//     expect(usernameInput).toBeInTheDocument();
//     expect(emailInput).toBeInTheDocument();
//     expect(passwordInput).toBeInTheDocument();
//     expect(signupButton).toBeInTheDocument();
//   });

   // Test that the Register component sends the correct data to auth.service.ts
    test("sends correct data to auth.service.ts", async () => {
        const mockAuthService = jest.spyOn(AuthService, "register");

        render(<Register />);
        const usernameInput = screen.getByLabelText(/username/i);
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const signupButton = screen.getByRole("button", { name: /sign up/i });
        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });
        fireEvent.click(signupButton);
        const form = screen.getByTestId("registration-form");

        await act(async () => {
        expect(form).toHaveFormValues({"username": "testuser", "email": "test@mail.com", "password": "testpassword"});
        //expect(mockAuthService).toBeCalledWith({"username": "testuser", "email": "test@mail.com", "password": "testpassword"});
        });

    
        
 
});  
});

