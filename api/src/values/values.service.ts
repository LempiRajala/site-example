import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { getValue, ILink, IValuesMap, setValue, VALUES } from '../db/schema';
import { z } from 'zod';

const defaultHeaderLinks: ILink[] = [];
const defaultMobileMenuLinks: ILink[] = [];

@Injectable()
export class ValuesService implements OnModuleInit {
  async onModuleInit() {
    if(!await this.has(VALUES.HEADER_LINKS)) {
      await this.set(VALUES.HEADER_LINKS, defaultHeaderLinks);
    }
    
    if(!await this.has(VALUES.MOBILE_MENU_LINKS)) {
      await this.set(VALUES.MOBILE_MENU_LINKS, defaultMobileMenuLinks);
    }
  }

  private readonly linkSchema = z.object({
    text: z.string(),
    href: z.string(),
  });

  private readonly linksSchema = this.linkSchema.array();

  private readonly keySchema = z.nativeEnum(VALUES);

  validateKey(key: unknown) {
    const parsed = this.keySchema.safeParse(key);
    if(!parsed.success) throw new NotFoundException();
    return parsed.data;
  }

  validateValue<T extends VALUES>(
    key: T,
    value: unknown,
  ): IValuesMap[T] {
    if(key === VALUES.HEADER_LINKS || key === VALUES.MOBILE_MENU_LINKS) {
      const parsed = this.linksSchema.safeParse(value);
      if(!parsed.success) throw new BadRequestException(parsed.error);
      return parsed.data;
    }

    throw new BadRequestException('unknown key');
  }

  async has(key: VALUES) {
    return await this.get(key) !== null;
  }

  get = getValue;

  set = setValue;
}
