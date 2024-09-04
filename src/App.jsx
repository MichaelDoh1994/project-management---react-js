import { useState } from "react";
import NewProject from "./components/NewProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [createNewProject, setCreateNewProject] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setCreateNewProject((prevState) => {
      const taskID = Math.random();
      const newTask = {
        text: text,
        id: taskID,
        projectID: prevState.selectedProjectID,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setCreateNewProject((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function onCreateNewProject() {
    setCreateNewProject((prevProject) => {
      return {
        ...prevProject,
        selectedProjectID: null,
      };
    });
  }

  function handleAddProject(projectData) {
    setCreateNewProject((prevState) => {
      const projectID = Math.random();
      const newProject = {
        ...projectData,
        id: projectID,
      };
      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleCancelAddProject() {
    setCreateNewProject((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setCreateNewProject((prevState) => {
      return {
        ...prevState,
        selectedProjectID: id,
      };
    });
  }

  function handleDeleteProject() {
    setCreateNewProject((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectID
        ),
      };
    });
  }

  const selectedProject = createNewProject.projects.find(
    (project) => project.id === createNewProject.selectedProjectID
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      task={createNewProject.tasks}
    />
  );

  if (createNewProject.selectedProjectID === null) {
    content = (
      <NewProject
        handleSaveProject={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (createNewProject.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartNewProject={onCreateNewProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onClick={onCreateNewProject}
        projects={createNewProject.projects}
        onSelectProject={handleSelectProject}
        selectedProjectID={createNewProject.selectedProjectID}
      />
      {content}
    </main>
  );
}

export default App;
