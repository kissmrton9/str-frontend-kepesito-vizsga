import { ComponentFixture, TestBed,  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MovieComponent } from './movie.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../service/http.service';

describe('Movie komponens elemeinek tesztelése', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  window.onbeforeunload = jasmine.createSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Létrejön a Movie Komponens', () => {
    expect(component).toBeTruthy();
  });

  it('Label elemek megfelelő szöveggel léteznek', () => {
    const compiledComponent = fixture.debugElement.nativeElement;

    const titleLabel = compiledComponent.querySelector('label[for="title"]');
    const yearLabel = compiledComponent.querySelector('label[for="year"]');
    const categoryLabel = compiledComponent.querySelector('label[for="category"]');

    // Elemek léteznek:
    expect(titleLabel).toBeTruthy();
    expect(yearLabel).toBeTruthy();
    expect(categoryLabel).toBeTruthy();

    // Belső szöveges tartalom:
    expect(titleLabel.innerHTML).toBe('Movie Title:');
    expect(yearLabel.innerHTML).toBe('Release year:');
    expect(categoryLabel.innerHTML).toBe('Category:');
  });

  it('Input, Select elemek megfelelően léteznek', () => {
    const compiledComponent = fixture.debugElement.nativeElement;

    const titleInput: HTMLInputElement = compiledComponent.querySelectorAll('input#title')[0];
    const yearInput: HTMLInputElement = compiledComponent.querySelectorAll('input#year')[0];
    const selectElement: HTMLSelectElement = compiledComponent.querySelector('select');

    // Elemek léteznek:
    expect(titleInput).toBeTruthy();
    expect(yearInput).toBeTruthy();
    expect(selectElement).toBeTruthy();
  });

  it('Mentés gomb és Small elem létezésének tesztelése', () => {
    const compiledComponent  = fixture.debugElement.nativeElement;

    const button: HTMLButtonElement = compiledComponent.querySelector('button');
    const smallElement = compiledComponent.querySelector('small');

    expect(button).toBeTruthy();
    expect(button.innerHTML).toBe('Save');
    expect(smallElement).toBeTruthy();
    expect(smallElement.innerHTML).toBe('Fill all field to save!');
  });

  it('Bootstrap klasszok használata a form elemekre', () => {
    const compiledComponent = fixture.debugElement.nativeElement;

    const bootsrapContainer = compiledComponent.querySelector('.container-md');
    const bootsrapFormControls = compiledComponent.querySelectorAll('.form-control');
    const bootsrapeButton = compiledComponent.querySelector('.btn-warning');

    expect(bootsrapContainer).toBeTruthy();
    expect(bootsrapFormControls.length).toBe(3);
    expect(bootsrapeButton).toBeTruthy();
  });

  it('Bootstrap klasszok használata színekre', () => {
    const compiledComponent = fixture.debugElement.nativeElement;

    const labelElements: HTMLCollectionOf<HTMLLabelElement> = compiledComponent.querySelectorAll('label');

    const firstLabelClassList = labelElements[0].classList;
    const secondLabelClassList = labelElements[1].classList;
    const thirdLabelClassList = labelElements[2].classList;

    expect(firstLabelClassList.contains('text-warning')).toBeTrue();
    expect(secondLabelClassList.contains('text-warning')).toBeTrue();
    expect(thirdLabelClassList.contains('text-warning')).toBeTrue();

    const smallElement: HTMLElement = compiledComponent.querySelector('small');
    expect(smallElement).toBeTruthy();
    expect(smallElement.classList.contains('text-danger')).toBeTrue();
  });

  it('Az űrlap konténerének alap CSS beállításának ellenőrzése', () => {
    const compiledComponent = fixture.debugElement.nativeElement;

    const containerElement: HTMLElement = compiledComponent.querySelector('section');
    const containerStyles = window.getComputedStyle(containerElement);

    expect(containerStyles.backgroundColor).toBe('rgb(53, 53, 50)');
    expect(containerStyles.borderRadius).toBe('12px');
  });

});

