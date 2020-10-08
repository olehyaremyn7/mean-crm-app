import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../shared/interfaces/interfaces";
import {CategoriesService} from "../../../../shared/services/categories.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {AlertService} from "../../../../shared/services/alert.service";

@Component({
  selector: 'app-new-category-page',
  templateUrl: './new-category-page.component.html',
  styleUrls: ['./new-category-page.component.scss']
})

export class NewCategoryPageComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef

  isNew = true;
  form: FormGroup;
  submitted = false;
  image: File;
  imagePreview: string | ArrayBuffer = ''
  category: Category;

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService,
              private router: Router,
              private alert: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ])
    });

    this.form.disable();
    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {

            this.isNew = false;
            return this.categoriesService.getById(params['id'])
          }

          return of(null)
        }
      )
    )
      .subscribe(
        category => {
          if (category) {
            this.category = category;
            this.form.patchValue({
              name: category.name
            })
            this.imagePreview = category.imagePath
          }
          this.form.enable();
      }, error => { this.alert.danger(error.error.message) })
  }

  submit() {
    let observable$

    if (this.form.invalid) {
      return
    }

    this.form.disable();
    this.submitted = true;

    if (this.isNew) {
      observable$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      observable$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }

    observable$.subscribe(
      category => {
        this.category = category;
        this.alert.warning('Changes saved');
        this.form.enable();
      },
      error => {
        this.alert.danger(error.error.message);
        this.form.enable();
      }
    )
    setTimeout(() => {
      this.router.navigate(['/categories']);
    }, 1000)
  }

  fileInput() {
    this.inputRef.nativeElement.click();
  }

  fileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file);
  }

  remove() {
    const decision = window.confirm(`Do you want to delete the category ${this.category.name}?`);

    if (decision) {
      this.categoriesService.remove(this.category._id).subscribe(
        response => this.alert.success(response.message),
          error => this.alert.danger(error.error.message),
        () => this.router.navigate(['/categories'])
      )
    }
  }
}
