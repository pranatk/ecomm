import ProductCard from "@/components/productCard";
import prisma from "./lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return (
    <div>
      <div className="hero rounded-xl bg-base-200"></div>
      <div className="hero-content flex-col lg:flex-row  min-h-[30rem] lg:gap-8 p-0">
        <Image
          src={products[0].imageUrl}
          alt={products[0].name}
          width={800}
          height={400}
          priority
          className="w-full max-w-sm rounded-xl shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">{products[0].name}</h1>
          <p className="py-6">{products[0].description}</p>
          <Link href={"products/" + products[0].id} className="btn btn-primary">
            Check it Out
          </Link>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.slice(1).map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
      {/* <ProductCard product={products[0]} /> */}
    </div>
  );
}
