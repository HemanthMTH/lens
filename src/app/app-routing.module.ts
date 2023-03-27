import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { ChartsComponent } from './components/charts/charts.component'
import { DataComponent } from './components/data/data.component'
import { AmbiguityComponent } from './components/ambiguity/ambiguity.component';
import { KeywordComponent } from './components/keyword/keyword.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'charts',
    component: ChartsComponent,
  },
  {
    path: 'data',
    component: DataComponent,
  },
  {
    path: 'ambiguity',
    component: AmbiguityComponent,
  },
  {
    path: 'keyword',
    component: KeywordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
