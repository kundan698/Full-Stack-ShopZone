import Link from "next/link";

const categories = [
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
  },
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
  },
];

const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 799,
    oldPrice: 1199,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
  },
  {
    id: 2,
    name: "Premium Sneakers",
    price: 1899,
    oldPrice: 2499,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
  },
  {
    id: 3,
    name: "Women's Casual Dress",
    price: 1499,
    oldPrice: 1999,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 2299,
    oldPrice: 2999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  },
];

export default function Home() {
  return (
    <main className="bg-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        className="relative overflow-hidden bg-gray-100"
        data-testid="hero-section"
      >
        <div className="mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">

          {/* Hero Content */}

          <div className="max-w-xl">

            <span className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              New Collection 2026
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-6xl">
              Style that
              <br />
              speaks for
              <br />
              <span className="text-gray-400">
                itself.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600">
              Discover premium fashion, footwear and everyday
              essentials designed for modern living.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
                data-testid="shop-now-button"
              >
                Shop Now →
              </Link>

              <Link
                href="/products?category=offers"
                className="rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-bold text-gray-900 transition hover:border-black"
              >
                View Offers
              </Link>

            </div>

            {/* Small Stats */}

            <div className="mt-12 flex gap-8 border-t border-gray-200 pt-7">

              <div>
                <p className="text-2xl font-black">
                  10K+
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Happy Customers
                </p>
              </div>

              <div>
                <p className="text-2xl font-black">
                  500+
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Products
                </p>
              </div>

              <div>
                <p className="text-2xl font-black">
                  4.8★
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Customer Rating
                </p>
              </div>

            </div>
          </div>

          {/* Hero Image */}

          <div className="relative hidden lg:block">

            <div className="overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
                alt="ShopZone fashion collection"
                className="h-[520px] w-full object-cover"
              />
            </div>

            {/* Floating Offer Card */}

            <div className="absolute bottom-8 left-8 rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Limited Offer
              </p>

              <p className="mt-1 text-2xl font-black">
                Up to 50% OFF
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Selected products
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CATEGORY SECTION
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="flex items-end justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-sm font-bold underline underline-offset-4 sm:block"
          >
            View All
          </Link>

        </div>


        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-2xl"
              data-testid={`category-${category.name.toLowerCase()}`}
            >

              <img
                src={category.image}
                alt={category.name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-5 left-5">
                <h3 className="text-xl font-bold text-white">
                  {category.name}
                </h3>

                <p className="mt-1 text-xs font-medium text-white/80">
                  Explore Collection →
                </p>
              </div>

            </Link>
          ))}

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section
        className="bg-gray-50"
        data-testid="featured-products"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="flex items-end justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Our Picks
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Featured Products
              </h2>
            </div>

            <Link
              href="/products"
              className="hidden text-sm font-bold underline underline-offset-4 sm:block"
            >
              Shop All
            </Link>

          </div>


          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          PROMO BANNER
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="relative overflow-hidden rounded-[2rem] bg-black px-8 py-16 text-white sm:px-14">

          <div className="relative z-10 max-w-xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Weekend Special
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Upgrade your
              <br />
              everyday style.
            </h2>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Get exclusive deals on selected products.
              Limited time only.
            </p>

            <Link
              href="/products?category=offers"
              className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-gray-200"
            >
              Explore Deals
            </Link>

          </div>

          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 right-20 h-96 w-96 rounded-full bg-white/5" />

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="border-t bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y px-6 py-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">

          <Benefit
            icon="🚚"
            title="Free Shipping"
            description="On orders above ₹999"
          />

          <Benefit
            icon="↩"
            title="Easy Returns"
            description="7-day hassle-free returns"
          />

          <Benefit
            icon="🔒"
            title="Secure Payment"
            description="100% secure checkout"
          />

        </div>

      </section>

    </main>
  );
}


/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({ product }) {
  return (
    <article
      className="group"
      data-testid={`product-card-${product.id}`}
    >

      <Link href={`/products/${product.id}`}>

        <div className="relative overflow-hidden rounded-2xl bg-gray-100">

          <img
            src={product.image}
            alt={product.name}
            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase">
            Sale
          </span>

        </div>

        <div className="pt-4">

          <p className="text-xs font-medium text-gray-500">
            {product.category}
          </p>

          <h3 className="mt-1 line-clamp-1 text-sm font-bold text-gray-900">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center gap-2">

            <span className="font-black">
              ₹{product.price}
            </span>

            <span className="text-xs text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>

          </div>

        </div>

      </Link>

    </article>
  );
}


/* ============================================================
   BENEFIT
============================================================ */

function Benefit({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 px-6 py-6 first:pl-0 last:pr-0">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold">
          {title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

    </div>
  );
}