import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label: string
  @Input() fieldType: 'login' | 'search' | undefined
  @Input() isValid: boolean
  @Input() isTouched: boolean
  @Input() value: string
  @Input() placeholder: string
  @Input() onChange: () => void
  @Input() onBlur: () => void
  @Input() errorMessage: string

  constructor() {
    this.label = ''
    this.isValid = false
    this.isTouched = false
    this.value = ''
    this.placeholder = ''
    this.onChange = () => {}
    this.onBlur = () => {}
    this.errorMessage = 'Error'
  }
}
