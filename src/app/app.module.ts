import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    MLAnalysisComponent
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
    NgSelectModule  
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
