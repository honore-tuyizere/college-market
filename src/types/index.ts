import { ComponentType, ReactNode } from "react";

export interface IRoute {
  path: string;
  element: ComponentType<unknown>;
}

export interface Icategory {
  _id: string;
  name: string;
}

export interface ICondition {
  _id: string;
  name: string;
}

export interface Image {
  url: string;
}

export interface IProduct {
  _id: string;
  name: string;
  thumbnail: string;
  gallery: Array<Image>;
  price: number;
  condition: ICondition;
  category: Icategory;
  description: string;
}

export interface IProductRequest {
  id?: string;
  name: string;
  thumbnail?: string[];
  gallery?: string[];
  price: number;
  condition: string;
  category: string;
  description: string;
}

export interface ProductListProps {
  filtersComponent?: ReactNode;
  title?: string;
}

export interface FiltersComponentProps {
  label: string;
}
