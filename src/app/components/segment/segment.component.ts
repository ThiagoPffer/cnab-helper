import { Component, EventEmitter, Input, Output, TestabilityRegistry } from '@angular/core';
import { EnumPositionType, Field, FocusedData, Segment } from '../../models/segment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'segment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './segment.component.html',
  styleUrl: './segment.component.css'
})
export class SegmentComponent {

  KEY_FUNCTIONS: {[key: string]: Function} = {
    'Enter': (field: Field, event: KeyboardEvent) => {},
    'ArrowDown': (field: Field, event: KeyboardEvent) => {
      this.changeSegment.emit({segment: this.segmentData, field, direction: +1});
    },
    'ArrowUp': (field: Field, event: KeyboardEvent) => {
      this.changeSegment.emit({segment: this.segmentData, field, direction: -1});
    },
    'ArrowRight': (field: Field, event: KeyboardEvent) => {
      this.updateCaretPosition(field, event);
    },
    'ArrowLeft': (field: Field, event: KeyboardEvent) => {
      this.updateCaretPosition(field, event);
    }
  };

  positionTypeContents: any = {
    'A': ' ',
    'N': '0',
    'D': '0',
    'M': '0'
  }

  @Input()
  index!: number;

  @Input('data')
  segmentData!: Segment;

  @Input()
  isFocused: boolean = false;

  @Output()
  segmentFocused = new EventEmitter<FocusedData | null>();

  @Output()
  changeSegment = new EventEmitter<FocusedData | null>();

  @Output()
  caretMoved = new EventEmitter<number>();

  showOptions: boolean = false;

  constructor(
    private util: UtilService
  ) {}

  onFocus(field: Field, event: any) {
    event.target.select();
    this.showOptions = !!field.position.options?.length;
    this.updateCaretPosition(field, event);
    this.segmentFocused.emit({
      segment: this.segmentData,
      field
    });
  }

  onBlur(field: Field) {
    this.showOptions = false;
    const maxlength = (field.position.end - field.position.init + 1);
    if (!field.content.length || field.content.length < maxlength) {
      field.content = this.getContent(
        this.util.getContentByPositionType((maxlength - field.content.length), field.position.type), 
        field
      );
    }
    this.segmentFocused.emit(null);
  }

  getContent(fillContent: string, field: Field): string {
    if (field.position.type === EnumPositionType.N) {
      return fillContent + field.content;
    }
    return field.content + fillContent;
  }

  onKeyPress(field: Field, event: Event) {
    if (field.content.trim().length === 0) {
      field.content = '';
    }
  }

  onKeyUp(field: Field, event: KeyboardEvent) {
    if (this.KEY_FUNCTIONS[event.key]) {
      this.KEY_FUNCTIONS[event.key](field, event);
      return;
    }
    this.updateCaretPosition(field, event);
  }

  updateCaretPosition(field: Field, event: Event) {
    const target = event.target as any;
    const caretPosition = field.position.init + target.selectionStart;
    this.caretMoved.emit(caretPosition);
  }

}