describe('Movie űrlap validátor tesztjei', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  window.onbeforeunload = jasmine.createSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieComponent ],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Movie Title beviteli mező validálása', async () => {
    await By.css('input[name=title]');
    const titleControl = component.movieForm.controls.title;
    expect(titleControl.valid).toBeFalsy();

    titleControl.setValue('H');
    expect(titleControl.valid).toBeFalsy();

    titleControl.setValue('12Bohóc');
    expect(titleControl.valid).toBeFalsy();

    titleControl.setValue('Nagyon-nagyon-nagyon-nagyon hosszú cím');
    expect(titleControl.valid).toBeFalsy();

    // Helyes beviteli mező esetén:
    titleControl.setValue('Vissza a jövőbe');
    expect(titleControl.valid).toBeTruthy();
  });

  it('Release year beviteli mező validálása', async () => {
    await By.css('input[name=year]');
    const yearControl = component.movieForm.controls.year;
    expect(yearControl.valid).toBeFalsy();

    yearControl.setValue('BU');
    expect(yearControl.valid).toBeFalsy();

    yearControl.setValue('1999');
    expect(yearControl.valid).toBeTruthy();
  });

  it('Kategória választás validálása', async () => {
    await By.css('select[name=category]');
    const categoryControl = component.movieForm.controls.category;

    categoryControl.setValue('Fantasy');
    expect(categoryControl.valid).toBeTruthy();
  });

  it('Ha minden mező valid akkor a form is valid', async () => {
    await By.css('select[name=category]');
    expect(component.movieForm.valid).toBeFalsy();

    const titleControl = component.movieForm.controls.title;
    const yearControl = component.movieForm.controls.year;
    const categoryControl = component.movieForm.controls.category;

    titleControl.setValue('Hotel Budapest');
    yearControl.setValue('2011');
    categoryControl.setValue('Action');
    expect(component.movieForm.valid).toBeTruthy();
  });

  it('A Save gomb csak akkor kattintható, ha valid a form', async () => {
    await By.css('form button.btn');
    const compiledComponent = fixture.debugElement.nativeElement;

    // Kezdetben minden invalid
    const saveButton = compiledComponent.querySelector('form button.btn');
    const titleControl = component.movieForm.controls.title;
    const yearControl = component.movieForm.controls.year;
    const categoryControl = component.movieForm.controls.category;

    titleControl.setValue('Hotel Budapest');
    yearControl.setValue('1999');
    categoryControl.setValue('Action');

    fixture.detectChanges();

    expect(saveButton.disabled).toBeFalsy();
  });

  it('A saveMovie metódus meghívódik, ha rátudnak kattintani a gombra', async () => {
    await By.css('form button.btn');
    const compiledComponent = fixture.debugElement.nativeElement;
    const saveButton = compiledComponent.querySelector('button');

    const mosckSaveFunction = spyOn(component, 'saveMovie');

    // Valós értékeket veszünk fel, kattintható a gomb.
    const titleControl = component.movieForm.controls.title;
    const yearControl = component.movieForm.controls.year;
    const categoryControl = component.movieForm.controls.category;

    titleControl.setValue('Hotel Budapest');
    yearControl.setValue('1999');
    categoryControl.setValue('Action');

    fixture.detectChanges();

    saveButton.click();
    expect(mosckSaveFunction).toHaveBeenCalledTimes(1);
  });

  it('A saveMovie metódus visszaadja a form értékeit', async () => {
    await By.css('form button.btn');

    const movieForm = component.movieForm;

    movieForm.controls.title.setValue('Hotel Budapest');
    movieForm.controls.year.setValue('1999');
    movieForm.controls.category.setValue('Action');

    const movieObject = component.saveMovie();
    expect(movieObject.title).toBe('Hotel Budapest');
    expect(movieObject.year).toBe('1999');
    expect(movieObject.category).toBe('Action');
  });

});
