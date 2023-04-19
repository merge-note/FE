export const openPopUp = (url: string) => {
  const width = 600;
  const height = 600;

  const left = window.innerWidth / 2 - width;
  const top = window.innerHeight / 2 - height / 2;

  const features = `width=${width},height=${height},left=${left},top=${top}`;
  const popup = window.open(url, "popup", features);
  popup?.focus();
};
