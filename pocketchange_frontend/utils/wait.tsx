

export enum waitTimes {
  RefreshScreen = 500,
}

export default function wait(timeout: number) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
