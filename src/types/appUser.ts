interface baseAppUser {
  id: number;
  username: string;
  password: string;
  email: string;
  roleName: string;

}

export interface AppUser extends baseAppUser {

  createdAt?: string;
  imagePath?: string;

}

export interface AddAppUser extends baseAppUser {
  image: File
}













