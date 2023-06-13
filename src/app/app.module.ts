import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { GoogleChartsModule } from 'angular-google-charts';
import { PlotlyModule } from 'angular-plotly.js';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import * as PlotlyJS from 'plotly.js-dist-min';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmbiguityComponent } from './components/ambiguity/ambiguity.component';
import { BibtexCitationComponent } from './components/bibtex-citation/bibtex-citation.component';
import { BooleanCellRendererComponent } from './components/boolean-cell-renderer/boolean-cell-renderer.component';
import { ButtonRendererComponent } from './components/button/button.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DataComponent } from './components/data/data.component';
import { DatasetComponent } from './components/dataset/dataset.component';
import { FeatureModalComponent } from './components/feature-modal/feature-modal.component';
import { FeaturesComponent } from './components/features/features.component';
import { HomeComponent } from './components/home/home.component';
import { KeyInformationComponent } from './components/key-information/key-information.component';
import { KeywordModalComponent } from './components/keyword-modal/keyword-modal.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { LawyerComponent } from './components/lawyer/lawyer.component';
import { MembersComponent } from './components/members/members.component';
import { MLAnalysisComponent } from './components/mlanalysis/mlanalysis.component';
import { ModalComponent } from './components/modal/modal.component';
import { PolicyTextModalComponent } from './components/policy-text-modal/policy-text-modal.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { RegulatorComponent } from './components/regulator/regulator.component';
import { SimilarityComponent } from './components/similarity/similarity.component';
import { UrlRendererComponent } from './components/url-renderer/url-renderer.component';
import { PastComponent } from './components/past/past.component';

PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    SimilarityComponent,
    HomeComponent,
    DataComponent,
    AmbiguityComponent,
    KeywordComponent,
    KeyInformationComponent,
    MLAnalysisComponent,
    MembersComponent,
    PublicationsComponent,
    DatasetComponent,
    PrivacyPolicyComponent,
    FeaturesComponent,
    ModalComponent,
    BibtexCitationComponent,
    FeatureModalComponent,
    ButtonRendererComponent,
    PolicyTextModalComponent,
    BooleanCellRendererComponent,
    KeywordModalComponent,
    UrlRendererComponent,
    CustomersComponent,
    LawyerComponent,
    RegulatorComponent,
    PastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    GoogleChartsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    PlotlyModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    PdfViewerModule,
    AgGridModule,
    NgbTooltipModule,
    NgbModalModule,
    NgSelectModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
