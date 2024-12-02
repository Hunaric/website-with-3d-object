import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `


        <!-- Navbar section -->
        <header class="navbar px-6 h-14 fixed w-full items-center top-0 z-50">
            <nav class="flex flex-row justify-between items-center gap-4 w-full py-3 text-white">
                <!-- Navbar Left Part -->
                <div class="flex flex-row justify-between gap-3 w-1/4 font-semibold">
                    <div>Sketchfab</div>
                    <div>EXPLORE</div>
                    <div>BUY 3D MODELS</div>
                    <div>FOR BUSINESS</div>
                </div>
                <!-- End Navbar Left Part -->

                <!-- Navbar Center Part -->
                <div class="w-2/4 flex opacity-90">
                    <div class="w-full flex flex-row items-center justify-between bg-gray-100 border border-gray-300 px-3 py-2 rounded-md shadow-sm">
                        <input 
                            type="text" 
                            placeholder="Search 3D models" 
                            class="w-full bg-transparent outline-none text-black text-sm"
                        />
                        <div class="text-gray-500">🔍</div>
                    </div>
                </div>
                <!-- End Navbar Center Part -->

                <!-- Navbar Right Part -->
                <div class="flex flex-row justify-center gap-3 w-1/4 font-semibold pl-8">
                    <div>LOGIN</div>
                    <div>SIGN UP</div>
                    <div>UPLOAD</div>
                </div>
                <!-- End Navbar Right Part -->
            </nav>
        </header>
        <!-- End Navbar section --> 

 `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
