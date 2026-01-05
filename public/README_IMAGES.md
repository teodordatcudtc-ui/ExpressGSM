# 📸 Ghid pentru Adăugarea Imaginilor

## Hero Background
Pentru a adăuga poza ta în fundalul hero-ului:
1. Pune imaginea în folderul `public/` cu numele: **hero-background.jpg** (sau .png)
2. Format recomandat: JPG sau PNG
3. Dimensiuni recomandate: minim 1920x1080px (Full HD) sau mai mare
4. Dacă folosești alt nume, editează `components/Hero.tsx` și schimbă `/hero-background.jpg` cu numele tău

## Imagini Servicii
Pentru fiecare serviciu, adaugă pozele în folderul `public/servicii/`:

1. **reparatii-telefoane.jpg** - Pentru serviciul "Reparații Telefoane"
2. **ecrane.jpg** - Pentru serviciul "Înlocuire Ecrane"
3. **baterii.jpg** - Pentru serviciul "Înlocuire Baterii"
4. **accesorii.jpg** - Pentru serviciul "Accesorii GSM"
5. **protectie.jpg** - Pentru serviciul "Protecție & Garantie"
6. **diagnostic.jpg** - Pentru serviciul "Diagnostic & Consultanță"

### Recomandări pentru poze:
- Format: JPG sau PNG
- Dimensiuni: minim 800x600px (raport 4:3 sau 16:9)
- Calitate: imagini clare și profesionale
- Conținut: poze relevante pentru fiecare serviciu (ex: telefoane, ecrane, baterii, etc.)

### Structura folderului:
```
public/
├── hero-background.jpg
└── servicii/
    ├── reparatii-telefoane.jpg
    ├── ecrane.jpg
    ├── baterii.jpg
    ├── accesorii.jpg
    ├── protectie.jpg
    └── diagnostic.jpg
```

**Notă:** Dacă nu adaugi pozele, site-ul va funcționa normal, dar va folosi gradient-uri colorate în locul imaginilor.

