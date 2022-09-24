export interface StatusParam {
  name: string;
  value: number | string;
  isHidden: boolean;
}

export interface Status {
  [key: string]: StatusParam;
}
