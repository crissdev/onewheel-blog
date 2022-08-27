import type { Post } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Post };

export async function getPostListings() {
  return prisma.post.findMany({
    select: {
      slug: true,
      title: true,
    },
  });
}

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    select: { slug: true, title: true, markdown: true },
  });
}

export function createPost(post: Pick<Post, "title" | "slug" | "markdown">) {
  return prisma.post.create({ data: post });
}

export function updatePost(
  slug: string,
  post: Pick<Post, "title" | "slug" | "markdown">
) {
  return prisma.post.update({ data: post, where: { slug } });
}

export function deletePost(slug: string) {
  return prisma.post.delete({ where: { slug } });
}
