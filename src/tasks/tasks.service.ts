import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity'
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>
  ){}

  async create(createTaskDto: CreateTaskDto) {
    const project = await this.projectsRepository.findOneByOrFail({
      id: createTaskDto.projectId,
    });
    return this.tasksRepository.save({ ...createTaskDto, project });
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id } 
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }
}
