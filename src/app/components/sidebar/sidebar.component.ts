import { animate, state, style, transition, trigger, ɵBrowserAnimationBuilder } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        state('open', style({ opacity: 1 })),
        state('closed', style({ opacity: 0 })),
        transition('closed => open', [ animate('.3s')]),
        transition('open => closed', [ animate('.3s')])
      ]
    )
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Input()
  isOpen!: boolean;

  @Output()
  toggled = new EventEmitter<boolean>();

  constructor(public router: Router) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.toggled.emit(this.isOpen); 
  }

}
