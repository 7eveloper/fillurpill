import { getProduct } from "@/lib/fetchData";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const [data] = await getProduct(params.slug);

  return (
    <section className="flex gap-6 max-w-[1360px] mx-auto my-10">
      {data.image && <img src={data.image} className="w-[320px] h-fit" />}
      <div>
        <h2 className="font-bold text-xl">{data.name}</h2>
        <p>제조/수입사: {data.company}</p>
        <p>
          등록일: <time>{data.registration_date}</time>
        </p>
        <p>유통기한: {data.expiration_date}</p>
        <p>복용법 : {data.taking_guide}</p>
        <p>보관법 : {data.storage_guide}</p>
        <p>주의사항 : {data.caution}</p>
        <p>주요 기능 : {data.function}</p>
        <p>성분/함량: {data.composition}</p>
      </div>
    </section>
  );
};

export default ProductPage;
