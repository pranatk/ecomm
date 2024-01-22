import prisma from "../lib/db/prisma";
import SubmitButton from "@/components/submitButton";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Add Product - Nexmazon",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price")) || 0;
  const imageUrl = formData.get("imageUrl")?.toString();
  if (!name || !description || !price || !imageUrl) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, price, imageUrl },
  });
  redirect("/");
}

export default function AddProductPage() {
  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <h1 className="text-lg font-semibold">Add Product</h1>
      <form action={addProduct} className="flex flex-col gap-4">
        <input
          type="text"
          required
          name="name"
          placeholder="Name"
          className="input input-bordered input-md w-full max-w-xs"
        />
        <textarea
          className="textarea textarea-bordered w-full"
          required
          name="description"
          rows={5}
          placeholder="Description"
        />

        <input
          type="number"
          required
          name="price"
          placeholder="Price"
          className="input input-bordered input-md w-1/2 max-w-xs"
        />
        <input
          type="text"
          required
          placeholder="Image URL"
          name="imageUrl"
          className="input input-bordered input-md w-full max-w-xs"
        />
        <SubmitButton>Add Product</SubmitButton>
      </form>
    </div>
  );
}
