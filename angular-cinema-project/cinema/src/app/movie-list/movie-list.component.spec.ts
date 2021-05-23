import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '../service/http.service';

import {of} from 'rxjs';
import { MovieListComponent } from './movie-list.component';

describe('Movie-List Komponens tesztelése', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  let mockHttpClient : {get: jasmine.Spy, delete: jasmine.Spy};
  let httpMockService : HttpService;
  let mockServerMovieList = [];
  const deletedMovie = { id: 7, title: "Top Gun", year: 1990, category: "Action" };

  beforeEach(async () => {
     mockServerMovieList =  [
      { title: "Vissza a jövőbe", year: 1990, category: "Fantasy" },
      { title: "Titanic", year: 1997, category: "Drama" },
      { title: "Charlie angyalai", year: 2003, category: "Action" },
      { title: "Robotzsaru", year: 1997, category: "Action" },
      { title: "Hangtalanul", year: 2015, category: "Fantasy" },
      { title: "Csillagok között",year: 2020, category: "Fantasy" },
      { title: "Top Gun", year: 1990, category: "Action" }
  ]
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    httpMockService = new HttpService(mockHttpClient as any);
    mockHttpClient.get.and.returnValue(of(mockServerMovieList));
    mockHttpClient.delete.and.returnValue(of(deletedMovie))

    await TestBed.configureTestingModule({
      declarations: [ MovieListComponent ],
      imports: [HttpClientModule],
      providers:[{provide: HttpService, useValue: httpMockService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Movie-list komponens létrejön', () => {
    expect(component).toBeTruthy();
  });

  it('Kezdetben üres a tábla', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const tableAllRows = document.querySelectorAll('tr');
    const dataRowsByClassSelector = document.querySelectorAll('.table-row');
    expect(tableAllRows.length).toBeLessThan(2);
    expect(dataRowsByClassSelector.length).toBe(0);
  });

  it('A táblázat fejléce megfelelő', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const thElements = document.querySelectorAll('th');
    expect(thElements.length).toBe(4);

    expect(thElements[0].innerHTML).toBe('Title');
    expect(thElements[1].innerHTML).toBe('Year');
    expect(thElements[2].innerHTML).toBe('Category');
  });

  it('A TH és SECTION elem SCSS szabályainak tesztelése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const firstTHelement = compiledComponent.querySelectorAll('th')[0];
    const thStyle = window.getComputedStyle(firstTHelement);

    expect(thStyle.minWidth).toBe('150px');
    expect(thStyle.textAlign).toBe('center');
    expect(thStyle.padding).toBe('8px');
    expect(thStyle.backgroundColor).toBe('rgb(53, 53, 50)');
    expect(thStyle.color).toBe('rgb(226, 197, 102)');
  })

  it('A SECTION elem SCSS szabályainak tesztelése', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    const sectionElement = compiledComponent.querySelector('.table-section');

    const sectionStyle = window.getComputedStyle(sectionElement);
    expect(sectionStyle.display).toBe('flex');
    expect(sectionStyle.flexDirection).toBe('column');
    expect(sectionStyle.alignItems).toBe('center');
  })

  it('GET kérés tesztelése, getHotels metódus meghívásakor felfrissül a helyi blog lista', ()=> {

    // HttpService getHotelList metódus tesztelése
    httpMockService.getMovieList().subscribe(
      (mockServerList)=> {
        expect(mockServerList).toBe(mockServerMovieList)
      },err => console.log(err)
    );

    // Hotel List komponens getHotels metódusa meghívja a service osztályt és frissiti a lokális listát
    component.getMovies();
    expect(component.movies).toEqual(mockServerMovieList);
  });

  it('A Get Movies gomb kattintásakor megjelennek az adatok a tábla soraiban', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;
    const button: HTMLButtonElement = compiledComponent.querySelector('button');

    button.click();
    fixture.detectChanges();

    const dataRows = compiledComponent.querySelectorAll('.table-row');
    expect(dataRows.length).toBe(7);

    const firstRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(1) td');
    expect(firstRow[0].innerHTML).toBe('Vissza a jövőbe');
    expect(firstRow[1].innerHTML).toBe('1990');
    expect(firstRow[2].innerHTML).toBe('Fantasy');

    const thirdRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(3) td');
    expect(thirdRow[0].innerHTML).toBe('Charlie angyalai');
    expect(thirdRow[1].innerHTML).toBe('2003');
    expect(thirdRow[2].innerHTML).toBe('Action');


    const fifthRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(5) td');
    expect(fifthRow[0].innerHTML).toBe('Hangtalanul');
    expect(fifthRow[1].innerHTML).toBe('2015');
    expect(fifthRow[2].innerHTML).toBe('Fantasy');

    const seventhRow:any = compiledComponent.querySelectorAll('.table-row:nth-child(7) td');
    expect(seventhRow[0].innerHTML).toBe('Top Gun');
    expect(seventhRow[1].innerHTML).toBe('1990');
    expect(seventhRow[2].innerHTML).toBe('Action');
  });

  it('A Get Movies gombra kattintva megjelenik 7db törlés gomb is', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const button: HTMLButtonElement = compiledComponent.querySelector('button');
    button.click();
    fixture.detectChanges();

    const deleteButtons: HTMLCollectionOf<HTMLButtonElement> = compiledComponent.querySelectorAll('.table-row button');
    expect(deleteButtons[0]).toBeTruthy();
    expect(deleteButtons[0].innerHTML).toBe('Delete');

    expect(deleteButtons[0]).toBeTruthy();
    expect(deleteButtons[2].innerHTML).toBe('Delete');

    expect(deleteButtons[0]).toBeTruthy();
    expect(deleteButtons[4].innerHTML).toBe('Delete');

    expect(deleteButtons[0]).toBeTruthy();
    expect(deleteButtons[6].innerHTML).toBe('Delete');
  });

  it('DELETE metódusok, új GET hívás tesztelése', () => {
    const idToDelete = 3;

    // HttpService deleteMovie metódus tesztelése
    // tslint:disable-next-line: deprecation
    httpMockService.deleteMovie(idToDelete).subscribe(
      (response) => { expect(response).toEqual(deletedMovie); },
      err => console.log(err)
    );
    // Movie-List komponens deleteMovie meghivása meghívja-e a getHívást megint:
    component.deleteMovie(1);
    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
    expect(mockHttpClient.delete).toHaveBeenCalledBefore(mockHttpClient.get);
  });

  it('A Delete gombra történő kattintás meghívja a service-t', ()=> {
    const compiledComponent = fixture.debugElement.nativeElement;

    const getMovieButton = compiledComponent.querySelector('button');
    getMovieButton.click();
    fixture.detectChanges();

    const allButtons = compiledComponent.querySelectorAll('button');

    const thirdButton = allButtons[3];
    thirdButton.click();
    fixture.detectChanges();

    expect(mockHttpClient.delete).toHaveBeenCalled();
  })
});

