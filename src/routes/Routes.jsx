import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateAssignment from "../pages/CreateAssignment";
import Assignment from "../pages/Assignment";
import UpdatedAssignment from "../pages/UpdatedAssignment";
import ViewAssignment from "../pages/ViewAssignment";
import SubmitForm from "../pages/SubmitForm";
import PendingAssignment from "../pages/PendingAssignment";
import GiveMark from "../pages/GiveMark";
import MyAssignments from "../pages/MyAssignments";
import Private from "../context/Private";
import Error from "../pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "create-assignment",
        Component: () => (
          <Private>
            <CreateAssignment />
          </Private>
        )
      },
      {
        path: "assignments",
        Component: Assignment
      },
      {
        path: "assignments/update/:id",
        Component: UpdatedAssignment
      },
      {
        path: "/assignments/view/:id",
        Component: ViewAssignment
      },
      {
        path: "/assignments/:id/submit",
        Component: SubmitForm
      },
      {
        path: "/pending",
        Component: () => (
          <Private>
            <PendingAssignment />
          </Private>
        )
      },
      {
        path: "/give-mark/:id",
        Component: GiveMark
      },
      {
        path: "my-attempts",
        Component: () => (
          <Private>
            <MyAssignments />
          </Private>
        )
      }
    ]
  },
  {
    path: "login",
    Component: Login
  },
  {
    path: "register",
    Component: Register
  },
  {
    path: "*",
    Component: Error
  }
]);