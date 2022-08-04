import { Base } from "./base";

export interface CategoryBase extends Base {
  name: string,
}

export interface Category extends CategoryBase {
   createdAt: string
}


export interface AddCategory extends CategoryBase {

}



export interface CategoryItemDto extends CategoryBase {
}
