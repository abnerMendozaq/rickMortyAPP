import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'character-list',
    loadChildren: () =>
      import('./pages/character/character-list/character-list.module').then(
        (m) => m.CharacterListModule
      ),
  },
  {
    path: 'character-detail/:id',
    loadChildren: () =>
      import('./pages/character/character-detail/character-detail.module').then(
        (m) => m.CharacterDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
