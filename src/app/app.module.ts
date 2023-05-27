import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SimilarityComponent } from './components/similarity/similarity.component';
import { HomeComponent } from './components/home/home.component';
import { DataComponent } from './components/data/data.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmbiguityComponent } from './components/ambiguity/ambiguity.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { KeywordComponent } from './components/keyword/keyword.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AgGridModule } from 'ag-grid-angular';
import { KeyInformationComponent } from './components/key-information/key-information.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MLAnalysisComponent } from './components/mlanalysis/mlanalysis.component';
import { MembersComponent } from './components/members/members.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { DatasetComponent } from './components/dataset/dataset.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { SimilarityTextComponent } from './components/similarity-text/similarity-text.component';
import { FeaturesComponent } from './components/features/features.component';
import { ModalComponent } from './components/modal/modal.component';
import { BibtexCitationComponent } from './components/bibtex-citation/bibtex-citation.component';
import { PaperComponent } from './components/paper/paper.component';


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
    SimilarityTextComponent,
    FeaturesComponent,
    ModalComponent,
    BibtexCitationComponent,
    PaperComponent
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
    NgSelectModule  
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
