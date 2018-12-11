import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ImageInfo} from './image-info';
import {HttpClient} from '@angular/common/http';
import {myConfig} from '../../../config/my-config';
import {MatDialog} from '@angular/material';
import {PublishDiaryDialogComponent} from '../../shared/publish-diary-dialog/publish-diary-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas;
  @ViewChild('outsideValue') outsideValue;
  ctx;

  clientWidth;
  widthProportion;

  mouseMoveCount = 0;
  mouseDownLocation = {x: 0, y: 0};

  uploadedImageList;
  uploadingNumber = 0;
  isUploading = false;

  fileList = [];

  preparedImageList = [
    '../../../assets/photo-shop/screen-shot.png',
    '../../../assets/photo-shop/iphone-screen-shot.jpeg',
    '../../../assets/photo-shop/screen-shot-1.png',
    '../../../assets/photo-shop/photo-1.jpg',
    '../../../assets/photo-shop/photo-2.jpg',
    '../../../assets/photo-shop/photo-3.jpg',
    '../../../assets/photo-shop/face-1.png',
    '../../../assets/photo-shop/face-2.png',
    '../../../assets/photo-shop/face-3.png',
    '../../../assets/photo-shop/face-4.png',
    '../../../assets/photo-shop/face-5.png',
  ];

  imageList: ImageInfo[] = [];

  selectedImage: ImageInfo;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit () {
    // this.reloadUpload();
  }

  ngAfterViewInit() {
    this.canvasInit();
    this.setWidthConfig();
  }

  canvasInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = 8;
    this.ctx.strokeStyle = '#D32F2F';
    this.ctx.fillStyle = '#ffffff';
  }

  openFileSelector() {
    document.getElementById('file-btn').click();
  }

  openPublishDialog () {
    if (this.selectedImage) {
      this.selectedImage = undefined;
      this.render();
      setTimeout(() => {
        this.creatDialog();
      }, 20);
    } else {
        this.creatDialog();
    }
    // dialogRef.afterClosed().subscribe(result => {
    // );
  }

  creatDialog() {
    let blob;
    this.canvas.nativeElement.toBlob((res) => {
      blob = res;
      const dialogRef = this.dialog.open(PublishDiaryDialogComponent, {
        width: '500px',
        data: {blob: blob,
          file: this.canvas.nativeElement.toDataURL()
        }
      });
    });
  }

  addFile(fileDom) {
    for (let i = 0; i < fileDom.files.length; i++) {
      const reader = new FileReader();
      const file = fileDom.files[i];
      this.fileList.push(file);
      reader.onload = (e: any) => {
        const img = document.createElement( 'img');
        img.src = e.target.result;
        img.onload = () => {
          let width, height, x, y;
          if (img.width > img.height) {
            height = img.height * 1600 / img.width;
            width = 1600;
            x = 800;
            y = (2000 - height) / 2;
          } else {
            width = img.width * 1200 / img.height;
            height = 1200;
            x = (3200 - width) / 2;
            y = 400;
          }
          this.imageList.push(new ImageInfo(img, width, height, x, y, 1));
          this.selectedImage = this.imageList[this.imageList.length - 1];
          this.render();
        };
      };
      reader.readAsDataURL(file);
    }
  }

  // upload (i) {
  //   this.isUploading = true;
  //   this.uploadingNumber++;
  //   const formDate = new FormData();
  //   formDate.append('file', this.fileList[i]);
  //   console.log(this.imageList[i].element.src);
  //   this.http.post(myConfig.baseUrl + 'upload', formDate).subscribe(
  //     () => {
  //       this.isUploading = false;
  //       this.uploadingNumber--;
  //       this.reloadUpload();
  //     }
  //   );
  // }

  addPrepared (i) {
    this.fileList.push(undefined);
    const img = document.createElement('img');
    img.src = this.preparedImageList[i];
    img.onload = () => {
      let width, height, x, y;
      if (img.width > img.height) {
        height = img.height * 1600 / img.width;
        width = 1600;
        x = 800;
        y = (2000 - height) / 2;
      } else {
        width = img.width * 1200 / img.height;
        height = 1200;
        x = (3200 - width) / 2;
        y = 400;
      }
      this.imageList.push(new ImageInfo(img, width, height, x, y, 1));
      this.selectedImage = this.imageList[this.imageList.length - 1];
      this.render();
    };
  }
  addUploaded (i) {
    const img = document.createElement('img');
    img.src = this.uploadedImageList[i];
    this.fileList.push(undefined);
    img.onload = () => {
      let width, height, x, y;
      if (img.width > img.height) {
        height = img.height * 1600 / img.width;
        width = 1600;
        x = 800;
        y = (2000 - height) / 2;
      } else {
        width = img.width * 1200 / img.height;
        height = 1200;
        x = (3200 - width) / 2;
        y = 400;
      }
      this.imageList.push(new ImageInfo(img, width, height, x, y, 1));
      this.selectedImage = this.imageList[this.imageList.length - 1];
      this.render();
    };
  }

  render() {
    // 排序，这里采用简单的冒泡排序
    const imageListCopy = this.imageList.concat();
    console.log(imageListCopy);
    for (let i = 0; i < imageListCopy.length; i++) {
      for (let j = i; j < imageListCopy.length; j++) {
        if (imageListCopy[i].zIndex > imageListCopy[j].zIndex) {
          const temp = imageListCopy[i];
          imageListCopy[i] = imageListCopy[j];
          imageListCopy[j] = temp;
        }
      }
    }
    if (this.selectedImage) {
      imageListCopy.push(this.selectedImage);
    }

    // 对于z轴排序完成的数组进行渲染
    this.ctx.clearRect(0, 0, 3200, 2000);
    this.ctx.rect(0, 0, 3200, 2000);
    this.ctx.fill();
    for (const img of imageListCopy) {
      let outside;
      let x, y, width, height;
      let shadowFlag = false;
      if (img.outside === 'mac') {
        outside = document.createElement('img');
        outside.src = ('../../../assets/photo-shop/MacBookPro.png');
        x = img.x - 230 / 1155 * img.width;
        y = img.y - 50 / 720 * img.height;
        width = img.width * 1615 / 1155;
        height = img.height * 890 / 720;
      } else if (img.outside === 'iPhone') {
        outside = document.createElement('img');
        outside.src = ('../../../assets/photo-shop/iphone.png');
        x = img.x - 69 / (492 - 69) * img.width;
        y = img.y - 149 / (895 - 149) * img.height;
        width = img.width * 780 / (492 - 69);
        height = img.height * 1224 / (895 - 149);
      } else if (img.outside === 'shadow') {
        // 阴影
        shadowFlag = true;

      }
      // 有外部条件
      if (outside) {
        outside.onload = () => {
          this.ctx.drawImage(outside, x, y, width, height);
          this.ctx.drawImage(img.element, img.x, img.y, img.width, img.height);
        };
      } else {
        // 无外部条件
        setTimeout(() => {
          if (shadowFlag) {
            this.ctx.shadowColor = 'RGBA(0,0,0,0.2)';
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.shadowBlur = 100;
            this.ctx.drawImage(img.element, img.x, img.y, img.width, img.height);
            this.ctx.shadowColor = 'rgba(0,0,0,0)';
            this.ctx.shadowBlur = 0;
          } else {
            this.ctx.drawImage(img.element, img.x, img.y, img.width, img.height);
          }
        }, 0.1);
      }
    }
    // 渲染大小框和移动操作
    if (this.selectedImage) {
      setTimeout(() => {
        this.ctx.beginPath();
        this.ctx.rect(this.selectedImage.x - 14, this.selectedImage.y - 14, 20, 20);
        this.ctx.rect(this.selectedImage.x + this.selectedImage.width - 6, this.selectedImage.y - 14, 20, 20);
        this.ctx.rect(this.selectedImage.x + this.selectedImage.width - 6, this.selectedImage.y + this.selectedImage.height - 6, 20, 20);
        this.ctx.rect(this.selectedImage.x - 14, this.selectedImage.y + this.selectedImage.height - 6, 20, 20);

        this.ctx.moveTo(this.selectedImage.x - 8, this.selectedImage.y - 4);
        this.ctx.lineTo(this.selectedImage.x + this.selectedImage.width + 4, this.selectedImage.y - 4);
        this.ctx.lineTo(this.selectedImage.x + this.selectedImage.width + 4, this.selectedImage.y + this.selectedImage.height + 4);
        this.ctx.lineTo(this.selectedImage.x - 4, this.selectedImage.y + this.selectedImage.height + 4);
        this.ctx.lineTo(this.selectedImage.x - 4, this.selectedImage.y - 4);

        this.ctx.stroke();
        this.ctx.closePath();
      }, 0.2);

    }
  }

  onResize() {
    this.setWidthConfig();
  }

  setWidthConfig() {
    this.clientWidth = document.getElementById('canvas-box').clientWidth;
    this.widthProportion = this.clientWidth / 3200;
    this.render();
  }

  onSelect(i) {
    this.selectedImage = this.imageList[i];
    this.render();
  }

  delete(i) {
    for (let j = i; j < this.imageList.length - 1; j++) {
      this.imageList[j] = this.imageList[j + 1];
      this.fileList[j] = this.fileList[j + 1];
    }
    this.imageList.pop();
    this.fileList.pop();
    this.selectedImage = this.imageList[this.imageList.length - 1];
    this.render();
  }

  onMouseDown(ev): void {
    this.mouseDownLocation.x = this.getLocation(ev).x;
    this.mouseDownLocation.y = this.getLocation(ev).y;
    if (this.selectedImage) {
      if (this.getLocation(ev).x >= this.selectedImage.x - 20 && this.getLocation(ev).x <= this.selectedImage.x + 20
        && this.getLocation(ev).y >= this.selectedImage.y - 20 && this.getLocation(ev).y <= this.selectedImage.y + 20) {
        // left-top
        this.drag(ev, true, false, false, true, false);
        console.log('hit');
      } else if (this.getLocation(ev).x >= this.selectedImage.x + this.selectedImage.width - 20
        && this.getLocation(ev).x <= this.selectedImage.x + this.selectedImage.width + 20
        && this.getLocation(ev).y >= this.selectedImage.y - 20 && this.getLocation(ev).y <= this.selectedImage.y + 20) {
        // right-top
        this.drag(ev, true, true, false, false, false);
        console.log('hit');

      } else if (this.getLocation(ev).x >= this.selectedImage.x + this.selectedImage.width - 20
        && this.getLocation(ev).x <= this.selectedImage.x + this.selectedImage.width + 20
        && this.getLocation(ev).y >= this.selectedImage.y + this.selectedImage.height - 20
        && this.getLocation(ev).y <= this.selectedImage.y + this.selectedImage.height + 20) {
        // right-bottom
        this.drag(ev, false, true, true, false, false);
        console.log('hit');

      } else if (this.getLocation(ev).x >= this.selectedImage.x - 20
        && this.getLocation(ev).x <= this.selectedImage.x + 8
        && this.getLocation(ev).y >= this.selectedImage.y + this.selectedImage.height - 12
        && this.getLocation(ev).y <= this.selectedImage.y + this.selectedImage.height + 14) {
        // left-bottom
        this.drag(ev, false, false, true, true, false);
        console.log('hit');
      } else if (this.getLocation(ev).x >= this.selectedImage.x
          && this.getLocation(ev).x <= this.selectedImage.x + this.selectedImage.width
          && this.getLocation(ev).y >= this.selectedImage.y
          && this.getLocation(ev).y <= this.selectedImage.y + this.selectedImage.height) {
        // 区域内事件
        console.log('inside');
        this.drag(ev, false, false, false, false, true);
      } else {
        this.selectedImage = undefined;
        this.setFocus(ev);
        this.render();
      }
    } else {
      this.setFocus(ev);
    }
  }
  setFocus (ev) {
    // 遍历选取最顶上的图片
    const imageListCopy = this.imageList.concat();
    console.log(imageListCopy);
    for (let i = 0; i < imageListCopy.length; i++) {
      for (let j = i; j < imageListCopy.length; j++) {
        if (imageListCopy[i].zIndex > imageListCopy[j].zIndex) {
          const temp = imageListCopy[i];
          imageListCopy[i] = imageListCopy[j];
          imageListCopy[j] = temp;
        }
      }
    }
    for (let i = imageListCopy.length - 1; i >= 0; i--) {
      const img = imageListCopy[i];
      if (this.getLocation(ev).x >= img.x && this.getLocation(ev).x <= img.x + img.width
        && this.getLocation(ev).y >= img.y && this.getLocation(ev).y <= img.y + img.height) {
        for (let j = this.imageList.length - 1 ; j >= 0; j--) {
          if (img.x === this.imageList[j].x && img.y === this.imageList[j].y
            && img.height === this.imageList[j].height && img.width === this.imageList[j].width) {
            this.selectedImage = this.imageList[j];
            break;
          }
        }
        break;
      }
    }
    this.render();
  }

  drag(ev, top, right, bottom, left, inside) {
    if (top && left) {
      document.onmousemove = (e) => {
        this.mouseMoveCount++;
        if (this.mouseMoveCount % 6) {
          return;
        }
        const x = this.selectedImage.x;
        const y = this.selectedImage.y;
        this.selectedImage.x = this.getLocation(e).x;
        this.selectedImage.y = this.getLocation(e).y;
        this.selectedImage.width = this.selectedImage.width + x - this.selectedImage.x;
        this.selectedImage.height = this.selectedImage.height + y - this.selectedImage.y;
        this.render();
      };
    } else if (top && right) {
      document.onmousemove = (e) => {
        this.mouseMoveCount++;
        if (this.mouseMoveCount % 6) {
          return;
        }
        const y = this.selectedImage.y;
        this.selectedImage.y = this.getLocation(e).y;
        this.selectedImage.width = this.getLocation(e).x - this.selectedImage.x;
        this.selectedImage.height = this.selectedImage.height + y - this.selectedImage.y;
        this.render();
      };
    } else if (bottom && right) {
      document.onmousemove = (e) => {
        this.mouseMoveCount++;
        if (this.mouseMoveCount % 6) {
          return;
        }
        this.selectedImage.width = this.getLocation(e).x - this.selectedImage.x;
        this.selectedImage.height = this.getLocation(e).y - this.selectedImage.y;
        this.render();
      };
    } else if (bottom && left) {
      document.onmousemove = (e) => {
        this.mouseMoveCount++;
        if (this.mouseMoveCount % 6) {
          return;
        }
        const x = this.selectedImage.x;
        this.selectedImage.x = this.getLocation(e).x;
        this.selectedImage.width = this.selectedImage.width + x - this.selectedImage.x;
        this.selectedImage.height = this.getLocation(e).y - this.selectedImage.y;
        this.render();
      };
    } else if (inside) {
      let x, y;
      x = this.selectedImage.x;
      y = this.selectedImage.y;
      document.onmousemove = (e) => {
        this.mouseMoveCount++;
        if (this.mouseMoveCount % 10) {
          this.selectedImage.x = x + this.getLocation(e).x - this.mouseDownLocation.x;
          this.selectedImage.y = y + this.getLocation(e).y - this.mouseDownLocation.y;
        }
        this.render();
      };
    } else {
      return;
    }
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  }

  getLocation(ev) {
    const box = this.canvas.nativeElement.getBoundingClientRect();
    return {
      x: (ev.clientX - box.left) / this.widthProportion,
      y: (ev.clientY - box.top) / this.widthProportion
    };
  }

  // reloadUpload () {
  //   this.uploadedImageList = [];
  //   this.http.get(myConfig.baseUrl + 'getAllFilePath').subscribe(
  //     (data: any) => {
  //       this.uploadedImageList = JSON.parse(data.files);
  //       for (let i = 0; i < this.uploadedImageList.length; i++) {
  //         this.uploadedImageList[i] = myConfig.baseUrl + 'upload/' + this.uploadedImageList[i];
  //       }
  //     }
  //   );
  // }
}
