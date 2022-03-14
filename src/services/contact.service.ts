import type { Contact } from '@/types/Contact';
import { BaseService } from './base.service';

class ContactService extends BaseService<Contact> {
  constructor() {
    super('contacts');
  }
}

export const contactService = new ContactService();
