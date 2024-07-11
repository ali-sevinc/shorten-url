export type FormStateType =
  | {
      existedError?: string | undefined;
      urlError?: string | undefined;
      createError?: string | undefined;
    }
  | { url: string; slug: string }[]
  | null;
