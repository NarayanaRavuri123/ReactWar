export interface ISideNav {
  home: ISideNavInput;
  orders: ISideNavInput;
  inventory: ISideNavInput;
  productsAndSolutions: ISideNavInput;
  education: ISideNavInput;
  administration: ISideNavInput;
}

export interface ISideNavInput {
  labelText: string;
  isVisible: boolean;
}
