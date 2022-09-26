export interface StatusParam {
  name: string;
  value: number | string;
  isHidden: boolean;
}

export interface StatusNumber extends StatusParam {
  value: number;
}

export interface Status {
  [key: string]: StatusParam;
}
