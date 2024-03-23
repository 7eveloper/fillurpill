import { getProduct } from "@/lib/fetchData";
import Link from "next/link";

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
    <section className="flex gap-6 max-w-[1360px] w-full mx-auto my-10">
      {data.image && <img src={data.image} className="w-[320px] h-fit" />}
      <div>
        <h2 className="font-bold text-xl">{data.name}</h2>
        <p>제조/수입사: {data.company}</p>
        <p>유통기한: {data.expiration_date}</p>
        <p>섭취방법 : {data.taking_guide}</p>
        <p>주의사항 : {data.caution}</p>
        <p>주요 기능 : {data.function}</p>
        <p>성분/함량: {data.raw_meterials}</p>
        <Link href={data.link}>구매링크</Link>
      </div>
    </section>
  );
};

export default ProductPage;
