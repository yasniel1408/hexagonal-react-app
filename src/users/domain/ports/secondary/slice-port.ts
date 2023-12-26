export interface SlicePort {
  name: string;
  initialState: any;
  reducers: any;
  usersSlice: any;
  addUser(data: any): void;
  addUsers(data: any): void;
}
