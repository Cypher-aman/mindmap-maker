export const findHexCode = (key: string) => {
  switch (key) {
    case 'red':
      return '#ef4444';
    case 'blue':
      return '#3b82f6';
    case 'green':
      return '#22c55e';
    case 'orange':
      return '#f97316';
    case 'purple':
      return '#d946ef';
    default:
      return '#2196f3';
  }
};

export const findColorName = (key: string) => {
  switch (key) {
    case '#ef4444':
      return 'red';
    case '#3b82f6':
      return 'blue';
    case '#22c55e':
      return 'green';
    case '#f97316':
      return 'orange';
    case '#d946ef':
      return 'purple';
    default:
      return 'blue';
  }
};
