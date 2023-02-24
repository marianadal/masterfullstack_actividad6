import { User } from './user.interface';

export interface UserPage {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: User[];
}
