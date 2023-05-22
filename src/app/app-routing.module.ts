import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SimilarityComponent } from './components/similarity/similarity.component';
import { DataComponent } from './components/data/data.component';
import { AmbiguityComponent } from './components/ambiguity/ambiguity.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { KeyInformationComponent } from './components/key-information/key-information.component';
import { MLAnalysisComponent } from './components/mlanalysis/mlanalysis.component';
import { MembersComponent } from './components/members/members.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { DatasetComponent } from './components/dataset/dataset.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SimilarityTextComponent } from './components/similarity-text/similarity-text.component';
import { FeaturesComponent } from './components/features/features.component';
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'comparison',
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
    {
        path: 'ml_analysis',
        component: MLAnalysisComponent,
    },
    {
        path: 'members',
        component: MembersComponent,
    },
    {
        path: 'publications',
        component: PublicationsComponent,
    },
    {
        path: 'dataset',
        component: DatasetComponent,
    },
    {
        path: 'privacy_policy',
        component: PrivacyPolicyComponent,
    },

    {
        path: 'similarity',
        component: SimilarityTextComponent,
    },

    {
        path: 'features',
        component: FeaturesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
