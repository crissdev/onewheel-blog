import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPost } from "~/models/post.server";
import { marked } from "marked";
import invariant from "tiny-invariant";

type LoaderData = {
  title: string;
  markdownHtml: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, "slug is required");
  const post = await getPost(slug);
  invariant(post, `post not found ${slug}`);
  const markdownHtml = marked(post.markdown);
  return json<LoaderData>({ title: post.title, markdownHtml });
};

export default function Post() {
  const { title, markdownHtml } = useLoaderData<LoaderData>();
  return (
    <main className={"mx-auto max-w-4xl"}>
      <h1 className={"my-6 border-b-2 text-center text-3xl"}>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: markdownHtml }}></div>
    </main>
  );
}
