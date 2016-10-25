import {Directive, ElementRef, Renderer, Input, OnInit} from "@angular/core"

@Directive({
  selector: "[datasrc]"
})
export class DataSrc implements OnInit {


  @Input('datasrc') src: string;
  constructor(private el: ElementRef, private renderer: Renderer) {

  }

  ngOnInit(): void {
    setInterval(()=>{
      this.el.nativeElement.setAttribute("src", this.src)
    },300)
  }
}

