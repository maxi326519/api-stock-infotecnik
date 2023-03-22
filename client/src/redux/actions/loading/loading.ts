export const LOADING = "LOADING";
export const CLOSE_LOADING = "CLOSE_LOADING";

export function loading() {
  return {
    type: LOADING,
  };
}

export function closeLoading() {
  return {
    type: CLOSE_LOADING,
  };
}
