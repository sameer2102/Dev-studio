import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  AfterViewInit,
  HostListener
} from '@angular/core';

interface LineOfBusiness {
  code: string;
  name: string;
  favorite: boolean;
}

@Component({
  selector: 'app-lines-of-business',
  standalone: true,
  templateUrl: './lines-of-business.component.html',
})
export class LinesOfBusinessComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  linesOfBusiness = signal<LineOfBusiness[]>([
    { code: 'CA', name: 'Commercial Auto', favorite: true },
    { code: 'CU', name: 'Commercial Umbrella', favorite: true },
    { code: 'DF', name: 'Dwelling Fire', favorite: true },
    { code: 'BO', name: 'Business Owners', favorite: false },
    { code: 'CP', name: 'Commercial Property', favorite: false },
    { code: 'GL', name: 'General Liability', favorite: false },
    { code: 'WC', name: 'Workers Compensation', favorite: false },
  ]);

  scrollDots = signal<number[]>([]);
  activeDot = signal(0);

  ngAfterViewInit(): void {
    this.calculateDots();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateDots();
  }

  toggleFavorite(index: number): void {
    const updated = [...this.linesOfBusiness()];
    updated[index].favorite = !updated[index].favorite;
    this.linesOfBusiness.set(updated);
  }

  calculateDots(): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;

    const totalScroll = el.scrollWidth;
    const visibleWidth = el.offsetWidth;
    const scrollSegments = Math.ceil(totalScroll / visibleWidth);

    this.scrollDots.set(Array(scrollSegments).fill(0));
    this.updateActiveDot();
  }

  onScroll(): void {
    this.updateActiveDot();
  }

  updateActiveDot(): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;

    const visibleWidth = el.offsetWidth;
    const currentScroll = el.scrollLeft;
    const currentIndex = Math.round(currentScroll / visibleWidth);

    this.activeDot.set(currentIndex);
  }

  scrollToDot(index: number): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;

    const visibleWidth = el.offsetWidth;
    el.scrollTo({
      left: index * visibleWidth,
      behavior: 'smooth'
    });

    this.activeDot.set(index);
  }
}
