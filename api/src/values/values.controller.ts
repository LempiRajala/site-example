import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ValuesService } from './values.service';

@Controller('values')
export class ValuesController {
  @Inject() values: ValuesService;

  @Get(':key')
  async getValue(
    @Param('key') key: string,
  ) {
    const value = await this.values.get(this.values.validateKey(key));
    console.log(value)
    if(!value) throw new NotFoundException();
    return value;
  }

  @Post(':key')
  async setValue(
    @Param('key') key: string,
    @Body() body: unknown,
  ) {
    const validKey = this.values.validateKey(key);
    const validValue = this.values.validateValue(validKey, body);
    return this.values.set(validKey, validValue);
  }
}
