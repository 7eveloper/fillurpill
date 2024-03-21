import { getProduct } from "@/lib/fetchData";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const [data] = await getProduct(params.slug);

  return (
    <>
      {data.image && <img src={data.image} />}
      <h2>{data.name}</h2>
      <p>{data.company}</p>
      <time>{data.registration_date}</time>
      <span>{data.expiration_date}</span>
      <p>복용법 : {data.taking_guide}</p>
      <p>보관법 : {data.storage_guide}</p>
      <p>주의사항 : {data.caution}</p>
      <p>주요 기능 : {data.function}</p>
      <p>성분: {data.composition}</p>
    </>
  );
};

export default ProductPage;
