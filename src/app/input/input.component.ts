import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label: string = ''
  @Input() fieldType: 'login' | 'search' = 'search'
  @Input() isValid: boolean = false
  @Input() isTouched: boolean = false
  @Input() value: string = ''
  @Input() placeholder: string = ''
  @Input() onChange: () => void = () => {}
  @Input() onBlur: () => void = () => {}
  @Input() errorMessage: string = 'Error'
}
