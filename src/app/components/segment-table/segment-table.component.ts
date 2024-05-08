import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FocusedData } from '../../models/segment';

@Component({
  selector: 'segment-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segment-table.component.html',
  styleUrl: './segment-table.component.css'
})
export class SegmentTableComponent implements OnChanges{
  
  @Input()
  focusedData!: FocusedData | null;

  constructor() {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['focusedData']) {
      const data = changes['focusedData'].currentValue;
      const element = document.getElementById(String(data?.field.id));
      element?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }
  }
}
