import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../../shared/services/positions.service";
import {Position} from "../../../../shared/interfaces/interfaces";
import {MaterialModal, Modal} from "../../../../shared/services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertService} from "../../../../shared/services/alert.service";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})

export class PositionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef

  form: FormGroup;
  submitted = false;
  loading = false;
  positions: Position[] = [];
  positionSubscription: Subscription;
  modal: Modal;
  positionId = null;

  constructor(private positionsService: PositionsService,
              private alert: AlertService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      cost: new FormControl(1, [
        Validators.required,
        Validators.min(1)
      ])
    })

    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(
      positions => {
        this.positions = positions
        this.loading = false
      }
    )
  }

  ngOnDestroy() {
    this.modal.destroy();
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialModal.initModal(this.modalRef);
  }

  openPositionModal(position: Position) {
    this.positionId = position._id;
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    });
    this.modal.open();
    MaterialModal.updateTextInputs()
  }

  openModal() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1
    });
    this.modal.open();
    MaterialModal.updateTextInputs()
  }

  remove(position: Position) {
    const decision = window.confirm(`Do you want to delete position ${position.name}?`);

    if (decision) {
      this.positionSubscription = this.positionsService.remove(position).subscribe(
        response => {
          const index =this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(index, 1);
          this.alert.success(response.message);
        },
        error => this.alert.danger(error.error.message)
      )
    }
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.form.disable();
    this.submitted = true;

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close();
      this.form.reset({
        name: '', cost: 1
      });
      this.form.enable();
    }

    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionSubscription = this.positionsService.update(newPosition).subscribe(
        position => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions[index] = position;
          this.submitted = false;
          this.alert.warning('Position updated');
        },
        error => {
          this.alert.danger(error.error.message);
        }, completed
      )
    } else {
      this.positionSubscription = this.positionsService.create(newPosition).subscribe(
        position => {
          this.positions.push(position);
          this.alert.success('Position created');
          this.submitted = false;
        },
        error => {
          this.alert.danger(error.error.message);
        }, completed
      )
    }
  }

}
