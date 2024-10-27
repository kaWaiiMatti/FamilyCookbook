const printStuff = (stuff: string): void => {
  console.log(`hello ${stuff}`);
}

function helloClick(event: MouseEvent): void {
  console.log(`hello ${(event.target as HTMLButtonElement).name}`);
}
