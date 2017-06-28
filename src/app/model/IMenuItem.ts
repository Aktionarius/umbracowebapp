export interface IMenuItem {
  name: string,
  path: string,
  menuText: string,
  menuImage: string,
  level: number,
  menuIcon: string,
  children?: Array<IMenuItem>
}
