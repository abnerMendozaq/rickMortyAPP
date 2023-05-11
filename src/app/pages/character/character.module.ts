import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { CharacterComponent } from './character.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterDetailComponent,
    CharacterComponent,
  ],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [
    CharacterListComponent,
    CharacterDetailComponent,
    CharacterComponent,
  ],
})
export class CharacterModule {}
