import Message from "@/components/Message";
import { getShortUrl } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function ShortenedUrl({
  params,
}: {
  params: { slug: string };
}) {
  const { data, error } = await getShortUrl(params.slug);
  console.log(data, error);

  if (!data?.length || error !== null)
    return (
      <Message
        title="An error occured"
        text={`/${params.slug} does not exist!`}
      />
    );
  redirect(data[0].url);

  return;
}
