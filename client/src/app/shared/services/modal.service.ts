import {ElementRef} from "@angular/core";

declare var M

export interface Modal {
  open?(): void
  close?(): void
  destroy?(): void
}

export class MaterialModal {
  static initModal(ref: ElementRef): Modal {
    return M.Modal.init(ref.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }
}
