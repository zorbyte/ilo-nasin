declare module "eta" {
  // this is called me being lazy.
  // it works tho
  // - jan Oka
  export function renderFile(
    path: string,
    options: object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (e: any, rendered?: string | undefined) => void
  ): void;
}
