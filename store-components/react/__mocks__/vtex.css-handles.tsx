interface Handles {
  [key: string]: string;
}

export const useCssHandles = (cssHandles: string[]) => {
  const handles = {} as Handles;

  cssHandles.forEach((handle) => {
    handles[handle] = handle;
  });

  return handles;
};
