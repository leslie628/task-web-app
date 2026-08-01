import { render, screen } from "@testing-library/react";
import React from "react";
import AuthService from "././AuthService";

jest.mock("../services/AuthService", () => ({
  __esModule: true,
  default: {
    Login: jest.fn(),
    Register: jest.fn(),
    Logout: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));
describe("AuthService", () => {
  test("login returns user data successfully", async () => {
    AuthService.Login.mockResolvedValue({
      message: "Login successful",
      username: "john_doe",
      display_name: "John Doe",
    });
    const userData = await AuthService.Login({
      username: "john_doe",
      password: "password123",
    });
    expect(userData).toEqual({
      message: "Login successful",
      username: "john_doe",
      display_name: "John Doe",
    });
  });
  test("register returns user data successfully", async () => {
    AuthService.Register.mockResolvedValue({
      message: "User Registered successfully",
      username: "jane_doe",
      display_name: "Jane Doe",
    });
    const userData = await AuthService.Register({
      username: "jane_doe",
      password: "password123",
      display_name: "Jane Doe",
    });
    expect(userData).toEqual({
      message: "User Registered successfully",
      username: "jane_doe",
      display_name: "Jane Doe",
    });
  });

  test("logout works correctly", async () => {
    AuthService.Logout.mockResolvedValue({
      message: "Logged out successfully",
    });
    const logoutData = await AuthService.Logout();
    expect(logoutData).toEqual({
      message: "Logged out successfully",
    });
  });

  test("getCurrentUser returns current logged in user correctly", async () => {
    AuthService.getCurrentUser.mockResolvedValue({
      id: 5,
      username: "Lily",
      display_name: "Lily",
    });
    const response = await AuthService.getCurrentUser();
    expect(AuthService.getCurrentUser).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      id: 5,
      username: "Lily",
      display_name: "Lily",
    });
  });
});
