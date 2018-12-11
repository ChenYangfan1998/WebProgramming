import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatDialogRef} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/typings/chips';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {DiaryService} from '../../services/diary/diary.service';
import {SnackBarService} from '../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-publish-diary-dialog',
  templateUrl: './publish-diary-dialog.component.html',
  styleUrls: ['./publish-diary-dialog.component.scss']
})
export class PublishDiaryDialogComponent {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];

  file;
  fileSrc;

  contentToSubmit;

  @ViewChild('tagInput') tagInput;

  constructor(
    public dialogRef: MatDialogRef<PublishDiaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public diaryService: DiaryService,
    public snackBarService: SnackBarService
    ) {
    this.diaryService.getAllTags().subscribe(
      (res: any) => {
        for ( const tag of res ) {
          this.allTags.push(tag.tag);
        }
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
          startWith(null),
          map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
      }
    );
  }

  submit () {
    this.snackBarService.showSnackBar('日志正在上传中');
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(this.tags);
    this.diaryService.uploadDiary(
      this.file ? this.file : this.data.blob,
      this.contentToSubmit,
      user.username,
      this.tags
    ).subscribe(
      () => {
        this.snackBarService.showSnackBar('完成！');
      }, (err) => {
        console.log(err);
        this.snackBarService.showSnackBar('上传失败...');
      }
    );
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.tagInput.nativeElement.value = '';
    this.tags.push(event.option.viewValue);
    this.tagCtrl.setValue(null);
  }


  addFile(fileDom) {
    const reader = new FileReader();
    this.file = fileDom.files[0];
    reader.onload = (e: any) => {
      this.fileSrc = e.target.result;
    };
    reader.readAsDataURL(this.file);
  }

  private _filter(value) {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
