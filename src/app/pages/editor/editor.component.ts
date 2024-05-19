import { EnumPositionType, FocusedData, WHITES, ZEROS } from './../../models/segment';
import { Component, OnInit } from '@angular/core';
import { Options } from '../../models/bank';
import { Router } from '@angular/router';
import { Field, Position, Segment, Template } from '../../models/segment';
import { CommonModule } from '@angular/common';
import { TemplateService } from '../../services/template.service';
import { FormsModule } from '@angular/forms';
import { SegmentComponent } from '../../components/segment/segment.component';
import { SegmentTableComponent } from '../../components/segment-table/segment-table.component';
import { UtilService } from '../../services/util.service';
import { NoteComponent } from '../../components/note/note.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, SegmentComponent, SegmentTableComponent, NoteComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit{

  selectedOptions!: Options;
  template!: Template[];
  segments: Segment[] = [];
  focusedData!: FocusedData | null;
  caretPosition!: number;

  positionTypes: any = {
    'A': 'Alfanumérico',
    'N': 'Numérico',
    'D': 'Data',
    'M': 'Valor monetário',
  }

  constructor(
    private router: Router,
    private templateService: TemplateService,
    private util: UtilService
  ) {}

  ngOnInit(): void {
    this.getSelectedOptions();
    this.fillInTextEditor();
  }

  getSelectedOptions() {
    const stored:string = localStorage.getItem('options') as string;
    this.selectedOptions = JSON.parse(stored);
    this.template = this.templateService.getTemplateById(this.selectedOptions.fileTypeId as number);
  }

  fillInTextEditor() {
    if (this.selectedOptions.content) {
      let textContent = this.selectedOptions.content.split('\n');
      if (textContent.length) {
        textContent.forEach(line => {
          let templateSegment = this.template.find(tempSegment => tempSegment.matchSegment(line));
          if (templateSegment) {
            this.segments.push(this.convertToSegment(templateSegment, line));
          }
        })
      }
    } else {
      let requiredSegments = this.template.filter(seg => !seg.optional);
      requiredSegments.forEach(segment => {
        let segmentContent = '';
        segment.positions.forEach(position => segmentContent += this.getDefaultContent(position));
        this.segments.push(this.convertToSegment(segment, segmentContent));
      });
    }
  }

  convertToSegment(template: Template, lineContent: string): Segment {
    const fields: Field[] = this.getFieldsFromPositions(template.positions, lineContent);
    const segment: Segment = {
      id: crypto.randomUUID(),
      description: template.description,
      optional: template.optional,
      fields
    }
    return segment
  }

  getFieldsFromPositions(positions: Position[], lineContent: string): Field[] {
    const fields: Field[] = [];
    positions.forEach(position => {
      const positionLength = (position.end - position.init) + 1;
      const id = Math.floor(position.id * (100000 * Number(Math.random().toFixed(5))));
      const content: string = lineContent ? this.getFieldContent(lineContent, position) : this.util.getChars(positionLength, ' ');
      const field: Field = { id, content, position };
      fields.push(field);
    });
    return fields;
  }

  goBack() {
    this.router.navigate(['home']);
  }

  getFieldContent(segmentContent: string, position: Position): string {
    return segmentContent.substring((position.init-1), (position.end));
  }

  getDefaultContent(position: Position): string {
    const positionLength = (position.end - position.init) + 1;
    if (position.default) {
      if (position.default === ZEROS) {
        return this.util.getChars(positionLength, '0');
      }
      if (position.default === WHITES) {
        return this.util.getChars(positionLength, ' ');
      }
      return position.default;
    }
    return this.util.getContentByPositionType(positionLength, position.type);
  }

  onSegmentFocus(focusedData: FocusedData | null) {
    if (focusedData) {
      this.focusedData = focusedData;
      document.getElementById(String(`field-${focusedData.field.id}`))?.focus();
    }
  }

  onChangeSegment(focusedData: FocusedData | null) {
    if (focusedData?.direction) {
      const segmentIndex: number = this.segments.findIndex(segment => segment.id === focusedData.segment.id);
      if (segmentIndex >= 0 && segmentIndex < this.segments.length) {
        const segmentToFocus = this.segments[segmentIndex+focusedData.direction];
        const fieldIndex = segmentToFocus.fields.findIndex(field => {
          return field.position.init <= this.caretPosition && field.position.end >= this.caretPosition
        }) as number;

        if (this.canMoveUpOrDown(segmentIndex, focusedData.direction) && segmentToFocus && fieldIndex > -1) {
          const fieldToFocus = segmentToFocus.fields[fieldIndex] || segmentToFocus.fields[segmentToFocus.fields.length-1];
          document.getElementById(String(`field-${fieldToFocus.id}`))?.focus();
        }
      }
    }
  }

  canMoveUpOrDown(segmentIndex: number, direction: number): boolean {
    const futureIndex = segmentIndex + direction;
    return futureIndex >= 0 && futureIndex <= this.segments.length - 1;
  }

  onCaretMove(caretPosition: number) {
    this.caretPosition = caretPosition;
  }

  getType(type: EnumPositionType | undefined) {
    return type ? this.positionTypes[type] : this.positionTypes['A'];
  }

  exportFile() {
    let fileType = this.selectedOptions.cnab?.fileOptions.find(f => f.id === this.selectedOptions.fileTypeId);
    let generatedText = '';
    this.segments.forEach(seg => {
      let text = '';
      seg.fields.forEach(field => text += field.content);
      generatedText = generatedText.concat(text).concat('\n');
    });
    const a = document.createElement('a');
    a.href = `data:text/plain,${generatedText}`;  
    a.download = `${this.selectedOptions.bank?.name}${this.selectedOptions.cnab?.name}.${fileType?.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
