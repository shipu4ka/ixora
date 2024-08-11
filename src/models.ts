export interface ICarInfo {
  id: number;
  name: string;
  link: string;
  parent_id?: string;
}

export interface IWipersParams {
  length1: string;
  length2: string;
  length3?: string;
  fasten: string;
}
