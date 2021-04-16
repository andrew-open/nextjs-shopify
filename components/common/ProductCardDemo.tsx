/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui'
import Image from 'next/image'
import { Card, Text } from '@theme-ui/components'
import { Link } from '@components/ui'
import { getPrice } from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { useState } from 'react'

export interface ProductCardProps {
  className?: string
  product: ShopifyBuy.Product
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

export const ProductCardDemo: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const [showAlternate, setShowAlternate ] = useState(false);
  const [canToggle, setCanToggle ] = useState(false);
  const src = product.images[0].src
  const handle = (product as any).handle
  const productVariant: any = product.variants[0]
  const price = getPrice(productVariant.compare_at_price || productVariant.price, 'USD')
  const alternateImage = product.images[1]?.src;

  return (
    <Card
      sx={{
        maxWidth: [700, 500],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseLeave={() => setShowAlternate(false)}
      onMouseEnter={() => setShowAlternate(true)}
    >
      <Link href={`/product/${handle}/`}>
        <div sx={{ flexGrow: 1 }}>
          { alternateImage &&
          <div sx={{ display: showAlternate && canToggle ? 'block' : 'none' }}>
              <Image
                quality="85"
                src={alternateImage}
                alt={product.title}
                width={imgWidth || 540}
                sizes={imgSizes}
                height={imgHeight || 540}
                layout={imgLayout}
                onLoad={() => setCanToggle(true)}
                loading='eager'
            />
            </div>
          }
          <div                 sx={{ display: canToggle && showAlternate && alternateImage ? 'none' : 'block'}}>
          <Image
            quality="85"
            src={src}
            alt={product.title}
            width={imgWidth || 540}
            sizes={imgSizes}
            height={imgHeight || 540}
            layout={imgLayout}
            loading={imgLoading}
            priority={imgPriority}
          />
          </div>
        </div>
        <div sx={{ textAlign: 'center' }}>
          <Themed.h2 sx={{ mt: 4, mb: 0, fontSize: 14 }}>
            {product.title}
          </Themed.h2>
          <Text sx={{ fontSize: 12, mb: 2 }}>{price}</Text>
        </div>
      </Link>
    </Card>
  )
}
