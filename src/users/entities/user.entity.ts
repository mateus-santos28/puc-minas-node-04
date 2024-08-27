import { Project } from "src/projects/entities/project.entity";
import { Task } from "src/tasks/entities/task.entity";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    projects: Project[];
    tasks: Task[];
}
