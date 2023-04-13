import { Role } from '../../roles/roles.enum';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export interface User extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  roles: Role[];
}
