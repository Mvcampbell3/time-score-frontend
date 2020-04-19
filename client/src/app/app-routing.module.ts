import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { GameListComponent } from './components/game-list/game-list.component'
import { InstructionsComponent } from './components/instructions/instructions.component';
import { GameInfoComponent } from './components/game-info/game-info.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'list', component: GameListComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: 'gameinfo/:id', component: GameInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
