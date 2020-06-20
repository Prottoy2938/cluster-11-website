/// <reference types="next" />
/// <reference types="next/types/global" />

//declaring image type typescript
declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const value: any;
  export = value;
}
