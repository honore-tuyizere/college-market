import { ComponentType, ReactNode } from "react";

export interface IRoute {
  path: string;
  element: ComponentType<unknown>;
}

export interface Icategory {
  _id: string;
  name: string;
}

export interface IProduct {
  image: string;
}

export interface ProductListProps {
  filtersComponent?: ReactNode;
  title?: string;
}
