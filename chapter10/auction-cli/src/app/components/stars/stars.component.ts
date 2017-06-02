import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector : 'app-stars',
  templateUrl : './stars.component.html',
  styleUrls : ['./stars.component.css']
})
export class StarsComponent {

  private _rating : number;
  stars : boolean[]; // do not set private here. it has error while 'ng build'

  private maxStars : number;

  @Input()
  readonly : boolean;

  @Input()
  get rating () : number {
    return this._rating;
  }

  set rating (value : number) {
    this._rating = value || 0;
    this.stars = Array(this.maxStars).fill(true, 0, this.rating);
  }

  @Output()
  ratingChange : EventEmitter<number> = new EventEmitter();

  constructor () {
    this.maxStars = 5;
    this.readonly = true;
  }

  fillStarsWithColor (index) {

    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
