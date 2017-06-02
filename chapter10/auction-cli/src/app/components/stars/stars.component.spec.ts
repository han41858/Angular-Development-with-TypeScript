import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsComponent } from './stars.component';

describe('StarsComponent', () => {
  let component : StarsComponent;
  let fixture : ComponentFixture<StarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [StarsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('is successfully injected', () => {
    expect(component instanceof StarsComponent).toEqual(true);
  });

  it('readonly property is true by default', () => {
    expect(component.readonly).toEqual(true);
  });

  it('all stars are empty', () => {
    const element = fixture.nativeElement;
    const cmp = fixture.componentInstance;
    cmp.rating = 0;

    fixture.detectChanges();

    const selector = '.glyphicon-star-empty';
    expect(element.querySelectorAll(selector).length).toBe(5);
  });

  it('all stars are filled', () => {
    const element = fixture.nativeElement;
    const cmp = fixture.componentInstance;
    cmp.rating = 5;

    fixture.detectChanges();

    const selector = '.glyphicon-star:not(.glyphicon-star-empty)';
    expect(element.querySelectorAll(selector).length).toBe(5);
  });

  it('emits rating change event when readonly is false', async(() => {
    component.ratingChange.subscribe(r => {
      expect(r).toBe(3);
    });
    component.readonly = false;
    component.fillStarsWithColor(2);
  }));
});
