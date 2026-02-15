# 📐 Análisis del Layout y Widths

## 🎯 Resumen Ejecutivo

El sitio utiliza un **grid layout responsivo** con 2 breakpoints principales:
- **Mobile (≤480px)**: 1 columna, NAV ocultada, contenido a ancho completo
- **Tablet+ (≥768px)**: 2 columnas, NAV visible (250px), CONTENT variable

Los diferentes anchos que ves (358px, 783.562px, etc.) son **correctos** y dependen del viewport width.

---

## 🏗️ Estructura del Grid CSS

### Diseño Base (Mobile First)
```css
.container {
  display: grid;
  grid-template-columns: 1fr;  /* Una columna por defecto */
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.25rem;
}
```

### Breakpoints Definidos

| Breakpoint | Grid | NAV | CONTENT | Caso |
|-----------|------|-----|---------|------|
| **≤480px** | 1fr | ❌ Oculto | 100% | Móvil |
| **481-767px** | 1fr | ❌ Oculto | 100% | Tablet pequeño |
| **≥768px** | 250px 1fr | ✅ Visible | 1fr | Tablet+Desktop |
| **≥1024px** | 250px 1fr | ✅ Visible | 1fr (gap↑) | Desktop grande |

---

## 📏 Cálculo del Ancho de .box

### Fórmula General
```
width_box = (viewport_width - padding_container - padding_box)
            - [si_2_columnas: nav_width + gap]
```

### Ejemplos Reales de Cálculo

#### 📱 Mobile (360px típico)
```
viewport:        360px
- body padding:  0.75rem × 2 = 12px
- inner:         348px
- container p:   0.75rem × 2 = 12px
- content area:  336px
- .box padding:  1rem × 2 = 16px
────────────────────────────
.box content:    320px ✓
```

#### 📱 Tablet (800px)
```
viewport:        800px
- body padding:  1.5rem × 2 = 24px
- inner:         776px
- container p:   1.5rem × 2 = 24px
- content area:  752px
- .box padding:  1.5rem × 2 = 24px
────────────────────────────
.box content:    728px ✓
```

#### 🖥️ Desktop (1024px)
```
viewport:        1024px
- body padding:  1.5rem × 2 = 24px
- inner:         1000px
- container p:   1.5rem × 2 = 24px
- content area:  976px - 250px(NAV) - 32px(GAP) = 694px
- .box padding:  1.5rem × 2 = 24px
────────────────────────────
.box content:    670px ✓
```

#### 🖥️ Desktop Large (1400px)
```
viewport:        1400px (max-width limit)
- body padding:  1.5rem × 2 = 24px
- inner:         1376px
- container p:   1.5rem × 2 = 24px
- content area:  1352px - 250px(NAV) - 32px(GAP) = 1070px
- .box padding:  1.5rem × 2 = 24px
────────────────────────────
.box content:    1046px ✓
```

---

## ⚠️ Problemas Anteriores (SOLUCIONADOS)

### Problema 1: Gap de 1px sin regla CSS ❌
```
Mobile (≤480px) → regla específica
Gap: 481px-767px → SIN REGLA
Tablet+ (≥768px) → regla específica
```

**Solución**: Añadida regla `@media (min-width: 481px)` para cerrar el gap.

### Problema 2: Inline Tab Buttons ❌
```html
<!-- INCORRECTO (quebraba layout) -->
<button>Long text</button><button>Another text</button>

<!-- CORRECTO (ahora) -->
<button>
  Long text
</button>
<button>
  Another text
</button>
```

**Solución**: Reformateados buttons en useEffect y useState.

---

## 🎨 Current Media Queries (Después de la Fix)

### Mobile First Approach

```css
/* Base: Mobile (0-480px) */
body { padding: 0.75rem; }
.container { grid: 1fr; padding: 0.75rem; gap: 1rem; }
.box { padding: 1rem; }

/* Small Tablet (481-767px) */
@media (min-width: 481px) {
  body { padding: 1rem; }
  .container { padding: 1rem; gap: 1rem; }
  .box { padding: 1.25rem; }
}

/* Tablet+ (768px+) - NAV VISIBLE */
@media (min-width: 768px) {
  .container { grid: 250px 1fr; padding: 1.5rem; gap: 2rem; }
  .box { padding: 1.5rem; }
  /* Font scale aumenta */
}

/* Desktop Large (1024px+) */
@media (min-width: 1024px) {
  .container { gap: 2.5rem; }
  /* Font scale máxima */
}
```

---

## ✅ Por Qué los Widths Son Diferentes (Es Normal)

**Diferentes viewport widths = Diferentes widths para .box**

Esto es **CORRECTO** y deseado:

- ✅ useState en viewport 500px → ancho X
- ✅ useState en viewport 800px → ancho Y (más ancho)
- ✅ virtualDOM en viewport 1200px → ancho Z (aún más ancho)
- ✅ Todos escalman proporcionalmente

La key es que **dentro del mismo breakpoint**, todos los boxes tienen el mismo width.

---

## 🧪 Cómo Verificar

1. **Abre DevTools** (F12)
2. **Toggle device toolbar** (Ctrl+Shift+M)
3. **Selecciona diferentes tamaños**:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1024px)
4. **Inspecciona `.box`** en cada tamaño
5. **Comprueba que el width es consistente** para todas las páginas en el mismo breakpoint

---

## 📝 CSS Variables Utilizadas

```css
:root {
  /* Mobile (18px) */
  --fs-body: 1.125rem;

  /* Tablet (19px) */
  @media (min-width: 768px) {
    --fs-body: 1.1875rem;
  }

  /* Desktop (20px) */
  @media (min-width: 1024px) {
    --fs-body: 1.25rem;
  }
}
```

---

## 🎓 Conclusión

El layout está diseñado con **Mobile First** y es **responsive**. Los diferentes widths que ves son **esperados y correctos** porque:

1. El viewport size es diferente en cada dispositivo
2. El número de columnas cambia (1 vs 2)
3. El padding y gap se ajustan
4. TODO se calcula automáticamente con `1fr` y `grid`

**No hay que "fijar" los widths** - la idea es que se ajusten fluidamente al viewport.

