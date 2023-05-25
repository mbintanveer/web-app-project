export interface UserCredentials {
    username: string,
    password: string
  }
 
  export interface LoggedInUser {
    is_doctor: boolean;
    is_pharmacy: boolean;
    user_id: number,
    token: string,
    is_patient:boolean,
  }