import { Route } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";

export const routes: Route[] = [
    { path: "login", component: LoginComponent },
    { path: "", component: MainComponent },
    { path: "**", redirectTo: "login" },
];