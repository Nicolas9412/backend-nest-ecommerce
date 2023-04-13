import { Schema } from 'mongoose';

import { Role } from '../../roles/roles.enum';

export const UserSchema = new Schema(
  {
    username: { require: true, type: String },
    password: { require: true, type: String },
    roles: { require: true, type: Array, default: Role.User },
  },
  { versionKey: false },
);
