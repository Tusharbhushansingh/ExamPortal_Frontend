import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-catorgies',
  templateUrl: './view-catorgies.component.html',
  styleUrls: ['./view-catorgies.component.css']
})
export class ViewCatorgiesComponent implements OnInit {

  categories=[
    {
    cid:23,
    title:'programming',
    description:'this is example'
    }
]

  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any) =>{
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!","Error in loading data");
      }
    );
  }

}
