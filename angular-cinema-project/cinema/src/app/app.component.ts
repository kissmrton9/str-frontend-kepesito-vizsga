import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   categoryCardList = [
    {title: 'Csillagok között', year: 2009, category: 'Fantasy', imgUrl:'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1371&q=80' },
    {title: 'Top Gun', year: 1990, category: 'Action', imgUrl: 'https://images.unsplash.com/photo-1551796880-ddd03f861ae7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1314&q=80' },
    {title: 'Titanic', year: 1997, category: 'Drama', imgUrl: 'https://images.unsplash.com/photo-1500077423678-25eead48513a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
  ];

  chosenByCategory = this.categoryCardList[0];

  constructor(){}

  selectCategory(category){
    const i:number = ['Fantasy','Action','Drama'].indexOf(category);
    if(i>=0) this.chosenByCategory = this.categoryCardList[i];
  }

}
