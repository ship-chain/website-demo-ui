export enum Language {
  en = 'en',
  zh = 'zh',
}

export enum BlockStatus {
  Finalized = 'Finalized',
  Unfinalized = 'Unfinalized',
  Failed = 'Failed',
}

export enum ExtrinsicStatus {
  Success = 'Success',
  Failed = 'Failed',
}

// export enum BlockStatus {
//   Finalized = 'Finalized',
//   Unfinalized = 'Unfinalized',
//   Failed = 'Failed',
// }

export enum FilterByKey {
  "All" = "All",
  "Address" = "Address",
  "ExtrinsicID" = "Extrinsic ID",
  "Token" = "Token",
  "BlockNumber" = "Block Number",
}