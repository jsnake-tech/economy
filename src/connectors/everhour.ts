import {
  EverhourData,
  User,
  Project,
  Time,
  FormattedDataForDatabase
} from "../types/types";
import "source-map-support/register";
const axios = require("axios");
const spacetime = require("spacetime");
const get = require("lodash/get");

const apiKey = "ea4d-7006-844458-958b15-9de915be";
const instance = axios.create({
  baseURL: "https://api.everhour.com/",
  timeout: 50000,
  headers: { "X-Api-Key": apiKey }
});

async function getUsers(): Promise<User[]> {
  const { data } = await instance.get("/team/users");
  return data;
}

async function getProjects(): Promise<Project[]> {
  const { data } = await instance.get("/projects?platform=as");
  return data;
}

async function getTime(): Promise<Time[]> {
  const  allowedFieds = ['date', 'user', 'project'];
  const { data } = await instance.get(
    `/team/time/export?from=2020-01-01&to=${spacetime
      .now("Europe/Paris")
      .format("YYYY-MM-DD")}&fields=${allowedFieds.join(',')}`
  );
  return data;
}

async function getEverhourData(): Promise<EverhourData> {
  const data: EverhourData = {
    users: [],
    projects: [],
    time: []
  };

  data.users = await getUsers();
  data.time = await getTime();
  data.projects = await getProjects();
  return data;
}

export async function getFormattedDataForDatabase() {
  const data = await getEverhourData();
  const result: FormattedDataForDatabase[] = [];

  function getProjectRateById(id: string, userId: number): number {
    const project: Project | undefined = data.projects.find(el => el.id === id);

    if (
      project !== undefined &&
      project.rate !== undefined &&
      project.rate.type === "user_rate"
    ) {
      return userId in project.rate.userRateOverrides
        ? project.rate.userRateOverrides[userId]
        : getUserRateById(userId);
    }

    if (
      project !== undefined &&
      project.rate !== undefined &&
      project.rate.type === "user_rate"
    ) {
      return userId in project.rate.userRateOverrides
        ? project.rate.userRateOverrides[userId]
        : getUserRateById(userId);
    }

    return project && project.rate && project.rate.rate ? project.rate.rate : 0;
  }

  function getUserCostById(id: number): number {
    const user: User | undefined = data.users.find(el => el.id === id);
    return user !== undefined ? user.cost : 0;
  }

  function getUserRateById(id: number): number {
    const user: User | undefined = data.users.find(el => el.id === id);
    return user !== undefined ? user.rate : 0;
  }

  function getBillableAmount(time: number, projectId: string, userId: number) {
    return ((time / 3600) * getProjectRateById(projectId, userId)) / 100;
  }

  function getCost(time: number, userId: number) {
    return ((time / 3600) * getUserCostById(userId)) / 100;
  }

  for (let i = 0; i < data.time.length; i++) {
    const userName = get(data, ["time", i, "user", "name"], "No User Name");
    const userId = get(data, ["time", i, "user", "id"], "No User Id");
    const taskName = get(data, ["time", i, "task", "name"], "No Task Name");
    const projectId = get(data, ["time", i, "project", "id"], "No Project Id");
    const projectName = get(
      data,
      ["time", i, "project", "name"],
      "No Project Name"
    );

    const formattedEntry: FormattedDataForDatabase = {
      member: userName,
      task: taskName,
      billable_amount: data.time[i].project
        ? getBillableAmount(data.time[i].time, projectId, userId)
        : 0,
      cost: getCost(data.time[i].time, userId),
      profit: data.time[i].project
        ? getBillableAmount(data.time[i].time, projectId, userId) -
          getCost(data.time[i].time, userId)
        : 0,
      negative_estimation: 0,
      positive_estimation: 0,
      task_id: `{data.time[i].task.id}`,
      date: data.time[i].date,
      time: data.time[i].time / 3600,
      project_id: projectId,
      project_name: projectName,
      member_id: userId
    };
    result.push(formattedEntry);
  }
  return result;
}
