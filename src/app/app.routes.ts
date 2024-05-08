import { Routes } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'editor',
        component: EditorComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '**',
        component: HomeComponent
    }
];
