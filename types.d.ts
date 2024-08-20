export type User = {
  user_id: number;
  fname: string;
  lname: string;
  email: string;
};

export type JWT = {
  user_id: number;
  iat: number;
  exp: number;
};
