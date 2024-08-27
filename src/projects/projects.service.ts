import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { DEFAULT_PAGE_SIZE, FilterDto } from 'src/helpers/pagination/dto/filter.dto';
import { PageService } from 'src/helpers/pagination/page.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly pageService: PageService,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.save(createProjectDto)
  }

  findAllPaginated(filter?: FilterDto) {
    if(!filter){
      return this.findAll();
    }

    return this.pageService.paginate(this.projectRepository, {
      page: filter.page,
      pageSize: filter.pageSize
    })
  }

  findAll() {
    return this.projectRepository.find()
  }
  
  findOne(id: number) {
    return this.projectRepository.findOne({
      where: { id },
    })
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto)
  }

  remove(id: number) {
    return this.projectRepository.delete(id)
  }
}
