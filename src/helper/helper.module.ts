import { Module } from '@nestjs/common';
import { EncoderService } from './encoder/encoder.service';

@Module({
  providers: [EncoderService],
  exports: [EncoderService],
})
export class HelperModule {}
