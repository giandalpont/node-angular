import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: (): any => import('./home/home.component').then((m) => m.HomeComponent)
    },
    { path: '', pathMatch: 'full', redirectTo: 'home' }
    // { path: '**', pathMatch: 'full' , redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PagesRoutesModule {}