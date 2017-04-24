import { MainContainerComponent } from './components/main-container/main-container.component';

export const routes = [
    { path: '', component: MainContainerComponent, pathMatch: 'full' },
    { path: 'share/:sharedData', component: MainContainerComponent },
    { path: ':filter', component: MainContainerComponent }
];