import {Piece} from "./piece.model";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  role: 'admin' | 'user' | 'technician';
  createdAt?: string;
  updatedAt?: string;
  pieces?: Piece[]; // Liste des IDs de pièces
}

