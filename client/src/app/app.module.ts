import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Angular Fire
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

// Material
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';

// Components

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GamePageComponent } from './components/game-page/game-page.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { LoginComponent } from './components/login/login.component';
import { GameInfoComponent } from './components/game-info/game-info.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateGameComponent } from './components/create-game/create-game.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { EditGameComponent } from './components/edit-game/edit-game.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    GameListComponent,
    GamePageComponent,
    InstructionsComponent,
    LoginComponent,
    GameInfoComponent,
    ProfileComponent,
    CreateGameComponent,
    LoadingComponent,
    ErrorModalComponent,
    EditGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
