import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { SimilarityComponent } from './components/similarity/similarity.component'
import { DataComponent } from './components/data/data.component'
import { AmbiguityComponent } from './components/ambiguity/ambiguity.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { KeyInformationComponent } from './components/key-information/key-information.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'similarity',
    component: SimilarityComponent,
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
  {
    path: 'key_information',
    component: KeyInformationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
