import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { CharacterService } from 'src/app/shared/components/service/character.service';
import { ICharacter } from 'src/app/shared/interfaces/character.interface';
import { IResponse } from 'src/app/shared/interfaces/response.interface';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styles: [],
})
export class CharacterListComponent {
  @Inject(DOCUMENT) private document: Document;
  characters: ICharacter[] = [];
  info: IResponse<any> = {
    info: {
      count: null,
      next: null,
      pages: null,
      prev: null,
    },
  };
  private page: number = 1;
  private query: string;
  private hideScrollHeight: number = 200;
  private showScrollHeight: number = 500;
  showButton: boolean;
  constructor(
    private readonly characterSrvc: CharacterService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.onUrlChanged();
  }
  ngOnInit(): void {
    // this.getData();
    this.getCharacters();
  }
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if (
      yOffSet ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop > this.showScrollHeight
    ) {
      this.showButton = true;
    } else if (
      yOffSet ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop < this.hideScrollHeight
    ) {
      this.showButton = false;
    }
  }
  onScrollDown() {
    if (this.info.info.next) {
      this.page++;
      this.getCharacters();
    }
  }

  onScrollTop() {
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          this.characters = [];
          this.page = 1;
          this.getCharacters();
        },
      });
  }

  private getCharacters(): void {
    this.route.queryParams.pipe(take(1)).subscribe({
      next: (params) => {
        this.query = params['q'];
        this.getData();
      },
    });
  }

  private getData(): void {
    this.characterSrvc
      .searchCharacters<ICharacter>(this.query, this.page)
      .pipe(take(1))
      .subscribe({
        next: ({ info, results }) => {
          if (results.length > 0) {
            this.info.info = info;
            this.characters = [...this.characters, ...results];
          } else {
            this.characters = [];
          }
        },
      });
  }
}
