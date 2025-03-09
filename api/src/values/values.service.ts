import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { getValue, ILink, IValuesMap, setValue, VALUES } from '../db/schema';
import { z } from 'zod';

const defaultHeaderLinks: ILink[] = [{
  text: 'О нас',
  href: 'about-us',
}, {
  text: 'Телеграм',
  href: 'https://t.me/CROW_FOREST',
}];

const defaultMobileMenuLinks: ILink[] = defaultHeaderLinks;

const defaultFooterLinks: ILink[] = [{
  text: 'Пользовательское соглашение',
  href: 'terms',
}];

@Injectable()
export class ValuesService implements OnModuleInit {
  async onModuleInit() {
    if(!await this.has(VALUES.HEADER_LINKS)) {
      await this.set(VALUES.HEADER_LINKS, defaultHeaderLinks);
    }
    
    if(!await this.has(VALUES.MOBILE_MENU_LINKS)) {
      await this.set(VALUES.MOBILE_MENU_LINKS, defaultMobileMenuLinks);
    }

    if(!await this.has(VALUES.FOOTER_LINKS)) {
      await this.set(VALUES.FOOTER_LINKS, defaultFooterLinks);
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
    if(
      key === VALUES.HEADER_LINKS ||
      key === VALUES.MOBILE_MENU_LINKS ||
      key === VALUES.FOOTER_LINKS
    ) {
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
