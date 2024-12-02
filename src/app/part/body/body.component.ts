import { Component, HostListener } from '@angular/core';
import { ObjectComponent } from '../../model/object/object.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [ObjectComponent],
  template: `
  
  <!-- Hero section -->
        
        <section class="hero bg-gradient-to-tr from-primary-600 to-primary-400 w-full flex justify-center items-center top-0 h-[81vh] text-white z-50">
            <div class="w-3/5">
                <div class="w-full flex flex-row relative">
                    <div class="w-1/2 flex flex-col gap-8 pb-10">
                        <h1 class="font-extralight text-[50px] leading-[60px]">The leading platform <br>for 3D & AR on the web</h1>
                        <p class="text-[19px] leading-[30px] w-4/5">Manage your 3D assets. Distribute 3D & AR experiences. <br>Collaborate with others. Showcase your work. Buy & sell 3D models.</p>
                        <div>
                            <button class="bg-primary-200 px-3 py-3 rounded-sm font-bold">JOIN FOR FREE</button>
                            <button class="bg-orange-400 px-3 py-3 rounded-sm font-bold">JOIN FOR FREE</button>
                        </div>
                    </div>
                    <div class="absolute w-1/2 left-1/2 flex justify-center items-center h-full z-50">
                      <app-object></app-object>
                    </div>
                </div>
            </div>
        </section>

  <!-- End Hero section -->

        <!-- Other Content Section -->
        <section class="w-full z-20 relative flex justify-center items-center">
            <div class="w-3/5 relative flex justify-center items-center">
                <div class="bg-white text-black w-full h-[32vh] absolute z-50 -top-[10vh] -translate-x-1/2 left-1/2 grid grid-cols-3 shadow-md">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
            </div>
        </section>

        <section class="top-[40vh] w-full z-20 relative flex justify-center items-center">
            <div class="h-[78vh]">
                Content Section
            </div>
        </section>

  `,
  styleUrl: './body.component.css'
})
export class BodyComponent {
  scrolledOnce = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.scrolledOnce) {
      this.scrolledOnce = true;
      const heroHalfHeight = document.querySelector('.hero')?.clientHeight ?? 0;
      window.scrollTo({
        top: heroHalfHeight / 2,
        behavior: 'smooth'
      });
    }
  }

}
