import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbiguityComponent } from './components/ambiguity/ambiguity.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DataComponent } from './components/data/data.component';
import { DatasetComponent } from './components/dataset/dataset.component';
import { DiffComponent } from './components/diff/diff.component';
import { FeaturesComponent } from './components/features/features.component';
import { HomeComponent } from './components/home/home.component';
import { KeyInformationComponent } from './components/key-information/key-information.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { LawyerComponent } from './components/lawyer/lawyer.component';
import { MembersComponent } from './components/members/members.component';
import { MLAnalysisComponent } from './components/mlanalysis/mlanalysis.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { RegulatorComponent } from './components/regulator/regulator.component';
import { SimilarityComponent } from './components/similarity/similarity.component';
import { TermComponent } from './components/term/term.component';
import { TestComponent } from './components/test/test.component';
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
        path: 'features',
        component: FeaturesComponent,
    },

    {
        path: 'lawyer',
        component: LawyerComponent,
    },

    {
        path: 'customer',
        component: CustomersComponent,
    },

    {
        path: 'regulator',
        component: RegulatorComponent,
    },
    {
        path: 'info',
        component: TermComponent,
    },
    {
        path: 'test',
        component: TestComponent,
    },
    {
        path: 'diff',
        component: DiffComponent,
    },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
