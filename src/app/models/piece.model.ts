import {User} from "./user.model";
import {Device} from "./device.model";

export interface Piece {
  _id: string;
  name: string;
  type: string;
  floor: string;
  users: User[];  // Tableau des IDs des utilisateurs
  devices: Device[];
  createdAt?: string;
  updatedAt?: string;
}
