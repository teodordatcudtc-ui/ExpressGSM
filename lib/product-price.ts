/**
 * Calculează prețul final și procentul de reducere pentru afișare.
 * Procentul este întotdeauna afișat fără zecimale.
 */
export interface ProductPriceInput {
  price: number
  discount?: number
  discount_type?: 'percent' | 'fixed' | null
  price_reduced?: number | null
}

export interface ProductPriceInfo {
  finalPrice: number
  hasDiscount: boolean
  /** Procent de reducere pentru badge (întreg, fără zecimale) */
  discountPercentDisplay: number
}

export function getProductPriceInfo(product: ProductPriceInput): ProductPriceInfo {
  const price = Number(product.price) || 0
  const discountType = product.discount_type || 'percent'
  const discount = Number(product.discount) || 0
  const priceReduced = product.price_reduced != null ? Number(product.price_reduced) : null

  if (discountType === 'fixed' && priceReduced != null && priceReduced > 0 && priceReduced < price) {
    const percent = Math.round(((price - priceReduced) / price) * 100)
    return {
      finalPrice: priceReduced,
      hasDiscount: true,
      discountPercentDisplay: percent,
    }
  }

  if (discount > 0 && discount < 100) {
    const finalPrice = (price * (100 - discount)) / 100
    return {
      finalPrice,
      hasDiscount: true,
      discountPercentDisplay: Math.round(discount),
    }
  }

  return {
    finalPrice: price,
    hasDiscount: false,
    discountPercentDisplay: 0,
  }
}
