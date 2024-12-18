import {Piece} from "./piece.model";

export interface Device {
  _id: string;
  name: string;
  status: "on" | "off";
  room?: Piece; // ID de la pièce
  type: string;
  specificParams: {
    color?: string;
    powerConsumption: number; // Watt/h
  };
  lastConnected?: Date;
  consumption: number; // Watt
  createdAt?: Date;
  updatedAt?: Date;
}
