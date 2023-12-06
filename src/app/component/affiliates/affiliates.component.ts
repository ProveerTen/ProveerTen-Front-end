import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.css']
})
export class AffiliatesComponent implements OnInit {
  affiliates = [
    { image: 'https://w7.pngwing.com/pngs/602/118/png-transparent-milo-logo-breakfast-cereal-milk-nestle-milk-cdr-text-breakfast.png', alt: 'Descripción 1' },
    { image: 'https://static.wikia.nocookie.net/logopedia/images/2/2d/PapasMargarita2019.png/revision/latest/scale-to-width-down/220?cb=20210508195937&path-prefix=es', alt: 'Descripción 2' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Alpina_S.A._logo.svg/2560px-Alpina_S.A._logo.svg.png', alt: 'Descripcion 3' },
    { image: 'https://w7.pngwing.com/pngs/602/118/png-transparent-milo-logo-breakfast-cereal-milk-nestle-milk-cdr-text-breakfast.png', alt: 'Descripción 1' },
    { image: 'https://static.wikia.nocookie.net/logopedia/images/2/2d/PapasMargarita2019.png/revision/latest/scale-to-width-down/220?cb=20210508195937&path-prefix=es', alt: 'Descripción 2' },
    { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Alpina_S.A._logo.svg/2560px-Alpina_S.A._logo.svg.png', alt: 'Descripcion 3' }
     // Añade más objetos según la cantidad de imágenes que desees mostrar
  ];

  translateX = 0;

  ngOnInit() {
    setInterval(() => {
      this.translateX -= 300; // Ajusta la velocidad del carrusel según tus necesidades
      if (this.translateX < -((this.affiliates.length - 3) * (300 / 3))) {
        this.translateX = 0;
      }
    }, 3000); // Ajusta el intervalo según tus necesidades
  }
}

