import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import useTask from "../../../hooks/useTask.js";
import React from "react";
import userEvent from "@testing-library/user-event";
jest.mock("../../../hooks/useTask.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("TaskList", () => {
  test("renders all tasks from hook", () => {
    useTask.mockReturnValue({
      tasks: [
        { id: 1, title: "Learn Jest" },
        { id: 2, title: "Learn React Testing Library" },
        { id: 3, title: "Practice Testing" },
      ],
      fetchTasks: jest.fn(),
      deleteTask: jest.fn(),
      updateTask: jest.fn(),
      createTask: jest.fn(),
      createBulkTask: jest.fn(),
    });
    render(<TaskList />);

    expect(screen.getByText("Learn Jest")).toBeInTheDocument();

    expect(screen.getByText("Learn React Testing Library")).toBeInTheDocument();

    expect(screen.getByText("Practice Testing")).toBeInTheDocument();
  });
});

test("renders the Add Task button", () => {
  render(<TaskList />);

  expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
});

test("renders the edit Task button for each row", () => {
  useTask.mockReturnValue({
    tasks: [
      { id: 1, title: "Learn Jest" },
      { id: 2, title: "Learn React Testing Library" },
      { id: 3, title: "Practice Testing" },
    ],
  });
  render(<TaskList />);

  expect(screen.getAllByRole("button", { name: /edit/i })).toHaveLength(3);
});

test("opens edit modal when button clicked", async () => {
  useTask.mockReturnValue({
    tasks: [{ id: 1, title: "Learn Jest" }],
  });
  render(<TaskList />);

  const editButton = screen.getByRole("button", { name: /edit/i });

  await userEvent.click(editButton);
  expect(screen.getByText(/edit task/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/learn jest/i)).toBeInTheDocument();
});

test("opens delete modal when button clicked", async () => {
  useTask.mockReturnValue({
    tasks: [{ id: 1, title: "Learn Jest" }],
  });
  render(<TaskList />);

  const deleteButton = screen.getByRole("button", { name: /delete/i });

  await userEvent.click(deleteButton);
  expect(screen.getByText(/delete task/i)).toBeInTheDocument();
});

test("opens add modal when button clicked", async () => {
  render(<TaskList />);

  const addButton = screen.getByRole("button", { name: /add task/i });

  await userEvent.click(addButton);
  expect(screen.getByText(/add task/i)).toBeInTheDocument();
});

test("opens add AI modal when button clicked", async () => {
  render(<TaskList />);

  const addAIButton = screen.getByRole("button", { name: /ai task planner/i });

  await userEvent.click(addAIButton);
  expect(
    screen.getByRole("heading", { name: /ai task planner/i }),
  ).toBeInTheDocument();
});

test("calls create task when save button in Add task modal clicked", async () => {
  render(<TaskList />);
  const createTaskMock = jest.fn();
  useTask.mockReturnValue({
    tasks: [],
    createTask: createTaskMock,
  });
  // Open modal first
  await userEvent.click(
    screen.getByRole("button", {
      name: /add task/i,
    }),
  );
  const saveButton = screen.getByRole("button", { name: /save task/i });
  await userEvent.click(saveButton);
  expect(createTaskMock).toHaveBeenCalled();
});
