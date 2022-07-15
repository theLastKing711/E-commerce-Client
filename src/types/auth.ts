export interface IRegister {
  username: string,
  email: string,
  password: string
}

export interface ILogin {
  username: string,
  password: string
}

export interface IResponse {
  status: string,
  message: string
}

export interface IToken {
  username: string,
  token: string,
  expiration: string
}
