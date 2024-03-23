import Product from "@/components/product/Product";
import { getProduct } from "@/lib/fetchData";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [data] = await getProduct(params.slug);
  return {
    title: data.name,
  };
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const [data] = await getProduct(params.slug);

  return (
    <section className="flex flex-col gap-6 max-w-[1360px] w-full mx-auto my-10 sm:flex-row">
      <Product product={data} />
    </section>
  );
};

export default ProductPage;
