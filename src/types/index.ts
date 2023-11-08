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

export interface FiltersComponentProps {
  label: string;
}

export interface IUser {
  _id: string;
  id: string;
  provider: string;
  displayName: string;
  name?: {
    familyName: string;
    givenName: string;
    middleName?: string;
  };
  email: string;
  emails?: Array<string>;
  photos?: Array<string>;
}
