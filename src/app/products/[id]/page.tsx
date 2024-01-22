import prisma from "@/app/lib/db/prisma";
import PriceTag from "@/components/priceTag";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    notFound();
  }
  return product;
});
export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + " - Nexmazon",
    description: "Product Page",
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}
export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag className="mt-4" price={product.price} />
        <p className="py-6">{product.description}</p>
      </div>
    </div>
  );
}
