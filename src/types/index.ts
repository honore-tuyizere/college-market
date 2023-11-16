import { ComponentType, ReactNode } from "react";

export interface IRoute {
  path: string;
  element: ComponentType<unknown>;
  isProtected?: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface ICategoryRequest {
  id?: string;
  name: string;
}

export interface ICondition {
  _id: string;
  name: string;
}

export interface IConditionRequest {
  _id?: string;
  name: string;
}

export interface IPurpose {
  _id: string;
  name: string;
  slug: string;
}

export interface IPurposeRequest {
  id?: string;
  name: string;
  slug: string;
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
  category: ICategory;
  college?: ICollege;
  description: string;
  owner: IUser;
}

export interface INotice {
  name: string;
  photo: string;
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

export interface ISingleProduct extends IProduct {
  similar: IProduct[];
}

export interface INoticeRequest {
  id?: string;
  name: string;
  photo?: string;
  description: string;
}

export interface ProductListProps {
  filtersComponent?: ReactNode;
  title?: string;
  isLoading: boolean;
  products: IProduct[] | undefined;
  orders?: IOrderedProduct[];
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
  college?: {
    _id: string;
    name: string;
  };
}
export interface ICollege {
  _id: string;
  name: string;
}

export interface IOrder {
  _id: string;
  product: IProduct;
  orderer: IUser;
  phone?: string;
}

export interface IOrderRequest {
  id?: string;
  product?: string;
}

export interface IProductFilter {
  categories?: string[];
  colleges?: string[];
}

export interface IChat {
  _id: string;
  buyer: string;
  owner: string;
  product: string;
  acceptedPrice: number;
}

export interface IAcceptPrice {
  _id?: string;
  price: number;
}

export interface IChatDTO {
  _id: string;
  buyer: IUser;
  product: IProduct;
  acceptedPrice?: number;
  owner: IUser;
  messages?: IMessage[];
}

export interface IMessage {
  _id: string;
  chat: IChat;
  sender: IUser | string;
  text: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IMessageRequest {
  chat: string;
  text: string;
}
export interface IOrderedProduct extends IOrder {
  paymentStatus: string;
  deliveryStatus: string;
}
