import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { Keyword } from './entities/keyword.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
