export interface UserPreferences {
    role:"admin"|"regular"|"disabled";
    name:string;
    theme:string;
    [key:string]:boolean|string|number;
}