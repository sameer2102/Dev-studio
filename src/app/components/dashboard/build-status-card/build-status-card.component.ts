import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  computed,
  AfterViewInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-build-status-card',
  standalone: true,
  templateUrl: './build-status-card.component.html',
})
export class BuildStatusCardComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  buildStatusCards = signal([
    {
      title: 'Commercial Auto',
      version: 'v2025.01.10023',
      description: 'Covers business vehicles for liability, damage, and other risks.',
      updated: '02/01/2025',
      requiresBuild: true,
      favorite: true
    },
    {
      title: 'Commercial Property',
      version: 'v2025.01.10023',
      description: 'Protects businesses against damage or loss of physical assets.',
      updated: '02/01/2025',
      requiresBuild: true,
      favorite: true
    },
    {
      title: 'Commercial Umbrella',
      version: 'v2025.01.10023',
      description: 'Boosts liability coverage beyond primary policies.',
      updated: '02/01/2025',
      requiresBuild: true,
      favorite: false
    },
    {
      title: 'Crime & Fidelity',
      version: 'v2025.01.10023',
      description: 'Protects businesses from losses due to theft, fraud, or dishonesty.',
      updated: '02/01/2025',
      requiresBuild: true,
      favorite: false
    },
    {
      title: 'Dwelling Fire',
      version: 'v2025.01.10023',
      description: 'Provides coverage for non-owner occupied residences against fire.',
      updated: '02/01/2025',
      requiresBuild: true,
      favorite: false
    },
    {
      title: 'Global General Liability',
      version: 'v2025.01.10023',
      description: 'Protects businesses against worldwide claims.',
      updated: '02/01/2025',
      requiresBuild: true,
      favorite: false
    },
    {
      title: 'Personal Auto',
      version: 'v2025.01.10023',
      description: 'Provides coverage to keep you and your vehicle safe on the road.',
      updated: '02/01/2025',
      requiresBuild: true,
      favorite: false
    },
    {
      title: 'Workers Comp',
      version: 'v2025.01.10023',
      description: 'Covers medical costs and lost wages for injured employees.',
      updated: '02/01/2025',
      requiresBuild: true,
      favorite: false
    },
    {
      title: 'Billing',
      version: 'v2025.01.10023',
      description: 'Automates invoicing, payment processing.',
      updated: '03/07/2025',
      requiresBuild: false,
      favorite: false
    },
    {
      title: 'Business Owners',
      version: 'v2025.01.10023',
      description: 'Combines coverages to protect small and mid-sized businesses.',
      updated: '03/07/2025',
      requiresBuild: false,
      favorite: false
    },
    {
      title: 'Claims',
      version: 'v2025.01.10023',
      description: 'Simplifies filing ensuring fast and efficient claim resolutions.',
      updated: '03/07/2025',
      requiresBuild: false,
      favorite: false
    },
    {
      title: 'Commercial Inland Marine',
      version: 'v2025.01.10023',
      description: 'Protects valuable goods in transit or at temporary locations.',
      updated: '03/07/2025',
      requiresBuild: false,
      favorite: false
    },
    {
      title: 'Commercial Package',
      version: 'v2025.01.10023',
      description: 'Combines coverages to protect businesses from diverse risks.',
      updated: '03/07/2025',
      requiresBuild: false,
      favorite: false
    },
    {
      title: 'Distribution Management',
      version: 'v2025.01.10023',
      description: 'Optimizes agent performance tracking to drive sales growth.',
      updated: '03/07/2025',
      requiresBuild: false,
      favorite: false
    },
    {
      title: 'General Liability',
      version: 'v2025.01.10023',
      description: 'Protects businesses from financial losses due to third-party claims.',
      updated: '03/07/2025',
      requiresBuild: false,
      favorite: false
    }
  ]);
  

  scrollDots = signal<number[]>([]);
  activeDot = signal(0);

  sortedCards = computed(() =>
    this.buildStatusCards().sort((a, b) =>
      b.requiresBuild ? 1 : -1
    )
  );

  ngAfterViewInit() {
    this.calculateDots();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateDots();
  }

  toggleFavorite(index: number): void {
    const cards = [...this.buildStatusCards()];
    cards[index].favorite = !cards[index].favorite;
    this.buildStatusCards.set(cards);
  }

  getBadgeInfo(requiresBuild: boolean) {
    return requiresBuild
      ? {
          color: 'bg-orange-600',
          icon: 'fas fa-tools',
          label: 'Requires build',
          button: 'Update'
        }
      : {
          color: 'bg-green-700',
          icon: 'fas fa-check',
          label: 'Up-to-date',
          button: 'View product'
        };
  }

  calculateDots(): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;
    const visibleWidth = el.offsetWidth;
    const scrollSegments = Math.ceil(el.scrollWidth / visibleWidth);
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
    const scrollLeft = el.scrollLeft;
    const index = Math.round(scrollLeft / visibleWidth);
    this.activeDot.set(index);
  }

  scrollToDot(index: number): void {
    const el = this.scrollContainer?.nativeElement;
    if (!el) return;
    const visibleWidth = el.offsetWidth;
    el.scrollTo({ left: index * visibleWidth, behavior: 'smooth' });
    this.activeDot.set(index);
  }
}
