class Grid {
  constructor(
    linhas = 1,
    colunas = 1,
    margem = 0,
    gutter = 0,
    largura = width,
    altura = height,
  ) {
    this.linhas = linhas;
    this.colunas = colunas;
    this.margem = margem;
    this.gutter = gutter;
    this.largura = largura;
    this.altura = altura;
    this.compute();
  }

  compute() {
    this.areaw =
      (this.largura - 2 * this.margem - (this.colunas - 1) * this.gutter) /
      this.colunas;
    this.areah =
      (this.altura - 2 * this.margem - (this.linhas - 1) * this.gutter) /
      this.linhas;
    this.areas = [];
    this.areas.length = this.linhas;
    for (let linha = 0; linha < this.linhas; linha++) {
      this.areas[linha] = [];
      for (let coluna = 0; coluna < this.colunas; coluna++) {
        const box = {
          x: this.margem + (this.areaw + this.gutter) * coluna,
          y: this.margem + (this.areah + this.gutter) * linha,
          w: this.areaw,
          h: this.areah,
        };
        this.areas[linha][coluna] = box;
      }
    }
  }

  render(encher = false, cor="pink", font_size=10) {
    push();
    resetMatrix();
    stroke(cor);
    if (encher) {
      fill(encher);
    } else {
      noFill();
    }
    textSize(font_size);
    for (let linha = 0; linha < this.linhas; linha++) {
      for (let coluna = 0; coluna < this.colunas; coluna++) {
        const box = this.areas[linha][coluna];
        rect(box.x, box.y, box.w, box.h);
        text(linha * this.colunas + coluna, box.x + 2, box.y + 10);
      }
    }
    pop();
  }

  area(inicio = 0, fim = 0) {
    if (fim < inicio) {
      const aux = fim;
      fim = inicio;
      inicio = aux;
    }
    if (fim >= this.linhas * this.colunas) {
      console.log("ERRO: área FIM fora da grelha");
        throw new Error("Grid index out of bounds");
    }

    const ilin = Math.floor(inicio / this.colunas);
    const icol = inicio % this.colunas;
    const flin = Math.floor(fim / this.colunas);
    const fcol = fim % this.colunas;

    return {
      x: this.areas[ilin][icol].x,
      y: this.areas[ilin][icol].y,
      w:
        this.areas[flin][fcol].x +
        this.areas[flin][fcol].w -
        this.areas[ilin][icol].x,
      h:
        this.areas[flin][fcol].y +
        this.areas[flin][fcol].h -
        this.areas[ilin][icol].y,
    };
  }
}

//  Simple Manual Guides to place over drawings
class Guides {
  constructor(cor="#FF00FFAA") {
    this.horizontal = [];
    this.vertical = [];
    this.rectangles = [];
    this.color = color(cor);
  }
  show() {
    push();
    stroke(this.color);
    noFill();
    rectMode(CORNERS);

    this.horizontal.forEach((y) => line(0, y, width, y));
    this.vertical.forEach((x) => line(x, 0, x, height));
    this.rectangles.forEach((r) => rect(r[0], r[1], r[2], r[3]));
    pop();
  }
  clear() {
    this.clearHorizontal();
    this.clearVertical();
    this.clearRectangles();
  }
  clearHorizontal() {
    this.horizontal = [];
  }
  clearVertical() {
    this.vertical = [];
  }
  clearRectangles() {
    this.rectangles = [];
  }
}
