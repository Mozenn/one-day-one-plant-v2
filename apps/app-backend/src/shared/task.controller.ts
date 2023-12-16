import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TriggerTaskDto } from './triggerTask.dto';

@Controller('internal/task')
export class TaskController {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly logger: Logger = new Logger(TaskController.name),
  ) {}

  @HttpCode(200)
  @Post()
  async triggerTask(@Body() triggerTaskDto: TriggerTaskDto) {
    if (this.schedulerRegistry.doesExist('cron', triggerTaskDto.taskName)) {
      this.logger.log(`Triggering task ${triggerTaskDto.taskName}`);
      const job = this.schedulerRegistry.getCronJob(triggerTaskDto.taskName);
      job.fireOnTick();
    }
  }
}
