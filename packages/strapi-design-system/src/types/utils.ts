export type PickType<TObject, TKey extends keyof TObject> = {
  [P in TKey]: TObject[P];
}[TKey];
