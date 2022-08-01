import { Route } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { PasswordRecoveryTabComponent } from "./components/password-recovery/password-recovery-tab.component";
import { RegisterComponent } from "./components/register/register.component";

export const routes: Route[] = [
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "recovery-password", component: PasswordRecoveryTabComponent },
    { path: "", component: MainComponent },
    { path: "**", redirectTo: "login" },
];