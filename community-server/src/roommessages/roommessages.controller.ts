import { Controller } from '@nestjs/common';
import { RoommessagesService } from './roommessages.service';

@Controller('roommessages')
export class RoommessagesController {
  constructor(private readonly roommessagesService: RoommessagesService) {}
}
