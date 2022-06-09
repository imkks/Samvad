import { Controller } from '@nestjs/common';
import { PvtmessagesService } from './pvtmessages.service';

@Controller('pvtmessages')
export class PvtmessagesController {
  constructor(private readonly pvtmessagesService: PvtmessagesService) {}
}
