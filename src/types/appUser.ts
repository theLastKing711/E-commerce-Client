interface baseAppUser {
  id: number;
  username: string;
  email: string;
}

export interface AppUser extends baseAppUser {

  createdAt: string;
  imagePath: string;
}

export interface AddAppUser extends baseAppUser {
  image: File
}













