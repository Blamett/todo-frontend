import { Route } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { RegisterComponent } from "./components/register/register.component";

export const routes: Route[] = [
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "", component: MainComponent },
    { path: "**", redirectTo: "login" },
];