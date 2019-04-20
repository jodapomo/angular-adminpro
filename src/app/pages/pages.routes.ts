import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic/medic.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../services/guards/admin.guard';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress'} },
            { path: 'graphics1', component: Graphics1Component, data: { title: 'Graphics'} },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Theme Settings'} },
            { path: 'profile', component: ProfileComponent, data: { title: 'User Profile'} },
            { path: 'search/:term', component: SearchComponent, data: { title: 'Search'} },

            // Maintenance
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [ AdminGuard ],
                data: { title: 'Users Maintenance'},
            },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals Maintenance'} },
            { path: 'medics', component: MedicsComponent, data: { title: 'Medics Maintenance'} },
            { path: 'medic/:id', component: MedicComponent, data: { title: 'Update Medic'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

