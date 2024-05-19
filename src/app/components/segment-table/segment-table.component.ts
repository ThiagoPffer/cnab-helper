import { FocusedData, Segment, Field } from './../../models/segment';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

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

  @Output()
  selectedField = new EventEmitter<FocusedData>();

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

  onSelect(field: Field) {
    this.selectedField.emit({
      field, segment: this.focusedData?.segment as Segment
    })
  }
}
