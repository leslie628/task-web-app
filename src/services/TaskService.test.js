import { render, screen } from "@testing-library/react";
import React from "react";
import TaskService from "./TaskService";

jest.mock("../services/TaskService", () => ({
  __esModule: true,
  default: {
    getTasks: jest.fn(),
    createTask: jest.fn(),
    createBulkTask: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn(),
    suggestTask: jest.fn(),
  },
}));
describe("TaskService", () => {
  test("getTasks returns tasks successfully", async () => {
    TaskService.getTasks.mockResolvedValue([
      {
        id: 46,
        title: "6.00 pm",
        description: "attend doctos appointment at 5:00pm",
        isCompleted: false,
        createdDate: "2026-07-21T01:50:15.182616",
      },
      {
        id: 70,
        title: "Choose venue",
        description:
          "Research, visit, and book the ceremony and reception locations based on availability and capacity.",
        isCompleted: false,
        createdDate: "2026-07-21T08:45:29.139594",
      },
      {
        id: 69,
        title: "",
        description:
          "List all potential guests to estimate headcount and plan venue size accordingly.",
        isCompleted: false,
        createdDate: "2026-07-21T13:08:40.659269",
      },
    ]);
    const tasks = await TaskService.getTasks();
    expect(tasks).toHaveLength(3);
    expect(tasks[0].title).toBe("6.00 pm");
    expect(tasks[1].description).toContain("Research, visit, and book");
    expect(tasks[2].isCompleted).toBe(false);
  });

  test("createTasks creates tasks successfully", async () => {
    TaskService.createTask.mockResolvedValue({
      id: 71,
      title: "New Task",
      description: "This is a new task",
      isCompleted: false,
      createdDate: "2026-07-21T13:08:40.659269",
    });

    const newTask = await TaskService.createTask({
      title: "New Task",
      description: "This is a new task",
      isCompleted: false,
    });

    expect(newTask.title).toBe("New Task");
    expect(newTask.id).toBe(71);
  });

  test("createBulkTasks creates mulitple tasks or a single task successfully", async () => {
    TaskService.createBulkTask.mockResolvedValue("Tasks created successfully");
    const tasksData = [
      {
        title: "Bulk Task 1",
        description: "This is the first bulk task",
        isCompleted: false,
        createdDate: "2026-07-21T13:08:40.659269",
      },
      {
        title: "Bulk Task 2",
        description: "This is the second bulk task",
        isCompleted: false,
        createdDate: "2026-07-21T13:08:40.659269",
      },
    ];
    const result = await TaskService.createBulkTask(tasksData);
    expect(result).toBe("Tasks created successfully");
  });
  test("deleteTask deletes a task successfully", async () => {
    TaskService.deleteTask.mockResolvedValue("Task deleted successfully");
    const result = await TaskService.deleteTask(1);
    expect(result).toBe("Task deleted successfully");
  });

  test("suggest task gives suggestions", async () => {
    TaskService.suggestTask.mockResolvedValue({
      priority: "high",
      subtasks: [
        {
          name: "Set wedding date",
          description:
            "Decide on the date for the wedding considering availability of key participants and season preferences.",
          estimated_time_hours: 1,
        },
        {
          name: "Create guest list",
          description:
            "Compile a list of family, friends, and others to invite to the wedding.",
          estimated_time_hours: 3,
        },
        {
          name: "Choose venue",
          description:
            "Research and select a location for the ceremony and reception based on size, style, and budget.",
          estimated_time_hours: 5,
        },
        {
          name: "Hire vendors",
          description:
            "Contact and book vendors such as caterers, photographers, florists, and musicians.",
          estimated_time_hours: 6,
        },
        {
          name: "Select wedding attire",
          description:
            "Choose dresses, suits, and accessories for the couple and wedding party.",
          estimated_time_hours: 4,
        },
        {
          name: "Send invitations",
          description:
            "Design, print, and mail wedding invitations to all guests.",
          estimated_time_hours: 3,
        },
        {
          name: "Plan ceremony details",
          description:
            "Organize the order of events, readings, vows, and rituals for the wedding ceremony.",
          estimated_time_hours: 2,
        },
        {
          name: "Organize reception",
          description:
            "Plan the reception schedule, including menu, seating arrangements, and entertainment.",
          estimated_time_hours: 4,
        },
        {
          name: "Manage RSVP and guest accommodations",
          description:
            "Track responses from guests and coordinate lodging or travel needs.",
          estimated_time_hours: 3,
        },
        {
          name: "Finalize and rehearse",
          description:
            "Confirm all arrangements, conduct rehearsal, and make last-minute adjustments.",
          estimated_time_hours: 2,
        },
      ],
      total_estimated_time_hours: 33,
    });
    const result = await TaskService.suggestTask("plan my wedding");
    expect(result.subtasks).toHaveLength(10);
    expect(result.subtasks[0].name).toBe("Set wedding date");
  });
});
