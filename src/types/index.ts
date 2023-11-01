import { ComponentType } from "react";

export interface IRoute {
  path: string;
  element: ComponentType<unknown>;
}

export interface Icategory {
  _id: string;
  name: string;
}
